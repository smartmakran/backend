import { PartialType } from '@nestjs/swagger';
import { CreateDiagramConfigBodyDto } from './create-diagram-config-body.dto';

export class UpdateDiagramConfigBodyDto extends PartialType(
  CreateDiagramConfigBodyDto,
) {}
