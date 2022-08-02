import { UserService } from '@modules/user/user.service';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm, FarmDocument } from 'schema/farm.schema';
import { FarmCreateBodyDto } from './dto/create-body.dto';

export class FarmService implements ICreate<FarmCreateBodyDto> {
  @InjectModel(Farm.name) private readonly farmModel: Model<FarmDocument>;
  @Inject() private readonly userService: UserService;

  async getAll(query: any): Promise<any> {
    return;
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
