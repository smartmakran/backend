import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/modules/auth/enum/role.enum';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
