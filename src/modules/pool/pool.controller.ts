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
import { ParamIdDto } from 'dto/paramId.dto';
import { IGetAll, ICreate, IGetOne } from 'interface';
import {
  GetAllPoolQueryDto,
  GetOnePoolResponseDto,
  PoolCreateBodyDto,
} from './dto';

import { PoolService } from './pool.service';

@Controller('pool')
@ApiTags('Pool')
@ApiSecurity('Authorization')
export class PoolController
  implements
    IGetAll<GetAllPoolQueryDto, GetAllResponseDto<GetOnePoolResponseDto>>,
    IGetOne<GetOnePoolResponseDto>,
    ICreate<PoolCreateBodyDto>
{
  @Inject() private readonly PoolService: PoolService;

  @Get()
  @ApiOperation({ summary: 'لیست تمام استخرها' })
  public async getAll(
    @Query() query: GetAllPoolQueryDto,
  ): Promise<GetAllResponseDto<GetOnePoolResponseDto>> {
    return await this.PoolService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'ثبت استخر جدید' })
  public async create(@Body() payload: PoolCreateBodyDto): Promise<void> {
    await this.PoolService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزییات استخر' })
  public async getOne(
    @Param() params: ParamIdDto,
  ): Promise<GetOnePoolResponseDto> {
    return await this.PoolService.getOne(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ویرایش استخر' })
  public async update(
    @Param() params: any,
    @Body() payload: any,
  ): Promise<any> {
    return await this.PoolService.update(params.id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف استخر' })
  public async delete(@Param() params: any): Promise<any> {
    return await this.PoolService.delete(params.id);
  }
}
