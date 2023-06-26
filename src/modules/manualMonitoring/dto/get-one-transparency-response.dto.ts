import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneTransparencyResponseDto {
  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
