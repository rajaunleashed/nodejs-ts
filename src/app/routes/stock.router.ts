import express, { Request, Response, Router, NextFunction } from 'express';
import { StockController } from '../controllers';
import { IRepository, StockRepository } from '../repositories';

const router: Router = express.Router();
const stockRepository: IRepository<any> = new StockRepository();
const controller: StockController = new StockController(stockRepository);


router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  await controller.getStock(request, response, next);
});

export const stockRouter: Router = router;
