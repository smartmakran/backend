import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsUUID } from 'class-validator';
import { Types } from 'mongoose';

export class SensorCreateBodyDto {
  @ApiProperty({
    example: 6,
    description: 'pH',
  })
  @IsNumber()
  ph: number;

  @ApiProperty({
    example: 9,
    description: 'DO',
  })
  @IsNumber()
  oxygen: number;

  @ApiProperty({
    example: 300,
    description: 'ORP',
  })
  @IsNumber()
  orp: number;

  @ApiProperty({
    example: 23,
    description: 'EC',
  })
  @IsNumber()
  ec: number;

  @ApiProperty({
    example: 0.45,
    description: 'Ammonia',
  })
  @IsNumber()
  ammonia: number;

  @ApiProperty({
    example: 1,
    description: 'Nitrite',
  })
  @IsNumber()
  nitrite: number;

  @ApiProperty({
    example: 1,
    description: 'Nitrate',
  })
  @IsNumber()
  nitrate: number;

  @ApiProperty({
    example: 27,
    description: 'Temperature',
  })
  @IsNumber()
  temperature: number;

  @ApiProperty({
    example: '62f72a973515f21eb3661f9a',
    description: 'شناسه استخر',
  })
  @IsMongoId({ message: 'شناسه استخر باید از نوع شناسه باشد' })
  pool: Types.ObjectId;

  @ApiProperty({
    example: 'a00794ea-9f57-45ea-9464-82a1a1e8f698',
    description: 'کلید سنسور استخر',
  })
  @IsUUID('4', { message: 'کلید سنسور باید از نوع uuid باشد.' })
  sensorsKey: string;
}
