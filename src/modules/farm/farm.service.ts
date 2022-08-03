import { UserService } from '@modules/user/user.service';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ICreate, IGetAll } from 'interface';
import { Model } from 'mongoose';
import { Farm, FarmDocument } from 'schema/farm.schema';
import { GetAllFarmQueryDto, GetOneFarmResponseDto } from './dto';
import { FarmCreateBodyDto } from './dto/create-body.dto';

export class FarmService
  implements
    IGetAll<GetAllFarmQueryDto, GetAllResponseDto<GetOneFarmResponseDto>>,
    ICreate<FarmCreateBodyDto>
{
  @InjectModel(Farm.name) private readonly farmModel: Model<FarmDocument>;
  @Inject() private readonly userService: UserService;

  async getAll(
    query: GetAllFarmQueryDto,
  ): Promise<GetAllResponseDto<GetOneFarmResponseDto>> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.farmModel.find({ skip, limit }),
      this.farmModel.countDocuments(),
    ]);

    return plainToInstance(GetAllResponseDto<GetOneFarmResponseDto>, {
      count,
      data,
    });
  }

  async create(payload: FarmCreateBodyDto): Promise<any> {
    const { name, address, phones, owner } = payload;
    await this.userService.getOrThrowError(owner);
    return await this.farmModel.create({
      name,
      address,
      phones,
      owner,
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
