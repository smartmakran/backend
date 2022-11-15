import { FarmModule } from '@modules/farm/farm.module';
import { PoolModule } from '@modules/pool/pool.module';
import { SensorModule } from '@modules/sensor/sensor.module';
import { SocketModule } from '@modules/socket/socket.module';
import { TaskModule } from '@modules/task/task.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'guards/roles.guard';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        __dirname,
        '..',
        'configs',
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
    ),
    AuthModule,
    DashboardModule,
    FarmModule,
    PoolModule,
    SensorModule,
    SocketModule,
    TaskModule,
  ],
  controllers: [],
})
export class AppModule {}
