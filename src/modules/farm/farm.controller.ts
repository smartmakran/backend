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
import { FarmCreateBodyDto } from './dto/create-body.dto';
import { FarmService } from './farm.service';

@Controller('farm')
@ApiTags('Farm')
@ApiSecurity('Authorization')
export class FarmController implements ICreate<FarmCreateBodyDto> {
  @Inject() private readonly farmService: FarmService;

  @Get()
  @ApiOperation({ summary: 'لیست تمام مزرعه‌ها' })
  public async getAll(@Query() query: any): Promise<any> {
    return await this.farmService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'ثبت مزرعه جدید' })
  public async create(@Body() payload: FarmCreateBodyDto): Promise<void> {
    await this.farmService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزییات مزرعه' })
  public async get(@Param() params: any): Promise<any> {
    return await this.farmService.get(params.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ویرایش مزرعه' })
  public async update(
    @Param() params: any,
    @Body() payload: any,
  ): Promise<any> {
    return await this.farmService.update(params.id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف مزرعه' })
  public async delete(@Param() params: any): Promise<any> {
    return await this.farmService.delete(params.id);
  }
}
