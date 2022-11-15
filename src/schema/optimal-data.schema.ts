import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type OptimalDataDocument = OptimalData & Document;

@Schema({ collection: 'optimal-data' })
export class OptimalData extends Base {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Pool',
  })
  pool: ObjectId;

  @Prop({
    type: Number,
  })
  ph: number;

  @Prop({
    type: Number,
  })
  oxygen: number;

  @Prop({
    type: Number,
  })
  orp: number;

  @Prop({
    type: Number,
  })
  ec: number;

  @Prop({
    type: Number,
  })
  ammonia: number;

  @Prop({
    type: Number,
  })
  nitrite: number;

  @Prop({
    type: Number,
  })
  nitrate: number;

  @Prop({
    type: Number,
  })
  temperature: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const OptimalDataSchema = SchemaFactory.createForClass(OptimalData);
