import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Country } from 'enum/country.enum';

export type FarmDocument = Farm & Document;

export class FarmAddress {
  @Prop({
    type: String,
    required: true,
    enum: Country,
    default: Country.Iran,
  })
  country: string;

  @Prop({
    type: String,
    required: true,
  })
  province: string;

  @Prop({
    type: String,
    required: true,
  })
  city: string;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: [Number],
    required: true,
  })
  coordinates: number[];
}

@Schema({ collection: 'farms', timestamps: true })
export class Farm extends Base {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: FarmAddress,
    required: true,
  })
  address: FarmAddress;

  @Prop({
    type: [String],
    required: true,
  })
  phones: string[];

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'User',
  })
  owner: ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false,
    ref: 'User',
  })
  expert: ObjectId;
}

export const FarmSchema = SchemaFactory.createForClass(Farm);
