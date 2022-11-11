import { FarmService } from '@modules/farm/farm.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ParamIdDto } from 'dto/paramId.dto';
import { ICreate, IGetAll, IGetOne } from 'interface';
import { Model } from 'mongoose';
import { Pool, PoolDocument } from 'schema/pool.schema';
import { GetAllPoolQueryDto, GetOnePoolResponseDto } from './dto';
import { PoolCreateBodyDto } from './dto/create-body.dto';

export class PoolService
  implements
    IGetAll<GetAllPoolQueryDto, GetAllResponseDto<GetOnePoolResponseDto>>,
    IGetOne<GetOnePoolResponseDto>,
    ICreate<PoolCreateBodyDto>
{
  @InjectModel(Pool.name)
  private readonly poolModel: Model<PoolDocument>;
  @Inject()
  private readonly farmService: FarmService;

  async getAll(
    query: GetAllPoolQueryDto,
  ): Promise<GetAllResponseDto<GetOnePoolResponseDto>> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.poolModel.find({ skip, limit }),
      this.poolModel.countDocuments(),
    ]);

    return plainToInstance(GetAllResponseDto<GetOnePoolResponseDto>, {
      count,
      data,
    });
  }

  async create(payload: PoolCreateBodyDto): Promise<any> {
    const { name, farm, dimensions } = payload;
    await this.farmService.getOrThrowError(farm);
    return await this.poolModel.create({
      farm,
      name,
      dimensions,
    });
  }

  async getOne(params: ParamIdDto): Promise<GetOnePoolResponseDto> {
    const pool = await this.getOrThrowError(params.id);
    return plainToInstance(GetOnePoolResponseDto, pool);
  }

  async update(params: ParamIdDto, payload: PoolCreateBodyDto): Promise<void> {
    const pool = await this.getOrThrowError(params.id);
    const { name, dimensions } = payload;

    pool.name = name;
    pool.dimensions = dimensions;

    await pool.save();
  }

  async delete(params: ParamIdDto): Promise<void> {
    const pool = await this.getOrThrowError(params.id);
    pool.deleted = true;
    pool.deletedAt = new Date();
    await pool.save();
  }

  async getOrThrowError(id: string): Promise<PoolDocument> {
    const pool = await this.poolModel.findById(id);
    if (!pool || pool.deleted) {
      throw new NotFoundException('استخری با این شناسه یافت نشد.');
    }
    return pool;
  }
}
