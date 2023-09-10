import {
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Render,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ParamIdDto } from 'dto/paramId.dto';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@ApiTags('Dashboard')
@ApiSecurity('Authorization')
export class DashboardController {
  @Inject() private readonly dashboardService: DashboardService;

  @Get(':id')
  @ApiOperation({ summary: 'داشبورد' })
  @ApiResponse({ status: 200, type: String })
  async dashboard(@Param() params: ParamIdDto) {
    return await this.dashboardService.dashboard(params);
  }
}
