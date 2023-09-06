import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SamplingDocument = Sampling & Document;

@Schema({ collection: 'samplings' })
export class Sampling {
  _id: ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'pond',
  })
  pond: ObjectId;

  @Prop({
    type: [Number],
    array: true,
    required: true,
  })
  size: number[];

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;
}

export const SamplingSchema = SchemaFactory.createForClass(Sampling);
