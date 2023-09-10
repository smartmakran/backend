import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { FarmModule } from '../farm/farm.module';
import { PondModule } from '../pond/pond.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
    FarmModule,
    PondModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
