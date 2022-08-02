import { Types } from 'mongoose';

interface IDelete {
  delete(id: Types.ObjectId): Promise<void>;
}
