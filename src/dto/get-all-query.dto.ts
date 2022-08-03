import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumberString } from 'class-validator';

export class GetAllQueryDto {
  @ApiProperty({
    required: false,
    example: 0,
    description: 'تعدادی که می‌خواهیم در نظر گرفته نشوند.',
  })
  @Type()
  @IsNumberString({ message: 'skip must be a integer' })
  skip: number;

  @ApiProperty({
    required: false,
    example: 0,
    description: 'تعدادی که می‌خواهیم برگردانده شوند..',
  })
  @Type()
  @IsNumberString({ message: 'limit must be a integer' })
  limit: number;

  @ApiProperty({
    required: false,
    example: '2020-01-01',
  })
  @Type()
  @IsDateString({ message: 'fromDate must be a date' })
  startDate: Date;

  @ApiProperty({
    required: false,
    example: '2020-01-02',
  })
  @Type()
  @IsDateString({ message: 'fromDate must be a date' })
  endDate: Date;
}
