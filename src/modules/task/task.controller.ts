import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@modules/auth/enum/role.enum';
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
  GetAllTaskQueryDto,
  GetOneTaskResponseDto,
  TaskCreateBodyDto,
  GetAllTaskResponseDto,
} from './dto';

import { TaskService } from './task.service';

@Controller('task')
@ApiTags('Task')
@ApiSecurity('Authorization')
export class TaskController
  implements
    IGetAll<GetAllTaskQueryDto, GetAllTaskResponseDto>,
    IGetOne<GetOneTaskResponseDto>,
    ICreate<TaskCreateBodyDto>,
    IUpdate<TaskCreateBodyDto>
{
  @Inject() private readonly taskService: TaskService;

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'لیست تمام تسک‌ها' })
  public async getAll(
    @Query() query: GetAllTaskQueryDto,
  ): Promise<GetAllTaskResponseDto> {
    return await this.taskService.getAll(query);
  }

  @Get('pool/:id')
  @ApiOperation({ summary: 'لیست تمام تسک‌ها بر اساس شناسه استخر' })
  public async getAllByPool(
    @Param() param: ParamIdDto,
    @Query() query: GetAllTaskQueryDto,
  ): Promise<GetAllTaskResponseDto> {
    return await this.taskService.getAllByPool(param.id, query);
  }

  @Post()
  @Roles(Role.EXPERT)
  @ApiOperation({ summary: 'ثبت تسک جدید' })
  public async create(@Body() payload: TaskCreateBodyDto): Promise<void> {
    await this.taskService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزییات تسک' })
  public async getOne(
    @Param() params: ParamIdDto,
  ): Promise<GetOneTaskResponseDto> {
    return await this.taskService.getOne(params);
  }

  @Put(':id')
  @ApiOperation({ summary: 'ویرایش تسک' })
  public async update(
    @Param() params: ParamIdDto,
    @Body() payload: TaskCreateBodyDto,
  ): Promise<void> {
    await this.taskService.update(params, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'حذف تسک' })
  public async delete(@Param() params: ParamIdDto): Promise<void> {
    await this.taskService.delete(params);
  }

  @Put(':id/done')
  @ApiOperation({ summary: 'انجام تسک' })
  public async done(@Param() params: ParamIdDto): Promise<void> {
    await this.taskService.done(params);
  }
}
