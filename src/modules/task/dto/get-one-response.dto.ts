import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Priority } from 'enum/priority.enum';
import { ObjectId } from 'mongoose';

export class GetOneTaskResponseDto {
  @ApiProperty({
    description: 'شناسه تسک',
  })
  @Expose()
  _id: ObjectId;

  @ApiProperty({
    description: 'شناسه استخر',
  })
  @Expose()
  pool: string;

  @ApiProperty({
    description: 'عنوان تسک',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'توضیح تسک',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'آیا تسک انجام شده است؟',
  })
  @Expose()
  done: Date;

  @ApiProperty({
    description: 'ددلاین تسک',
  })
  @Expose()
  dueDate: Date;

  @ApiProperty({
    enum: Priority,
    description: 'اولویت تسک',
  })
  @Expose()
  priority: Priority;

  @ApiProperty({
    description: 'تاریخ ایجاد تسک',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'تاریخ اپدیت تسک',
  })
  @Expose()
  updatedAt: Date;
}
