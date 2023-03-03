import { FarmModule } from '@modules/farm/farm.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pond, PondSchema } from 'schema/pond.schema';
import { PondController } from './pond.controller';
import { PondService } from './pond.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pond.name, schema: PondSchema }]),
    FarmModule,
  ],
  controllers: [PondController],
  providers: [PondService],
  exports: [PondService],
})
export class PondModule {}
