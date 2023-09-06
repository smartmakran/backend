import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsMongoId, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PondDimensionsCreateDto {
  @ApiProperty({ example: 100, description: 'طول استخر' })
  @IsNumber()
  length: number;

  @ApiProperty({ example: 100, description: 'عرض استخر' })
  @IsNumber()
  width: number;

  @ApiProperty({ example: 100, description: 'عمق استخر' })
  @IsNumber()
  depth: number;

  @ApiProperty({ example: 100, description: 'ارتفاع آب استخر' })
  @IsNumber()
  waterHeight: number;
}

export class PondCreateBodyDto {
  @ApiProperty({
    example: 'استخر شماره یک',
    description: 'نام استخر',
  })
  @IsString({ message: 'نام استخر باید از نوع رشته باشد' })
  name: string;

  @ApiProperty({
    type: PondDimensionsCreateDto,
    description: 'ابعاد استخر',
  })
  @Type(() => PondDimensionsCreateDto)
  dimensions: PondDimensionsCreateDto;

  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه مزرعه',
  })
  @IsMongoId({ message: 'شناسه مزرعه باید از نوع شناسه باشد' })
  farm: string;

  @ApiProperty({
    example: 100,
    description: 'تعداد لارو',
  })
  @IsNumber()
  larvaCount: number;

  @ApiProperty({
    example: '2020-01-01 00:00:00',
    description: 'تاریخ شروع کشت',
  })
  @IsDateString()
  startFarming: Date;
}
