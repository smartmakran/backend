import { ObjectId } from 'mongodb';
import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class Base {
  _id: ObjectId;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  active: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  deleted: boolean;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  deletedAt: Date;
}
