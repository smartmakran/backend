interface IGetAll<T> {
  getAll(): Promise<{ count: number; data: T[] }>;
}
