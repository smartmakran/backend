import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Country } from 'enum/country.enum';

export class FarmAddressCreateDto {
  @ApiProperty({ example: Country.Iran, enum: Country })
  @IsString({ message: 'فرمت کشور صحیح نیست' })
  public country: string;

  @ApiProperty({ example: 'تهران', description: 'نام استان' })
  @IsString({ message: 'نام استان باید از نوع رشته باشد' })
  public province: string;

  @ApiProperty({ example: 'تهران', description: 'نام شهر' })
  @IsString({ message: 'نام شهر باید از نوع رشته باشد' })
  public city: string;

  @ApiProperty({ example: 'خیابان شهید بهشتی', description: 'نام خیابان' })
  @IsString({ message: 'نام خیابان باید از نوع رشته باشد' })
  public address: string;

  @ApiProperty({ example: [35.71565, 51.4065], description: 'موقعیت مکانی' })
  @IsArray({
    message: 'موقعیت مکانی باید شامل آرایه‌ای از اعداد باشد',
  })
  @IsNumber({}, { each: true })
  public coordinates: number[];
}

export class FarmCreateBodyDto {
  @ApiProperty({
    example: 'مزرعه شماره یک',
    description: 'نام مزرعه',
  })
  @IsString({ message: 'نام مزرعه باید از نوع رشته باشد' })
  name: string;

  @ApiProperty({
    type: FarmAddressCreateDto,
    description: 'آدرس مزرعه',
  })
  @Type(() => FarmAddressCreateDto)
  address: FarmAddressCreateDto;

  @ApiProperty({
    example: ['09121234567', '09121234568'],
    description: 'شماره‌های تماس',
  })
  @IsArray({ message: 'شماره‌های تماس باید شامل آرایه‌ای از رشته‌ها باشد' })
  @IsPhoneNumber('IR', {
    each: true,
    message: 'شماره تماس باید از نوع شماره باشد',
  })
  phones: string[];

  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه کاربر',
  })
  @IsMongoId({ message: 'شناسه کاربر باید از نوع شناسه باشد' })
  owner: string;

  @ApiProperty({
    example: '5d8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه کارشناس',
  })
  @IsMongoId({ message: 'شناسه کارشناس باید از نوع شناسه باشد' })
  @IsOptional()
  expert: string;
}
