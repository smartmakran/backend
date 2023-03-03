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
  GetAllPondQueryDto,
  GetOnePondResponseDto,
  PondCreateBodyDto,
} from './dto';

import { PondService } from './pond.service';

@Controller('pond')
@ApiTags('Pond')
@ApiSecurity('Authorization')
export class PondController
  implements
    IGetAll<GetAllPondQueryDto, GetAllResponseDto<GetOnePondResponseDto>>,
    IGetOne<GetOnePondResponseDto>,
    ICreate<PondCreateBodyDto>
{
  @Inject() private readonly PondService: PondService;

  @Get()
  @ApiOperation({ summary: 'لیست تمام استخرها' })
  public async getAll(
    @Query() query: GetAllPondQueryDto,
  ): Promise<GetAllResponseDto<GetOnePondResponseDto>> {
    return await this.PondService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'ثبت استخر جدید' })
  public async create(@Body() payload: PondCreateBodyDto): Promise<void> {
    await this.PondService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزییات استخر' })
  public async getOne(
    @Param() params: ParamIdDto,
  ): Promise<GetOnePondResponseDto> {
    return await this.PondService.getOne(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ویرایش استخر' })
  public async update(
    @Param() params: any,
    @Body() payload: any,
  ): Promise<any> {
    return await this.PondService.update(params.id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف استخر' })
  public async delete(@Param() params: any): Promise<any> {
    return await this.PondService.delete(params.id);
  }
}
