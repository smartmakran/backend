import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema({ collection: 'sensors' })
export class Sensor extends Base {
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
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
