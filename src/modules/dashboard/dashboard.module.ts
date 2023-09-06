import { SensorModule } from '@modules/sensor/sensor.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptimalData, OptimalDataSchema } from 'schema/optimal-data.schema';
import { User, UserSchema } from 'schema/user.schema';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: OptimalData.name, schema: OptimalDataSchema },
    ]),
    UserModule,
    SensorModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
