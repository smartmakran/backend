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
  SetMetadata,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllResponseDto } from 'dto';
import { ParamIdDto } from 'dto/paramId.dto';
import { IGetAll, ICreate, IGetOne } from 'interface';
import {
  GetAllPondQueryDto,
  GetOnePondResponseDto,
  PondCreateBodyDto,
} from './dto';

import { PondService } from './pond.service';
import { AddImageBodyDto } from './dto/add-image-body.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDiagramConfigBodyDto } from './dto/create-diagram-config-body.dto';
import { UpdateDiagramConfigBodyDto } from './dto/update-diagram-config-body.dto';

@Controller('pond')
@ApiTags('Pond')
@ApiSecurity('Authorization')
export class PondController
  implements
    IGetAll<GetAllPondQueryDto, GetAllResponseDto<GetOnePondResponseDto>>,
    IGetOne<GetOnePondResponseDto>,
    ICreate<PondCreateBodyDto>
{
  @Inject() private readonly pondService: PondService;

  @Get()
  @ApiOperation({ summary: 'لیست تمام استخرها' })
  public async getAll(
    @Query() query: GetAllPondQueryDto,
  ): Promise<GetAllResponseDto<GetOnePondResponseDto>> {
    return await this.pondService.getAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'ثبت استخر جدید' })
  public async create(@Body() payload: PondCreateBodyDto): Promise<void> {
    await this.pondService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزییات استخر' })
  public async getOne(
    @Param() params: ParamIdDto,
  ): Promise<GetOnePondResponseDto> {
    return await this.pondService.getOne(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ویرایش استخر' })
  public async update(
    @Param() params: ParamIdDto,
    @Body() payload: any,
  ): Promise<any> {
    return await this.pondService.update(params, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف استخر' })
  public async delete(@Param() params: any): Promise<any> {
    return await this.pondService.delete(params.id);
  }

  @Post('add-image')
  @SetMetadata('isPublic', true)
  @ApiOperation({
    summary: 'ثبت عکس جدید',
  })
  createTicket(@Body() payload: AddImageBodyDto): Promise<any> {
    return this.pondService.addImage(payload);
  }

  @Post(':id/diagram-config')
  @ApiOperation({ summary: 'ثبت تنظیمات استخر جدید' })
  public async createDiagramConfig(
    @Param() param: ParamIdDto,
    @Body() payload: CreateDiagramConfigBodyDto,
  ): Promise<void> {
    await this.pondService.createDiagramConfig(param, payload);
  }

  @Put(':id/diagram-config')
  @ApiOperation({ summary: 'اپدیت تنظیمات استخر جدید' })
  public async updateDiagramConfig(
    @Param() param: ParamIdDto,
    @Body() payload: UpdateDiagramConfigBodyDto,
  ): Promise<void> {
    await this.pondService.updateDiagramConfig(param, payload);
  }
}
