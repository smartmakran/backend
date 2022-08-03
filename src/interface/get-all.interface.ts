export interface IGetAll<Q, R> {
  getAll(query: Q): Promise<R>;
}
