import { GetOneUserResponseDto } from '@modules/user/dto/get-one-user-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Country } from 'enum/country.enum';

export class GetOneFarmAddressResponseDto {
  @ApiProperty({ example: Country.Iran, enum: Country })
  @Expose()
  country: string;

  @ApiProperty({ example: 'تهران', description: 'نام استان' })
  @Expose()
  province: string;

  @ApiProperty({ example: 'تهران', description: 'نام شهر' })
  @Expose()
  city: string;

  @ApiProperty({ example: 'خیابان شهید بهشتی', description: 'نام خیابان' })
  @Expose()
  address: string;

  @ApiProperty({ example: [35.71565, 51.4065], description: 'موقعیت مکانی' })
  @Expose()
  coordinates: number[];
}

export class GetOneFarmResponseDto {
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
  address: GetOneFarmAddressResponseDto;

  @ApiProperty({
    example: ['09121234567', '09121234568'],
    description: 'شماره تلفن‌ها',
  })
  @Expose()
  phones: string[];

  @ApiProperty({
    description: 'صاحب مزرعه',
  })
  @Expose()
  owner: GetOneUserResponseDto;
}
