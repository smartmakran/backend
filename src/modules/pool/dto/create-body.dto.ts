import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PoolDimensionsCreateDto {
  @ApiProperty({ example: 100, description: 'طول استخر' })
  @IsNumber()
  length: number;

  @ApiProperty({ example: 100, description: 'عرض استخر' })
  @IsNumber()
  width: number;

  @ApiProperty({ example: 100, description: 'عمق استخر' })
  @IsNumber()
  depth: number;
}

export class PoolCreateBodyDto {
  @ApiProperty({
    example: 'استخر شماره یک',
    description: 'نام استخر',
  })
  @IsString({ message: 'نام استخر باید از نوع رشته باشد' })
  name: string;

  @ApiProperty({
    type: PoolDimensionsCreateDto,
    description: 'ابعاد استخر',
  })
  @Type(() => PoolDimensionsCreateDto)
  dimensions: PoolDimensionsCreateDto;

  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه مزرعه',
  })
  @IsMongoId({ message: 'شناسه مزرعه باید از نوع شناسه باشد' })
  farm: string;
}
