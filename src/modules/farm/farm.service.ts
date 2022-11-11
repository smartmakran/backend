import { UserService } from '@modules/user/user.service';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
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

export class FarmService
  implements
    IGetAll<GetAllFarmQueryDto, GetAllFarmResponseDto>,
    IGetOne<GetOneFarmResponseDto>,
    ICreate<FarmCreateBodyDto>,
    IUpdate<FarmCreateBodyDto>
{
  @InjectModel(Farm.name) private readonly farmModel: Model<FarmDocument>;
  @Inject() private readonly userService: UserService;

  async getAll(query: GetAllFarmQueryDto): Promise<GetAllFarmResponseDto> {
    const { skip, limit } = query;
    const dbQuery: any = {};

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
      this.farmModel.find(dbQuery).skip(skip).limit(limit),
      this.farmModel.countDocuments(dbQuery),
    ]);

    return plainToInstance(GetAllFarmResponseDto, {
      count,
      data,
    });
  }

  async create(payload: FarmCreateBodyDto): Promise<any> {
    const { name, address, phones, owner, expert } = payload;
    await this.userService.getOrThrowError({ id: owner });
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
    return plainToInstance(GetOneFarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });
  }

  async update(params: ParamIdDto, payload: FarmCreateBodyDto): Promise<void> {
    const farm = await this.getOrThrowError(params.id);
    const { name, address, phones } = payload;

    farm.name = name;
    farm.address = address;
    farm.phones = phones;

    await farm.save();
  }

  async delete(params: ParamIdDto): Promise<void> {
    const farm = await this.getOrThrowError(params.id);
    farm.deleted = true;
    farm.deletedAt = new Date();
    await farm.save();
  }

  async getOrThrowError(id: string): Promise<FarmDocument> {
    const farm = await this.farmModel.findById(id);
    if (!farm || farm.deleted) {
      throw new NotFoundException('مزرعه‌ای با این شناسه یافت نشد.');
    }
    return farm;
  }
}
