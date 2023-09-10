import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from 'schema/farm.schema';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { Pond, PondSchema } from 'schema/pond.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Farm.name, schema: FarmSchema },
      { name: Pond.name, schema: PondSchema },
    ]),
    UserModule,
  ],
  controllers: [FarmController],
  providers: [FarmService],
  exports: [FarmService],
})
export class FarmModule {}
