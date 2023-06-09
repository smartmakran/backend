import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type PondImageDocument = PondImage & Document;

@Schema({ collection: 'pond-image', timestamps: true })
export class PondImage extends Base {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Pond',
  })
  pond: ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: String,
    required: true,
  })
  file: string;

  @Prop({
    type: Date,
    required: true,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  insertedAt: Date;
}

export const PondImageSchema = SchemaFactory.createForClass(PondImage);
