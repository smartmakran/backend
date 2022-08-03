import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { GetAllResponseDto } from 'dto';
import { IGetAll, ICreate } from 'interface';
import {
  GetAllSensorQueryDto,
  GetOneSensorResponseDto,
  SensorCreateBodyDto,
} from './dto';

import { SensorService } from './sensor.service';

@Controller('sensor')
@ApiTags('Sensor')
@ApiSecurity('Authorization')
export class SensorController
  implements
    IGetAll<GetAllSensorQueryDto, GetAllResponseDto<GetOneSensorResponseDto>>,
    ICreate<SensorCreateBodyDto>
{
  @Inject() private readonly sensorService: SensorService;

  @Get()
  @ApiOperation({ summary: 'لیست تمام اطلاعات‌ها' })
  public async getAll(
    @Query() query: GetAllSensorQueryDto,
  ): Promise<GetAllResponseDto<GetOneSensorResponseDto>> {
    return await this.sensorService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'ثبت اطلاعات جدید' })
  public async create(@Body() payload: SensorCreateBodyDto): Promise<void> {
    await this.sensorService.create(payload);
  }
}
