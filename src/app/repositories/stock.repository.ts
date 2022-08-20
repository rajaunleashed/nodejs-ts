import { IRepository } from './repository.interface';
import { IStock, IStockData } from './stock.interface';
import stocksData from './../data/stock.json';
import transactionsData from './../data/transactions.json';
import _ from 'lodash';
export class StockRepository implements IRepository<IStock> {
  /**
   * @name findOne
   * @param sku 
   * @returns Promise<IStock>
   */
  public async findOne(sku: string): Promise<IStock> {
    try {
      const transactions = _.filter(transactionsData, trx => trx.sku === sku);
      let currentStock = _.find(stocksData, stock => stock.sku === sku);
      if (!transactions.length && !currentStock) {
        throw {
          message: 'SKU does not exists'
        }
      }

      return {
        sku,
        qty: currentStock?.stock || 0
      }
    } catch (error) {
      throw error
    }
  }
}
