import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneFeedingResponseDto {
  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty()
  @Expose()
  type: string;
}
