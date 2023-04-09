import { GetOnePondResponseDto } from '@modules/pond/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Priority } from 'enum/priority.enum';
import { ObjectId } from 'mongoose';

export class GetOneTaskResponseDto {
  @ApiProperty({
    description: 'شناسه تسک',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'شناسه صاحب تسک',
  })
  @Expose()
  user: string;

  @ApiProperty({
    description: 'شناسه مزرعه',
  })
  @Expose()
  farm: string;

  @ApiProperty({
    description: 'شناسه استخر',
  })
  @Expose()
  @Type(() => GetOnePondResponseDto)
  pond: GetOnePondResponseDto;

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
