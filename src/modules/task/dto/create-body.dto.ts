import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsString } from 'class-validator';
import { Priority } from 'enum/priority.enum';

export class TaskCreateBodyDto {
  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه استخر',
  })
  @IsMongoId({ message: 'شناسه استخر باید از نوع شناسه باشد' })
  pond: string;

  @ApiProperty({
    example: 'تسک شماره یک',
    description: 'عنوان تسک',
  })
  @IsString({ message: 'عنوان تسک باید از نوع رشته باشد' })
  title: string;

  @ApiProperty({
    example: 'شما باید این کار رو انجام دهید',
    description: 'توضیح تسک',
  })
  @IsString({ message: 'توضیح تسک باید از جنس رشته باشد.' })
  description: string;

  @ApiProperty({
    example: new Date(),
    description: 'ددلاین تسک',
  })
  @IsString({ message: 'ددلاین تسک باید از جنس رشته باشد.' })
  dueDate: Date;

  @ApiProperty({
    example: Priority.HIGH,
    enum: Priority,
    description: 'اولویت تسک',
  })
  @IsEnum(Priority, { message: 'اولویت تسک باید از جنس enum باشد' })
  priority: Priority;
}
