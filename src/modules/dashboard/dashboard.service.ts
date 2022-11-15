import { SensorService } from '@modules/sensor/sensor.service';
import { UserService } from '@modules/user/user.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParamIdDto } from 'dto/paramId.dto';
import { Model } from 'mongoose';
import { OptimalData } from 'schema/optimal-data.schema';
import { User, UserDocument } from 'schema/user.schema';

export class DashboardService {
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>;
  @InjectModel(OptimalData.name)
  private readonly optimalDataModel: Model<OptimalData>;
  @Inject() private readonly userService: UserService;
  @Inject() private readonly sensorService: SensorService;

  async dashboard(params: ParamIdDto): Promise<any> {
    const user = await this.userModel.findById({ _id: params.id });
    if (!user) {
      throw new NotFoundException('کاربری با این شناسه یافت نشد.');
    }

    const pools = await this.userService.getUserPoolsBySensorsKey(
      user.sensorsKey,
    );

    const sensorData = await this.sensorService.getSensorDataByPoolId(
      pools[0].pools._id.toString(),
    );

    const optimalData = await this.optimalDataModel.find({
      pool: pools[0].pools,
    });

    return { user, pools, sensorData, optimalData };
  }
}
