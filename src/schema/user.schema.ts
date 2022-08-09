import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '@modules/auth/enum/role.enum';
import { IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User extends Base {
  @Prop({
    type: String,
    required: false,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64,
  })
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @Prop({
    type: String,
    required: false,
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
    default: randomUUID,
  })
  sensorsKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
