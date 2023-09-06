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
  @IsOptional()
  @Type()
  skip = 0;

  @ApiProperty({
    required: false,
    example: 20,
    description: 'تعدادی که می‌خواهیم برگردانده شوند.',
  })
  @IsOptional()
  @Type()
  limit = 20;

  @ApiProperty({
    required: false,
    example: DateTime.now().minus({ day: 2 }).toJSDate(),
  })
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    required: false,
    example: DateTime.now().toJSDate(),
  })
  @IsDateString()
  @IsOptional()
  endDate: Date;
}
