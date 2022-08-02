import { Types } from 'mongoose';

interface IUpdate<P> {
  update(id: Types.ObjectId, payload: P): Promise<void>;
}
