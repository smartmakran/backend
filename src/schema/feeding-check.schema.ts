import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type FeedingCheckDocument = FeedingCheck & Document;

@Schema({ collection: 'feeding-check' })
export class FeedingCheck {
  _id: ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'pond',
  })
  pond: ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  status: string;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;
}

export const FeedingCheckSchema = SchemaFactory.createForClass(FeedingCheck);
