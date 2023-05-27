import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type ChangingWaterDocument = ChangingWater & Document;

@Schema({ collection: 'changingWaters' })
export class ChangingWater {
  _id: ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'pond',
  })
  pond: ObjectId;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;
}

export const ChangingWaterSchema = SchemaFactory.createForClass(ChangingWater);
