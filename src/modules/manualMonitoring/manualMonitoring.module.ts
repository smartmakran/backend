import { Module } from '@nestjs/common';
import { ManualMonitoringController } from './manualMonitoring.controller';
import { ManualMonitoringService } from './manualMonitoring.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChangingWater,
  ChangingWaterSchema,
} from 'schema/changingWater.schema';
import { Feeding, FeedingSchema } from 'schema/feeding.schema';
import { Sampling, SamplingSchema } from 'schema/sampling.schema';
import { Transparency, TransparencySchema } from 'schema/transparency.schema';
import { PondModule } from '@modules/pond/pond.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sampling.name, schema: SamplingSchema },
      { name: Feeding.name, schema: FeedingSchema },
      { name: ChangingWater.name, schema: ChangingWaterSchema },
      { name: Transparency.name, schema: TransparencySchema },
    ]),
    PondModule,
  ],
  controllers: [ManualMonitoringController],
  providers: [ManualMonitoringService],
})
export class ManualMonitoringModule {}
