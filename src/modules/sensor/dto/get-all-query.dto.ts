import { ApiProperty } from '@nestjs/swagger';
import { GetAllQueryDto } from 'dto/get-all-query.dto';

export class GetAllSensorQueryDto extends GetAllQueryDto {
  @ApiProperty({
    required: false,
    example: '',
    description: 'جستجو در نام استخر',
  })
  name: string;
}
