import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type PoolDocument = Pool & Document;

export class PoolDimensions {
  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  depth: number;
}

@Schema({ collection: 'pools', timestamps: true })
export class Pool extends Base {
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
    type: PoolDimensions,
    required: true,
  })
  dimensions: PoolDimensions;
}

export const PoolSchema = SchemaFactory.createForClass(Pool);
