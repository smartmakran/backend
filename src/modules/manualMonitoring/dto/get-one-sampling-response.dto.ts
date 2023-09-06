import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneSamplingResponseDto {
  @ApiProperty()
  @Expose()
  size: number[];

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
