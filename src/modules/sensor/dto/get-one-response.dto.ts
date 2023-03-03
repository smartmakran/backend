import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class GetOneSensorResponseDto {
  @ApiProperty({
    example: '5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه رکورد',
  })
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'pH',
  })
  @Expose()
  ph: number;

  @ApiProperty({
    description: 'DO',
  })
  @Expose()
  do: number;

  @ApiProperty({
    description: 'ORP',
  })
  @Expose()
  orp: number;

  @ApiProperty({
    description: 'EC',
  })
  @Expose()
  ec: number;

  @ApiProperty({
    description: 'Ammonia',
  })
  @Expose()
  ammonia: number;

  @ApiProperty({
    description: 'Nitrite',
  })
  @Expose()
  nitrite: number;

  @ApiProperty({
    description: 'Nitrate',
  })
  @Expose()
  nitrate: number;

  @ApiProperty({
    description: 'Temperature',
  })
  @Expose()
  temperature: number;

  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه استخر',
  })
  @Expose()
  pond: Types.ObjectId;
}
