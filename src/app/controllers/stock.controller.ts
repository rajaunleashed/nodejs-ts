import { Request, Response, NextFunction } from 'express';
import { IRepository } from '../repositories';

export class StockController {
  private readonly _repository: IRepository<any>;

  constructor(repository: IRepository<any>) {
    this._repository = repository;
  }

  public async getStock(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { sku = '' } = request.query;
    return this._repository
      .findOne(sku.toString())
      .then((stocks) => response.status(200).json(stocks))
      .catch((error) => response.status(400).json({ error: error }));
  }
}
