import { Controller, Get, Inject } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@ApiTags('داشبورد')
@ApiSecurity('Authorization')
export class DashboardController {
  @Inject() private readonly dashboardService: DashboardService;

  @Get()
  @ApiOperation({ summary: 'داشبورد' })
  @ApiResponse({ status: 200, type: String })
  async dashboard() {
    return await this.dashboardService.dashboard();
  }
}
