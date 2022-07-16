import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User extends Base {
  @Prop({
    type: String,
    required: false,
  })
  firstName: string;

  @Prop({
    type: String,
    required: false,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
  })
  avatar: string;

  @Prop({
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
