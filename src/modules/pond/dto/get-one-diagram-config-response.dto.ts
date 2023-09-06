import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class BaseDiagramConfigResponseDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  yMin: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  yMax: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  frameNumber: number;
}

class SensorDataDiagramConfigResponseDto extends BaseDiagramConfigResponseDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  idealMin: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  idealMax: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  normalMin: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  normalMax: number;
}

class SamplingDiagramConfigResponseDto extends BaseDiagramConfigResponseDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  fcrIdeal: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  fcrNormal: number;
}

class MortalityDiagramConfigResponseDto extends BaseDiagramConfigResponseDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  ideal: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @Expose()
  normal: number;
}

export class GetOneDiagramConfigResponseDto {
  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  ph: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  oxygen: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  orp: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  ec: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  ammonia: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  nitrite: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  nitrate: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  temperature: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SensorDataDiagramConfigResponseDto)
  @Expose()
  transparency: SensorDataDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => SamplingDiagramConfigResponseDto)
  @Expose()
  sampling: SamplingDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => BaseDiagramConfigResponseDto)
  @Expose()
  feeding: BaseDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => BaseDiagramConfigResponseDto)
  @Expose()
  changingWater: BaseDiagramConfigResponseDto;

  @ApiProperty({
    type: Object,
    example: '',
    description: '',
  })
  @Type(() => MortalityDiagramConfigResponseDto)
  @Expose()
  mortality: MortalityDiagramConfigResponseDto;
}
