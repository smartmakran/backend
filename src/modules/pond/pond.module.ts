import { FarmModule } from '@modules/farm/farm.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pond, PondSchema } from 'schema/pond.schema';
import { PondController } from './pond.controller';
import { PondService } from './pond.service';
import { SharedModule } from 'shared/shared.module';
import { PondImage, PondImageSchema } from 'schema/pond-image.schema';
import {
  DiagramConfig,
  DiagramConfigSchema,
} from 'schema/diagram-config.schema';
import { SensorModule } from '@modules/sensor/sensor.module';
import { Sampling, SamplingSchema } from 'schema/sampling.schema';
import { Feeding, FeedingSchema } from 'schema/feeding.schema';
import { Transparency, TransparencySchema } from 'schema/transparency.schema';
import { Fatality, FatalitySchema } from 'schema/fatality.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pond.name, schema: PondSchema },
      { name: PondImage.name, schema: PondImageSchema },
      { name: DiagramConfig.name, schema: DiagramConfigSchema },
      { name: Sampling.name, schema: SamplingSchema },
      { name: Feeding.name, schema: FeedingSchema },
      { name: Transparency.name, schema: TransparencySchema },
      { name: Fatality.name, schema: FatalitySchema },
    ]),
    FarmModule,
    SensorModule,
    SharedModule,
  ],
  controllers: [PondController],
  providers: [PondService],
  exports: [PondService],
})
export class PondModule {}
