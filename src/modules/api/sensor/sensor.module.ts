import { SocketModule } from '@modules/socket/socket.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptimalData, OptimalDataSchema } from 'schema/optimal-data.schema';
import { Sensor, SensorSchema } from 'schema/sensor.schema';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
    MongooseModule.forFeature([
      { name: OptimalData.name, schema: OptimalDataSchema },
    ]),
    UserModule,
    SocketModule,
  ],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService],
})
export class SensorModule {}
