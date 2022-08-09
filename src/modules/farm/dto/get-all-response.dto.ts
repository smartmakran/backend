import { GetAllResponseDto } from 'dto';
import { GetOneFarmResponseDto } from './get-one-response.dto';

export class GetAllFarmResponseDto extends GetAllResponseDto<GetOneFarmResponseDto> {}
