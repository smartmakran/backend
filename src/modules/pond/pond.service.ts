import { FarmService } from '@modules/farm/farm.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ParamIdDto } from 'dto/paramId.dto';
import { ICreate, IGetAll, IGetOne } from 'interface';
import { Model } from 'mongoose';
import { Pond, PondDocument } from 'schema/pond.schema';
import { GetAllPondQueryDto, GetOnePondResponseDto } from './dto';
import { PondCreateBodyDto } from './dto/create-body.dto';

@Injectable()
export class PondService
  implements
    IGetAll<GetAllPondQueryDto, GetAllResponseDto<GetOnePondResponseDto>>,
    IGetOne<GetOnePondResponseDto>,
    ICreate<PondCreateBodyDto>
{
  @InjectModel(Pond.name)
  private readonly pondModel: Model<PondDocument>;
  @Inject()
  private readonly farmService: FarmService;

  async getAll(
    query: GetAllPondQueryDto,
  ): Promise<GetAllResponseDto<GetOnePondResponseDto>> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.pondModel.find({ skip, limit }),
      this.pondModel.countDocuments(),
    ]);

    return plainToInstance(GetAllResponseDto<GetOnePondResponseDto>, {
      count,
      data,
    });
  }

  async create(payload: PondCreateBodyDto): Promise<any> {
    const { name, farm, dimensions } = payload;
    await this.farmService.getOrThrowError(farm);
    return await this.pondModel.create({
      farm,
      name,
      dimensions,
    });
  }

  async getOne(params: ParamIdDto): Promise<GetOnePondResponseDto> {
    const pond = await this.getOrThrowError(params.id);
    return plainToInstance(GetOnePondResponseDto, pond);
  }

  async update(params: ParamIdDto, payload: PondCreateBodyDto): Promise<void> {
    const pond = await this.getOrThrowError(params.id);
    const { name, dimensions } = payload;

    pond.name = name;
    pond.dimensions = dimensions;

    await pond.save();
  }

  async delete(params: ParamIdDto): Promise<void> {
    const pond = await this.getOrThrowError(params.id);
    pond.deleted = true;
    pond.deletedAt = new Date();
    await pond.save();
  }

  async getOrThrowError(id: string): Promise<PondDocument> {
    const pond = await this.pondModel.findById(id, {}, { populate: 'farm' });

    if (!pond || pond.deleted) {
      throw new NotFoundException('استخری با این شناسه یافت نشد.');
    }
    return pond;
  }
}
