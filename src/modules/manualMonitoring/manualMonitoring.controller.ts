import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { ManualMonitoringService } from './manualMonitoring.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateChangingWaterBodyDto,
  CreateFeedingBodyDto,
  CreateSamplingBodyDto,
  CreateTransparencyBodyDto,
} from './dto/create-body.dto';
import { ParamIdDto } from 'dto/paramId.dto';

@Controller('manualMonitoring')
@ApiTags('Manual Monitoring')
export class ManualMonitoringController {
  @Inject()
  private readonly manualMonitoringService: ManualMonitoringService;

  @Get(':id')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'اطلاعات اضافه' })
  async getManualMonitoring(@Param() param: ParamIdDto) {
    return await this.manualMonitoringService.getAll(param.id);
  }

  @Post('sampling')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ثبت نمونه‌برداری' })
  async createSampling(@Body() body: CreateSamplingBodyDto): Promise<void> {
    await this.manualMonitoringService.createSampling(body);
  }

  @Post('feeding')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ثبت غذادهی' })
  async createFeeding(@Body() body: CreateFeedingBodyDto): Promise<void> {
    await this.manualMonitoringService.createFeeding(body);
  }

  @Post('changingWater')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ثبت تعویض آب' })
  async createWaterChanging(
    @Body() body: CreateChangingWaterBodyDto,
  ): Promise<void> {
    await this.manualMonitoringService.createChangingWater(body);
  }

  @Post('transparency')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'ثبت شفافیت' })
  async createTransparency(
    @Body() body: CreateTransparencyBodyDto,
  ): Promise<void> {
    await this.manualMonitoringService.createTransparency(body);
  }
}
