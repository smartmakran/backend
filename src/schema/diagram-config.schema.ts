import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import {
  BaseDiagramConfig,
  MortalityDiagramConfig,
  SamplingDiagramConfig,
  SensorDataDiagramConfig,
} from 'types/diagram-config.type';

export type DiagramConfigDocument = DiagramConfig & Document;

@Schema({ collection: 'diagram-config', timestamps: true })
export class DiagramConfig extends Base {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Pond',
  })
  pond: ObjectId;

  @Prop({
    type: Object,
  })
  ph: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  oxygen: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  orp: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  ec: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  ammonia: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  nitrite: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  nitrate: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  temperature: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  transparency: SensorDataDiagramConfig;

  @Prop({
    type: Object,
  })
  sampling: SamplingDiagramConfig;

  @Prop({
    type: Object,
  })
  feeding: BaseDiagramConfig;

  @Prop({
    type: Object,
  })
  changingWater: BaseDiagramConfig;

  @Prop({
    type: Object,
  })
  mortality: MortalityDiagramConfig;
}

export const DiagramConfigSchema = SchemaFactory.createForClass(DiagramConfig);
