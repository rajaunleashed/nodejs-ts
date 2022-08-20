export interface IRepository<T> {
  findOne(sku: string): Promise<T>;
}
