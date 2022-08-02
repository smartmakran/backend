import { Types } from 'mongoose';

interface IGetOne<T> {
  getOne(id: Types.ObjectId): Promise<T>;
}
