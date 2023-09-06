import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserModule } from '@modules/user/user.module';
import { FarmModule } from '@modules/farm/farm.module';
import { PondModule } from '@modules/pond/pond.module';

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
