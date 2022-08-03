import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pool, PoolSchema } from 'schema/pool.schema';
import { PoolController } from './Pool.controller';
import { PoolService } from './pool.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pool.name, schema: PoolSchema }]),
    UserModule,
  ],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
