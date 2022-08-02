import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from 'schema/farm.schema';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
    UserModule,
  ],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
