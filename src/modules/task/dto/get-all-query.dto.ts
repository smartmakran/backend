import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GetAllQueryDto } from 'dto/get-all-query.dto';

export class GetAllTaskQueryDto extends GetAllQueryDto {
  @ApiProperty({
    required: false,
    example: '',
    description: 'جستجو در عنوان تسک',
  })
  @IsOptional()
  title: string;
}
