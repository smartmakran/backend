import { Base } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Priority } from 'enum/priority.enum';

export type TaskDocument = Task & Document;

@Schema({ collection: 'tasks', timestamps: true })
export class Task extends Base {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Pool',
  })
  pool: ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  done: boolean;

  @Prop({
    type: Date,
    required: true,
  })
  dueDate: Date;

  @Prop({
    type: String,
    enum: Priority,
    default: Priority.LOW,
  })
  priority: string;

  @Prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
