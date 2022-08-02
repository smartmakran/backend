interface ICreate<P> {
  create(payload: P): Promise<void>;
}
