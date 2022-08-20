import express, { Router } from 'express';
import { stockRouter } from './stock.router';

const router: Router = express.Router();
router.use('/stocks', stockRouter);

export const appRouter: Router = router;
