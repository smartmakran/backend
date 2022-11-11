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
import { ParamIdDto } from 'dto/paramId.dto';
import { IGetAll, ICreate, IGetOne, IUpdate } from 'interface';
import {
  GetAllFarmQueryDto,
  GetOneFarmResponseDto,
  FarmCreateBodyDto,
  GetAllFarmResponseDto,
} from './dto';

import { FarmService } from './farm.service';

@Controller('farm')
@ApiTags('Farm')
@ApiSecurity('Authorization')
export class FarmController
  implements
    IGetAll<GetAllFarmQueryDto, GetAllFarmResponseDto>,
    IGetOne<GetOneFarmResponseDto>,
    ICreate<FarmCreateBodyDto>,
    IUpdate<FarmCreateBodyDto>
{
  @Inject() private readonly farmService: FarmService;

  @Get()
  @ApiOperation({ summary: 'لیست تمام مزرعه‌ها' })
  public async getAll(
    @Query() query: GetAllFarmQueryDto,
  ): Promise<GetAllFarmResponseDto> {
    return await this.farmService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'ثبت مزرعه جدید' })
  public async create(@Body() payload: FarmCreateBodyDto): Promise<void> {
    await this.farmService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزییات مزرعه' })
  public async getOne(
    @Param() params: ParamIdDto,
  ): Promise<GetOneFarmResponseDto> {
    return await this.farmService.getOne(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ویرایش مزرعه' })
  public async update(
    @Param() params: ParamIdDto,
    @Body() payload: FarmCreateBodyDto,
  ): Promise<void> {
    await this.farmService.update(params, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف مزرعه' })
  public async delete(@Param() params: ParamIdDto): Promise<void> {
    await this.farmService.delete(params);
  }
}
