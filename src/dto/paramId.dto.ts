import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ParamIdDto {
  @ApiProperty({
    example: '5e8f8f8f8f8f8f8f8f8f8f8f',
    description: 'شناسه',
  })
  @IsMongoId({ message: 'شناسه مجاز نیست' })
  @IsNotEmpty({ message: 'شناسه اجباری است' })
  readonly id: string;
}
