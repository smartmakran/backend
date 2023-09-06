import { ParamIdDto } from 'dto/paramId.dto';

export interface IUpdate<P> {
  update(params: ParamIdDto, payload: P): Promise<void>;
}
