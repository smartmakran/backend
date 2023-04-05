import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { PondStatus } from 'enum/pond-status.enum';

export type PondDocument = Pond & Document;

export class PondDimensions {
  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  depth: number;
}

@Schema({ collection: 'ponds', timestamps: true })
export class Pond extends Base {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Farm',
  })
  farm: ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: PondDimensions,
    required: true,
  })
  dimensions: PondDimensions;

  @Prop({
    type: String,
    default: PondStatus.PREPARING,
  })
  status: PondStatus;

  @Prop({
    type: Date,
  })
  lastFishing: Date;
}

export const PondSchema = SchemaFactory.createForClass(Pond);
