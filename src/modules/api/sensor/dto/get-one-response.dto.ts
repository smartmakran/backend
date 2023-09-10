import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneSensorResponseDto {
  @ApiProperty({
    description: 'pH',
  })
  @Expose()
  ph: number;

  @ApiProperty({
    description: 'Oxygen',
  })
  @Expose()
  oxygen: number;

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

  @ApiProperty({})
  @Expose()
  createdAt: Date;
}
