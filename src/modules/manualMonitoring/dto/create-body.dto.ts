import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
} from 'class-validator';

class CreateBodyDto {
  @ApiProperty({})
  @IsMongoId()
  pond: string;

  @ApiProperty({})
  @IsDateString()
  createdAt: Date;
}

export class CreateSamplingBodyDto extends CreateBodyDto {
  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsArray()
  size: number[];
}

export class CreateFeedingBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;

  @ApiProperty({})
  @IsString()
  type: string;
}

export class CreateChangingWaterBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;
}

export class CreateTransparencyBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;
}

export class CreateFeedingCheckBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsString()
  status: string;
}

export class CreateFatalityBodyDto extends CreateBodyDto {
  @ApiProperty({})
  @IsNumber()
  amount: number;
}
