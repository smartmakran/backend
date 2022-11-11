import { SocketGateway } from '@modules/socket/socket.gateway';
import { UserService } from '@modules/user/user.service';
import { ConflictException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ICreate, IGetAll } from 'interface';
import { DateTime } from 'luxon';
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
  @Inject() private readonly socketGateway: SocketGateway;

  async getAll(
    query: GetAllSensorQueryDto,
  ): Promise<GetAllResponseDto<GetOneSensorResponseDto>> {
    const { skip, limit } = query;
    const [data, count] = await Promise.all([
      this.sensorModel.find({
        createdAt: DateTime.now().minus({ day: 1 }).toJSDate(),
        skip,
        limit,
      }),
      this.sensorModel.countDocuments(),
    ]);

    return plainToInstance(GetAllResponseDto<GetOneSensorResponseDto>, {
      count,
      data,
    });
  }

  async create(payload: SensorCreateBodyDto): Promise<void> {
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

    await this.sensorModel.create({
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

    const data = await this.getSensorDataByPoolId(pool.toString());
    this.socketGateway.server.emit('message', data);
  }

  async getSensorDataByPoolId(pool: string): Promise<any> {
    return await this.sensorModel.find({
      createdAt: { $gte: DateTime.now().minus({ month: 2 }).toJSDate() },
      pool,
    });
  }
}
