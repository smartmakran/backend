import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class AddImageBodyDto {
  @ApiProperty({
    description: 'فایل مورد نظر',
    type: 'string',
    format: 'binary',
    required: true,
  })
  @Optional()
  file: any;

  @ApiProperty({
    example: 's',
    description: 'نوع تصویر ',
  })
  @IsString()
  @IsEnum(['s', 'w'])
  @IsNotEmpty()
  type: 's' | 'w';

  @ApiProperty({
    example: '64149c83a0987338321a3327',
    description: 'شناسه حوضچه',
  })
  @IsMongoId()
  @IsNotEmpty()
  pondId: string;

  @ApiProperty({
    example: 'a00794ea-9f57-45ea-9464-82a1a1e8f698',
    description: 'کلید مزرعه',
  })
  @IsString()
  @IsNotEmpty()
  sensorKey: string;

  @ApiProperty({
    example: new Date(),
    description: 'زمان ثبت عکس',
  })
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;
}
