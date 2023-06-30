import { UserService } from '@modules/user/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { ParamIdDto } from 'dto/paramId.dto';
import { ICreate, IGetAll, IGetOne, IUpdate } from 'interface';
import { Model } from 'mongoose';
import { Farm, FarmDocument } from 'schema/farm.schema';
import {
  GetAllFarmQueryDto,
  GetAllFarmResponseDto,
  GetOneFarmResponseDto,
} from './dto';
import { FarmCreateBodyDto } from './dto/create-body.dto';
import { Pond, PondDocument } from 'schema/pond.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class FarmService
  implements
    IGetAll<GetAllFarmQueryDto, GetAllFarmResponseDto>,
    IGetOne<GetOneFarmResponseDto>,
    ICreate<FarmCreateBodyDto>,
    IUpdate<FarmCreateBodyDto>
{
  @InjectModel(Farm.name) private readonly farmModel: Model<FarmDocument>;
  @InjectModel(Pond.name) private readonly pondModel: Model<PondDocument>;
  @Inject() private readonly userService: UserService;

  async getAll(
    query: GetAllFarmQueryDto,
    request: Record<string, any>,
  ): Promise<GetAllFarmResponseDto> {
    const { skip, limit } = query;
    const dbQuery: any = {
      owner: new ObjectId(request.user._id),
    };

    if (query.name) {
      dbQuery.name = { $regex: query.name, $options: 'i' };
    }
    if (query.phone) {
      dbQuery.phones = { $in: [query.phone] };
    }

    if (query.startDate) {
      dbQuery.createdAt = { $gte: query.startDate };
    }
    if (query.endDate) {
      dbQuery.createdAt = { ...dbQuery.createdAt, $lte: query.endDate };
    }

    dbQuery.deleted = { $ne: true };

    const [data, count] = await Promise.all([
      this.farmModel.find(dbQuery).populate('owner').skip(skip).limit(limit),
      this.farmModel.countDocuments(dbQuery),
    ]);

    return plainToInstance(
      GetAllFarmResponseDto,
      {
        count,
        data,
      },
      { excludeExtraneousValues: true },
    );
  }

  async create(payload: FarmCreateBodyDto): Promise<any> {
    const { name, address, phones, owner, expert } = payload;
    await this.userService.getOrThrowError(owner);
    const existedPhones = await this.farmModel.find({
      phones: { $in: phones },
    });
    if (existedPhones?.length) {
      throw new ConflictException('این شماره‌ها قبلا ثبت شده‌اند');
    }
    return await this.farmModel.create({
      name,
      address,
      phones,
      owner,
      expert,
    });
  }

  async getOne(params: ParamIdDto): Promise<GetOneFarmResponseDto> {
    const farm = await this.getOrThrowError(params.id);
    const ponds = await this.pondModel
      .aggregate([])
      .match({ farm: farm._id })
      .project({
        id: '$_id',
        name: 1,
        dimensions: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .lookup({
        from: 'sensors',
        as: 'sensorData',
        localField: '_id',
        foreignField: 'pond',
        pipeline: [
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
          { $project: { _id: 0 } },
        ],
      })
      .lookup({
        from: 'samplings',
        as: 'samplingData',
        localField: '_id',
        foreignField: 'pond',
        pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
      })
      .lookup({
        from: 'feedings',
        as: 'feedingData',
        localField: '_id',
        foreignField: 'pond',
      })
      .lookup({
        from: 'transparencies',
        as: 'transparencyData',
        localField: '_id',
        foreignField: 'pond',
        pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
      })
      .lookup({
        from: 'fatality',
        as: 'fatalityData',
        localField: '_id',
        foreignField: 'pond',
        pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
      });

    farm['ponds'] = ponds;

    return plainToInstance(GetOneFarmResponseDto, farm, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  async update(params: ParamIdDto, payload: FarmCreateBodyDto): Promise<void> {
    const farm = await this.getOrThrowError(params.id);
    const { name, address, phones } = payload;

    farm.name = name;
    farm.address = address;
    farm.phones = phones;

    await this.farmModel.updateOne({ _id: farm._id }, farm);
  }

  async delete(params: ParamIdDto): Promise<void> {
    const farm = await this.getOrThrowError(params.id);
    farm.deleted = true;
    farm.deletedAt = new Date();
    await this.farmModel.updateOne({ _id: farm._id }, farm);
  }

  async getOrThrowError(id: string): Promise<Farm> {
    const farm = await this.farmModel.findOne({ _id: id }).populate('owner');
    if (!farm || farm.deleted) {
      throw new NotFoundException('مزرعه‌ای با این شناسه یافت نشد.');
    }
    return farm;
  }
}
