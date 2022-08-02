import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'schema/user.schema';

export class UserService {
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>;

  async getOrThrowError(id: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('کاربری با این شناسه یافت نشد.');
    }
    return user;
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
