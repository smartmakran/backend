import { SocketGateway } from '@modules/socket/socket.gateway';
import { UserService } from '@modules/user/user.service';
import { ConflictException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { GetAllResponseDto } from 'dto';
import { ICreate, IGetAll } from 'interface';
import { DateTime } from 'luxon';
import { Model } from 'mongoose';
import { OptimalData } from 'schema/optimal-data.schema';
import { Sensor, SensorDocument } from 'schema/sensor.schema';
import { GetAllSensorQueryDto, GetOneSensorResponseDto } from './dto';
import { SensorCreateBodyDto } from './dto/create-body.dto';

export class SensorService
  implements
    IGetAll<GetAllSensorQueryDto, GetAllResponseDto<GetOneSensorResponseDto>>,
    ICreate<SensorCreateBodyDto>
{
  @InjectModel(Sensor.name) private readonly sensorModel: Model<SensorDocument>;
  @InjectModel(OptimalData.name)
  private readonly optimalDataModel: Model<OptimalData>;
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
      pond,
      sensorsKey,
      ph,
      oxygen,
      orp,
      ec,
      ammonia,
      nitrite,
      nitrate,
      temperature,
      createdAt,
    } = payload;

    const ponds = await this.userService.getUserPondsBySensorsKey(sensorsKey);
    const pond_ids = ponds.map((pond) => pond.ponds._id.toString());

    if (!pond_ids.includes(pond.toString())) {
      throw new ConflictException('شناسه استخر یا کلید سنسورها نادرست است.');
    }

    await this.sensorModel.create({
      pond,
      ph,
      oxygen,
      orp,
      ec,
      ammonia,
      nitrite,
      nitrate,
      temperature,
      createdAt,
    });

    const data = await this.getSensorDataByPondId(pond.toString());
    this.socketGateway.server.emit('message', data);
  }

  async getSensorDataByPondId(pond: string): Promise<any> {
    return await this.sensorModel.find({
      createdAt: { $gte: DateTime.now().minus({ month: 2 }).toJSDate() },
      pond,
    });
  }

  async createOptimalData(payload: SensorCreateBodyDto): Promise<void> {
    const {
      pond,
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

    const ponds = await this.userService.getUserPondsBySensorsKey(sensorsKey);
    const pond_ids = ponds.map((pond) => pond.ponds._id.toString());

    if (!pond_ids.includes(pond.toString())) {
      throw new ConflictException('شناسه استخر یا کلید سنسورها نادرست است.');
    }

    await this.optimalDataModel.create({
      pond,
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
}
