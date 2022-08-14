import { UserService } from '@modules/user/user.service';
import { ConflictException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ICreate, IGetAll } from 'interface';
import { Model } from 'mongoose';
import { Sensor, SensorDocument } from 'schema/sensor.schema';
import { GetAllSensorQueryDto, GetOneSensorResponseDto } from './dto';
import { SensorCreateBodyDto } from './dto/create-body.dto';

export class SensorService
  implements
    IGetAll<GetAllSensorQueryDto, GetAllResponseDto<GetOneSensorResponseDto>>,
    ICreate<SensorCreateBodyDto>
{
  @InjectModel(Sensor.name) private readonly sensorModel: Model<SensorDocument>;
  @Inject() private readonly userService: UserService;

  async getAll(
    query: GetAllSensorQueryDto,
  ): Promise<GetAllResponseDto<GetOneSensorResponseDto>> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.sensorModel.find({ skip, limit }),
      this.sensorModel.countDocuments(),
    ]);

    return plainToInstance(GetAllResponseDto<GetOneSensorResponseDto>, {
      count,
      data,
    });
  }

  async create(payload: SensorCreateBodyDto): Promise<any> {
    const {
      pool,
      sensorsKey,
      ph,
      oxygen,
      orp,
      ec,
      ammonia,
      nitrite,
      nitrate,
      temperature,
    } = payload;

    const pools = await this.userService.getUserPoolsBySensorsKey(sensorsKey);
    const pool_ids = pools.map((pool) => pool.pools._id.toString());

    if (!pool_ids.includes(pool.toString())) {
      throw new ConflictException('شناسه استخر یا کلید سنسورها نادرست است.');
    }

    return await this.sensorModel.create({
      pool,
      ph,
      oxygen,
      orp,
      ec,
      ammonia,
      nitrite,
      nitrate,
      temperature,
    });
  }

  async getSensorDataByPoolId(pool: string): Promise<any> {
    return await this.sensorModel.find({ pool });
  }
}
