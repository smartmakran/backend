import { PoolModule } from '@modules/pool/pool.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
    PoolModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
