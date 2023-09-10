import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GetAllQueryDto } from 'dto/get-all-query.dto';

export class GetAllFarmQueryDto extends GetAllQueryDto {
  @ApiProperty({
    required: false,
    example: '',
    description: 'جستجو در نام مزرعه',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
    example: '',
    description: 'جستجو در شماره تلفن مزرعه',
  })
  @IsOptional()
  phone: string;
}
