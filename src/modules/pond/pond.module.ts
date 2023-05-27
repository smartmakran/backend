import { FarmModule } from '@modules/farm/farm.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pond, PondSchema } from 'schema/pond.schema';
import { PondController } from './pond.controller';
import { PondService } from './pond.service';
import { SharedModule } from 'shared/shared.module';
import { PondImage, PondImageSchema } from 'schema/pond-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pond.name, schema: PondSchema },
      { name: PondImage.name, schema: PondImageSchema },
    ]),
    FarmModule,
    SharedModule,
  ],
  controllers: [PondController],
  providers: [PondService],
  exports: [PondService],
})
export class PondModule {}
