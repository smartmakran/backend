import { FarmModule } from '@modules/farm/farm.module';
import { PondModule } from '@modules/pond/pond.module';
import { SensorModule } from '@modules/sensor/sensor.module';
import { SocketModule } from '@modules/socket/socket.module';
import { TaskModule } from '@modules/task/task.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UserModule } from '@modules/user/user.module';
import { ManualMonitoringModule } from '@modules/manualMonitoring/manualMonitoring.module';

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
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`,
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
