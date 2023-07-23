import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GetOneDiagramConfigResponseDto } from './get-one-diagram-config-response.dto';
import { GetOneSensorResponseDto } from '@modules/sensor/dto';
import { GetOneSamplingResponseDto } from '@modules/manualMonitoring/dto/get-one-sampling-response.dto';
import { GetOneFeedingResponseDto } from '@modules/manualMonitoring/dto/get-one-feeding-response.dto';
import { GetOneTransparencyResponseDto } from '@modules/manualMonitoring/dto/get-one-transparency-response.dto';
import { GetOneFatalityResponseDto } from '@modules/manualMonitoring/dto/get-one-fatality-response.dto';
import { GetOneChangingWaterResponseDto } from '@modules/manualMonitoring/dto/get-one-changing-water-response.dto';

export class GetOnePondDimensionsResponseDto {
  @ApiProperty({
    example: 20,
    description: 'طول استخر',
  })
  @Expose()
  length: number;

  @ApiProperty({
    example: 10,
    description: 'عرض استخر',
  })
  @Expose()
  width: number;

  @ApiProperty({
    example: 2,
    description: 'عمق استخر',
  })
  @Expose()
  depth: number;
}

export class GetOnePondResponseDto {
  @ApiProperty({
    example: '5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه حوضچه',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'مزرعه رحیمی',
    description: 'نام مزرعه',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'آدرس مزرعه',
  })
  @Expose()
  dimensions: GetOnePondDimensionsResponseDto;

  @ApiProperty({
    type: String,
    description: 'مزرعه',
  })
  @Expose()
  farm: string;

  @ApiProperty({})
  @Expose()
  startFarming: Date;

  @ApiProperty({})
  @Expose()
  larvaCount: number;

  @ApiProperty({})
  @Expose()
  density: number;

  @ApiProperty({})
  @Expose()
  createdAt: Date;

  @ApiProperty({})
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneDiagramConfigResponseDto)
  diagramConfig: GetOneDiagramConfigResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneSensorResponseDto)
  sensorData: GetOneSensorResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneSamplingResponseDto)
  samplingData: GetOneSamplingResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneFeedingResponseDto)
  feedingData: GetOneFeedingResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneTransparencyResponseDto)
  transparencyData: GetOneTransparencyResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneFatalityResponseDto)
  fatalityData: GetOneFatalityResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetOneChangingWaterResponseDto)
  changingWaterData: GetOneChangingWaterResponseDto;
}
