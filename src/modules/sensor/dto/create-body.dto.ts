import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Types } from 'mongoose';

export class SensorCreateBodyDto {
  @ApiProperty({
    example: 6,
    description: 'pH',
  })
  @IsNumber()
  @IsOptional()
  ph: number;

  @ApiProperty({
    example: 9,
    description: 'DO',
  })
  @IsNumber()
  @IsOptional()
  oxygen: number;

  @ApiProperty({
    example: 300,
    description: 'ORP',
  })
  @IsNumber()
  @IsOptional()
  orp: number;

  @ApiProperty({
    example: 23,
    description: 'EC',
  })
  @IsNumber()
  @IsOptional()
  ec: number;

  @ApiProperty({
    example: 0.45,
    description: 'Ammonia',
  })
  @IsNumber()
  @IsOptional()
  ammonia: number;

  @ApiProperty({
    example: 1,
    description: 'Nitrite',
  })
  @IsNumber()
  @IsOptional()
  nitrite: number;

  @ApiProperty({
    example: 1,
    description: 'Nitrate',
  })
  @IsNumber()
  @IsOptional()
  nitrate: number;

  @ApiProperty({
    example: 27,
    description: 'Temperature',
  })
  @IsNumber()
  @IsOptional()
  temperature: number;

  @ApiProperty({
    example: new Date(),
    description: 'تاریخ ثبت',
  })
  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({
    example: '62f72a973515f21eb3661f9a',
    description: 'شناسه استخر',
  })
  @IsMongoId({ message: 'شناسه استخر باید از نوع شناسه باشد' })
  pond: Types.ObjectId;

  @ApiProperty({
    example: 'a00794ea-9f57-45ea-9464-82a1a1e8f698',
    description: 'کلید سنسور استخر',
  })
  @IsUUID('4', { message: 'کلید سنسور باید از نوع uuid باشد.' })
  sensorsKey: string;
}
