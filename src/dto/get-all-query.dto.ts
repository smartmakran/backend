import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';
import { DateTime } from 'luxon';

export class GetAllQueryDto {
  @ApiProperty({
    required: false,
    example: 0,
    description: 'تعدادی که می‌خواهیم در نظر گرفته نشوند.',
  })
  @IsNumberString({ message: 'skip باید عدد باشد.' })
  @IsOptional()
  skip: number;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'تعدادی که می‌خواهیم برگردانده شوند.',
  })
  @IsNumberString({ message: 'limit باید عدد باشد.' })
  @IsOptional()
  limit: number;

  @ApiProperty({
    required: false,
    example: DateTime.now().minus({ day: 2 }).toJSDate(),
  })
  @IsDateString({ message: 'startDate باید فرمت تاریخ داشته باشد.' })
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    required: false,
    example: DateTime.now().toJSDate(),
  })
  @IsDateString({ message: 'endDate باید فرمت تاریخ داشته باشد.' })
  @IsOptional()
  endDate: Date;
}
