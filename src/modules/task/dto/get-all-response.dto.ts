import { GetOneTaskResponseDto } from './get-one-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class GetAllTaskResponseDto {
  @ApiProperty({
    example: 123,
    description: 'تعداد آیتم‌هایی که یافت شد.',
  })
  @Expose()
  count: number;

  @ApiProperty({
    type: GetOneTaskResponseDto,
    description: 'محتوای آیتم‌هایی که یافت شد.',
  })
  @Expose()
  @Type(() => GetOneTaskResponseDto)
  data: GetOneTaskResponseDto[];
}
