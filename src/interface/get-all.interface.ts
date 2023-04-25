export interface IGetAll<Q, R> {
  getAll(query: Q, request: Record<string, any>): Promise<R>;
}
