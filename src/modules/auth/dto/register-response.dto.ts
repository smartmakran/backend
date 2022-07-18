import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterResponseDto {
  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  message: string;
}
