import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { PondModule } from '@modules/api/pond/pond.module';
import { DashboardModule } from '@modules/api/dashboard/dashboard.module';
import { FarmModule } from '@modules/api/farm/farm.module';
import { ManualMonitoringModule } from '@modules/api/manualMonitoring/manualMonitoring.module';
import { SensorModule } from '@modules/api/sensor/sensor.module';
import { TaskModule } from '@modules/api/task/task.module';
import { UserModule } from '@modules/api/user/user.module';
import { SocketModule } from '@modules/socket/socket.module';

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
    UserModule,
    FarmModule,
    PondModule,
    SensorModule,
    SocketModule,
    TaskModule,
    ManualMonitoringModule,
  ],
  controllers: [],
})
export class AppModule {}
