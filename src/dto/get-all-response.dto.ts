import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetAllResponseDto<R> {
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
  data: R[];
}
