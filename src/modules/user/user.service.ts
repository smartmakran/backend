import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParamIdDto } from 'dto/paramId.dto';
import { Model, Types } from 'mongoose';
import { Pond } from 'schema/pond.schema';
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

  async getUserPondsBySensorsKey(
    sensorsKey: string,
  ): Promise<{ _id; ponds: Pond }[]> {
    const ponds = await this.userModel
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
        from: 'ponds',
        localField: 'farms.farm_id',
        foreignField: 'farm',
        as: 'ponds',
      })
      .unwind('$ponds')
      .project({ ponds: 1 });

    if (!ponds?.length) {
      throw new BadRequestException('شناسه استخر یا کلید سنسورها نادرست است.');
    }
    return ponds;
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
