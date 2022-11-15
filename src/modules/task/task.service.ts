import { PoolService } from '@modules/pool/pool.service';
import { UserService } from '@modules/user/user.service';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { ParamIdDto } from 'dto/paramId.dto';
import { ICreate, IGetAll, IGetOne, IUpdate } from 'interface';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'schema/task.schema';
import {
  GetAllTaskQueryDto,
  GetAllTaskResponseDto,
  GetOneTaskResponseDto,
} from './dto';
import { TaskCreateBodyDto } from './dto/create-body.dto';

export class TaskService
  implements
    IGetAll<GetAllTaskQueryDto, GetAllTaskResponseDto>,
    IGetOne<GetOneTaskResponseDto>,
    ICreate<TaskCreateBodyDto>,
    IUpdate<TaskCreateBodyDto>
{
  @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>;
  @Inject() private readonly userService: UserService;
  @Inject() private readonly poolService: PoolService;

  async getAll(query: GetAllTaskQueryDto): Promise<GetAllTaskResponseDto> {
    const { skip, limit } = query;
    const dbQuery: any = {};

    if (query.title) {
      dbQuery.name = { $regex: query.title, $options: 'i' };
    }

    dbQuery.deleted = { $ne: true };

    const [data, count] = await Promise.all([
      this.taskModel.find(dbQuery).skip(skip).limit(limit),
      this.taskModel.countDocuments(dbQuery),
    ]);

    return plainToInstance(GetAllTaskResponseDto, {
      count,
      data,
    });
  }

  async getAllByPool(
    id: string,
    query: GetAllTaskQueryDto,
  ): Promise<GetAllTaskResponseDto> {
    const { skip, limit } = query;
    const dbQuery: any = {};

    if (query.title) {
      dbQuery.name = { $regex: query.title, $options: 'i' };
    }

    await this.poolService.getOrThrowError(id);

    dbQuery.deleted = { $ne: true };
    dbQuery.pool = id;

    const [data, count] = await Promise.all([
      this.taskModel.find(dbQuery).skip(skip).limit(limit),
      this.taskModel.countDocuments(dbQuery),
    ]);

    return plainToInstance(GetAllTaskResponseDto, {
      count,
      data,
    });
  }

  async create(payload: TaskCreateBodyDto): Promise<void> {
    const { pool, title, description, dueDate, priority } = payload;
    await this.poolService.getOrThrowError(pool);

    // TODO: check if pool belongs to user

    if (dueDate <= new Date()) {
      throw new ConflictException(
        'زمان ددلاین تسک نمی‌تواند پیش از زما حال باشد',
      );
    }

    await this.taskModel.create({
      pool,
      title,
      description,
      dueDate,
      priority,
    });
  }

  async getOne(params: ParamIdDto): Promise<GetOneTaskResponseDto> {
    const Task = await this.getOrThrowError(params.id);
    return plainToInstance(GetOneTaskResponseDto, Task, {
      excludeExtraneousValues: true,
    });
  }

  async update(params: ParamIdDto, payload: TaskCreateBodyDto): Promise<void> {
    const Task = await this.getOrThrowError(params.id);
    const { title, description, dueDate, priority } = payload;

    Task.title = title;
    Task.description = description;
    Task.dueDate = dueDate;
    Task.priority = priority;

    await Task.save();
  }

  async delete(params: ParamIdDto): Promise<void> {
    const Task = await this.getOrThrowError(params.id);
    Task.deleted = true;
    Task.deletedAt = new Date();
    await Task.save();
  }

  async done(params: ParamIdDto): Promise<void> {
    const Task = await this.getOrThrowError(params.id);
    Task.done = true;
    Task.updatedAt = new Date();
    await Task.save();
  }

  async getOrThrowError(id: string): Promise<TaskDocument> {
    const Task = await this.taskModel.findById(id);
    if (!Task || Task.deleted) {
      throw new NotFoundException('مزرعه‌ای با این شناسه یافت نشد.');
    }
    return Task;
  }
}
