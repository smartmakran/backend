import { PondService } from '@modules/pond/pond.service';
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
import { FarmService } from '@modules/farm/farm.service';

export class TaskService
  implements
    IGetAll<GetAllTaskQueryDto, GetAllTaskResponseDto>,
    IGetOne<GetOneTaskResponseDto>,
    ICreate<TaskCreateBodyDto>,
    IUpdate<TaskCreateBodyDto>
{
  @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>;
  @Inject() private readonly userService: UserService;
  @Inject() private readonly farmService: FarmService;
  @Inject() private readonly pondService: PondService;

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

  async getAllByUser(
    id: string,
    query: GetAllTaskQueryDto,
  ): Promise<GetAllTaskResponseDto> {
    const { skip, limit } = query;
    const dbQuery: any = {};

    if (query.title) {
      dbQuery.name = { $regex: query.title, $options: 'i' };
    }

    await this.userService.getOrThrowError(id);

    dbQuery.deleted = { $ne: true };
    dbQuery.user = id;

    const [data, count] = await Promise.all([
      this.taskModel.find(dbQuery).skip(skip).limit(limit).populate('pond'),
      this.taskModel.countDocuments(dbQuery),
    ]);

    return plainToInstance(
      GetAllTaskResponseDto,
      {
        count,
        data,
      },
      { excludeExtraneousValues: true, enableImplicitConversion: true },
    );
  }

  async create(payload: TaskCreateBodyDto): Promise<void> {
    const { user, farm, pond, title, description, dueDate, priority } = payload;
    await this.userService.getOrThrowError(user);
    await this.farmService.getOrThrowError(farm);
    await this.pondService.getOrThrowError(pond);

    // TODO: check if pond belongs to user

    if (dueDate <= new Date()) {
      throw new ConflictException(
        'زمان ددلاین تسک نمی‌تواند پیش از زمان حال باشد',
      );
    }

    await this.taskModel.create({
      user,
      farm,
      pond,
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
