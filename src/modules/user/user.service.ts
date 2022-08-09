import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParamIdDto } from 'dto/paramId.dto';
import { Model, Types } from 'mongoose';
import { Pool } from 'schema/pool.schema';
import { User, UserDocument } from 'schema/user.schema';

export class UserService {
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>;

  async getOrThrowError(params: ParamIdDto): Promise<User> {
    const user = await this.userModel.findById(params.id);
    if (!user) {
      throw new NotFoundException('کاربری با این شناسه یافت نشد.');
    }
    return user;
  }

  async getUserPoolsBySensorsKey(
    sensorsKey: string,
  ): Promise<{ _id; pools: Pool }[]> {
    const pools = await this.userModel
      .aggregate([])
      .match({ sensorsKey })
      .lookup({
        from: 'farms',
        localField: '_id',
        foreignField: 'owner',
        as: 'farms',
      })
      .unwind('$farms')
      .match({ 'farms.active': true })
      .group({
        _id: '$_id',
        farms: { $push: { farm_id: '$farms._id' } },
      })
      .unwind('$farms')
      .lookup({
        from: 'pools',
        localField: 'farms.farm_id',
        foreignField: 'farm',
        as: 'pools',
      })
      .unwind('$pools')
      .project({ pools: 1 });

    if (!pools?.length) {
      throw new NotFoundException('شناسه استخر یا کلید سنسورها نادرست است.');
    }
    return pools;
  }

  async getAll(): Promise<User[]> {
    return;
  }
  async getById(id: Types.ObjectId): Promise<User> {
    return;
  }
  async create(user: User): Promise<User> {
    return;
  }
  async update(id: Types.ObjectId, user: User): Promise<User> {
    return;
  }
  async delete(id: Types.ObjectId): Promise<User> {
    return;
  }
}
