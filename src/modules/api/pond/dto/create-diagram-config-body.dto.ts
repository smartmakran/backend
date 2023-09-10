import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class BaseDiagramConfigBodyDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  yMin: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  yMax: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  frameNumber: number;
}

class SensorDataDiagramConfigBodyDto extends BaseDiagramConfigBodyDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  idealMin: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  idealMax: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  normalMin: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  normalMax: number;
}

class SamplingDiagramConfigBodyDto extends BaseDiagramConfigBodyDto {
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

class MortalityDiagramConfigBodyDto extends BaseDiagramConfigBodyDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  ideal: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '',
  })
  @IsNumber()
  normal: number;
}

export class CreateDiagramConfigBodyDto {
  @ApiProperty({
    type: SensorDataDiagramConfigBodyDto,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  ph: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  oxygen: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  orp: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  ec: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  ammonia: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  nitrite: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  nitrate: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  temperature: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      idealMin: 1,
      idealMax: 1,
      normalMin: 1,
      normalMax: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SensorDataDiagramConfigBodyDto)
  transparency: SensorDataDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      fcrIdeal: 1,
      fcrNormal: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => SamplingDiagramConfigBodyDto)
  sampling: SamplingDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => BaseDiagramConfigBodyDto)
  feeding: BaseDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => BaseDiagramConfigBodyDto)
  changingWater: BaseDiagramConfigBodyDto;

  @ApiProperty({
    type: Object,
    example: {
      ideal: 1,
      normal: 1,
      yMin: 1,
      yMax: 1,
      frameNumber: 1,
    },
    description: '',
  })
  @Type(() => MortalityDiagramConfigBodyDto)
  mortality: MortalityDiagramConfigBodyDto;
}
