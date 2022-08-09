import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
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
export class SensorController
  implements
    IGetAll<GetAllSensorQueryDto, GetAllResponseDto<GetOneSensorResponseDto>>,
    ICreate<SensorCreateBodyDto>
{
  @Inject() private readonly sensorService: SensorService;

  @Get()
  @ApiSecurity('Authorization')
  @ApiOperation({ summary: 'لیست تمام اطلاعات‌ها' })
  public async getAll(
    @Query() query: GetAllSensorQueryDto,
  ): Promise<GetAllResponseDto<GetOneSensorResponseDto>> {
    return await this.sensorService.getAll(query);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'ثبت اطلاعات جدید' })
  @ApiResponse({ status: 200 })
  @SetMetadata('isPublic', true)
  public async create(@Body() payload: SensorCreateBodyDto): Promise<void> {
    await this.sensorService.create(payload);
  }
}
