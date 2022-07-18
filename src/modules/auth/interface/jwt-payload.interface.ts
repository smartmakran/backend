import { ObjectId } from 'mongodb';

export interface JwtPayload {
  _id: ObjectId;
  phone?: string;
}
