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
    @Param() params: any,
    @Body() payload: any,
  ): Promise<any> {
    return await this.pondService.update(params.id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف استخر' })
  public async delete(@Param() params: any): Promise<any> {
    return await this.pondService.delete(params.id);
  }

  @Post('add-image')
  @SetMetadata('isPublic', true)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: PondService.editFileName,
  //     }),
  //     limits: {
  //       fileSize: PondService.fileSizeLimitation() * 1024 * 1024,
  //     },
  //     fileFilter: PondService.imageFilter,
  //   }),
  // )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'ثبت تیکت جدید',
  })
  createTicket(
    // @UploadedFile() file: Express.Multer.File,
    @Body() payload: AddImageBodyDto,
  ): Promise<any> {
    return this.pondService.addImage(payload);
  }
}
