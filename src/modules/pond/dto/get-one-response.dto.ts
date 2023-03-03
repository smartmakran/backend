import { GetOneFarmResponseDto } from '@modules/farm/dto';
import { GetOneUserResponseDto } from '@modules/user/dto/get-one-user-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Country } from 'enum/country.enum';

export class GetOnePondDimensionsResponseDto {
  @ApiProperty({
    example: 20,
    description: 'طول استخر',
  })
  @Expose()
  length: number;

  @ApiProperty({
    example: 10,
    description: 'عرض استخر',
  })
  @Expose()
  width: number;

  @ApiProperty({
    example: 2,
    description: 'عمق استخر',
  })
  @Expose()
  depth: number;
}

export class GetOnePondResponseDto {
  @ApiProperty({
    example: '5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه مزرعه',
  })
  @Expose()
  _id: string;

  @ApiProperty({
    example: 'مزرعه رحیمی',
    description: 'نام مزرعه',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'آدرس مزرعه',
  })
  @Expose()
  dimensions: GetOnePondDimensionsResponseDto;

  @ApiProperty({
    description: 'مزرعه',
  })
  @Expose()
  farm: GetOneFarmResponseDto;
}
