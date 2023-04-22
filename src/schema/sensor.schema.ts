import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema({ collection: 'sensors' })
export class Sensor {
  _id: ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'pond',
  })
  pond: ObjectId;

  @Prop({
    type: Number,
    required: false,
  })
  ph: number;

  @Prop({
    type: Number,
    required: false,
  })
  oxygen: number;

  @Prop({
    type: Number,
    required: false,
  })
  orp: number;

  @Prop({
    type: Number,
    required: false,
  })
  ec: number;

  @Prop({
    type: Number,
    required: false,
  })
  ammonia: number;

  @Prop({
    type: Number,
    required: false,
  })
  nitrite: number;

  @Prop({
    type: Number,
    required: false,
  })
  nitrate: number;

  @Prop({
    type: Number,
    required: false,
  })
  temperature: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
