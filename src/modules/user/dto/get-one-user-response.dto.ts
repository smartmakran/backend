import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneUserResponseDto {
  @ApiProperty({
    example: '62d50438f020b885a0f49446',
    description: 'شناسه کاربر',
  })
  @Expose()
  _id: string;

  @ApiProperty({
    example: 'حسام محمدی',
  })
  @Expose()
  fullName: string;

  @ApiProperty({
    example: '09121234567',
    description: 'شماره تلفن',
  })
  @Expose()
  phone: string;

  @ApiProperty({
    example: 'user',
    description: 'نقش کاربر',
  })
  @Expose()
  role: string;
}
