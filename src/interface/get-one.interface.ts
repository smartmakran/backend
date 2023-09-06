import { ParamIdDto } from 'dto/paramId.dto';

export interface IGetOne<T> {
  getOne(params: ParamIdDto): Promise<T>;
}
