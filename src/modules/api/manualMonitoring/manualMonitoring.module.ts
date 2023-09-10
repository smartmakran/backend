import { Module } from '@nestjs/common';
import { ManualMonitoringController } from './manualMonitoring.controller';
import { ManualMonitoringService } from './manualMonitoring.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChangingWater,
  ChangingWaterSchema,
} from 'schema/changing-water.schema';
import { Feeding, FeedingSchema } from 'schema/feeding.schema';
import { Sampling, SamplingSchema } from 'schema/sampling.schema';
import { Transparency, TransparencySchema } from 'schema/transparency.schema';
import { FeedingCheck, FeedingCheckSchema } from 'schema/feeding-check.schema';
import { Fatality, FatalitySchema } from 'schema/fatality.schema';
import { PondModule } from '../pond/pond.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sampling.name, schema: SamplingSchema },
      { name: Feeding.name, schema: FeedingSchema },
      { name: ChangingWater.name, schema: ChangingWaterSchema },
      { name: Transparency.name, schema: TransparencySchema },
      { name: FeedingCheck.name, schema: FeedingCheckSchema },
      { name: Fatality.name, schema: FatalitySchema },
    ]),
    PondModule,
  ],
  controllers: [ManualMonitoringController],
  providers: [ManualMonitoringService],
})
export class ManualMonitoringModule {}
