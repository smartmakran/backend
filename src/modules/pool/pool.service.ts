import { UserService } from '@modules/user/user.service';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ICreate, IGetAll } from 'interface';
import { Model } from 'mongoose';
import { Pool, PoolDocument } from 'schema/Pool.schema';
import { GetAllPoolQueryDto, GetOnePoolResponseDto } from './dto';
import { PoolCreateBodyDto } from './dto/create-body.dto';

export class PoolService
  implements
    IGetAll<GetAllPoolQueryDto, GetAllResponseDto<GetOnePoolResponseDto>>,
    ICreate<PoolCreateBodyDto>
{
  @InjectModel(Pool.name) private readonly poolModel: Model<PoolDocument>;
  @Inject() private readonly userService: UserService;

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
    return await this.poolModel.create({
      farm,
      name,
      dimensions,
    });
  }

  async get(params: any): Promise<any> {
    return;
  }

  async update(params: any, payload: any): Promise<any> {
    return;
  }

  async delete(params: any): Promise<any> {
    return;
  }
}
