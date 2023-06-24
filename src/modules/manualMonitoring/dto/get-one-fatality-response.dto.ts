import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneFatalityResponseDto {
  @ApiProperty()
  @Expose()
  amount: number;
}
