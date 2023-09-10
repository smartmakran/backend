import { GetOneFarmResponseDto } from './get-one-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class GetAllFarmResponseDto {
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
  @Type(() => GetOneFarmResponseDto)
  data: GetOneFarmResponseDto[];
}
