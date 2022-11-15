import { GetAllResponseDto } from 'dto';
import { GetOneTaskResponseDto } from './get-one-response.dto';

export class GetAllTaskResponseDto extends GetAllResponseDto<GetOneTaskResponseDto> {}
