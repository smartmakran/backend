import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GetOnePondResponseDto } from './get-one-response.dto';

export class GetAllPondsResponseDto {
  @ApiProperty({
    example: 123,
    description: 'تعداد آیتم‌هایی که یافت شد.',
  })
  @Expose()
  count: number;

  @ApiProperty({
    description: 'محتوای آیتم‌هایی که یافت شد.',
  })
  @Expose()
  @Type(() => GetOnePondResponseDto)
  data: GetOnePondResponseDto[];
}
