import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneSamplingResponseDto {
  @ApiProperty()
  @Expose()
  averageSize: number;

  @ApiProperty()
  @Expose()
  averageMass: number;
}
