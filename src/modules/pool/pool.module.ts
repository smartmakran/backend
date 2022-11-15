import { FarmModule } from '@modules/farm/farm.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pool, PoolSchema } from 'schema/pool.schema';
import { PoolController } from './pool.controller';
import { PoolService } from './pool.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pool.name, schema: PoolSchema }]),
    FarmModule,
  ],
  controllers: [PoolController],
  providers: [PoolService],
  exports: [PoolService],
})
export class PoolModule {}
