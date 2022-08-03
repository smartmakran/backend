import { UserService } from '@modules/user/user.service';
import { Inject } from '@nestjs/common';
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
      ph,
      oxygen,
      orp,
      ec,
      ammonia,
      nitrite,
      nitrate,
      temperature,
    } = payload;
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

  async get(params: any): Promise<any> {
    return;
  }

  async update(params: any, payload: any): Promise<any> {
    return;
  }

  async delete(params: any): Promise<any> {
    return;
  }
}
