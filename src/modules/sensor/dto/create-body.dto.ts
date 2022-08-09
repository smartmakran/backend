import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsUUID } from 'class-validator';
import { Types } from 'mongoose';

export class SensorCreateBodyDto {
  @ApiProperty({
    example: 12,
    description: 'pH',
  })
  @IsNumber()
  ph: number;

  @ApiProperty({
    example: 15,
    description: 'DO',
  })
  @IsNumber()
  oxygen: number;

  @ApiProperty({
    example: 500,
    description: 'ORP',
  })
  @IsNumber()
  orp: number;

  @ApiProperty({
    example: 25,
    description: 'EC',
  })
  @IsNumber()
  ec: number;

  @ApiProperty({
    example: 0.5,
    description: 'Ammonia',
  })
  @IsNumber()
  ammonia: number;

  @ApiProperty({
    example: 50,
    description: 'Nitrite',
  })
  @IsNumber()
  nitrite: number;

  @ApiProperty({
    example: 60,
    description: 'Nitrate',
  })
  @IsNumber()
  nitrate: number;

  @ApiProperty({
    example: 24,
    description: 'Temperature',
  })
  @IsNumber()
  temperature: number;

  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه استخر',
  })
  @IsMongoId({ message: 'شناسه استخر باید از نوع شناسه باشد' })
  pool: Types.ObjectId;

  @ApiProperty({
    example: '6bcb85f0-6317-4c28-b589-4c5d1886ca8c',
    description: 'کلید سنسور استخر',
  })
  @IsUUID('4', { message: 'کلید سنسور باید از نوع uuid باشد.' })
  sensorsKey: string;
}
