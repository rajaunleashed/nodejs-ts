import request from 'supertest'
import { Application } from '../src/app';
import stockData from '../src/app/data/stock.json';
import transactionData from '../src/app/data/transactions.json';

let server: any;

describe('Stock tests', () => {
  beforeAll(async () => {
    const app = new Application();
    server = app.startServer();
  })
  it('should return error if sku not exists', async () => {
    const sku = 'abc';
    const stocks = await request(server).get(`/api/stocks?sku=${sku}`).expect(400);
    expect(stocks).toHaveProperty('error');
    expect(stocks).toHaveProperty('text');
    const response = JSON.parse(stocks.text);
    expect(response).toHaveProperty('error');
    expect(response.error).toHaveProperty('message');
    expect(response.error.message).toEqual('SKU does not exists');
  });

  it('should return stock level with zero quantity event sku not exists in stocks', async () => {
    const transaction = transactionData;
    const sku = "TVU730483/47/655";
    transaction.push({sku, type:"order", qty: 1 })
    const stocks = await request(server).get(`/api/stocks?sku=${sku}`).expect(200);
    expect(stocks).toHaveProperty('text');
    const response = JSON.parse(stocks.text);
    expect(response).toHaveProperty('sku');
    expect(response).toHaveProperty('qty');
    expect(response.sku).toEqual(sku);
    expect(response.qty).toEqual(0);
  });

  it('should return stock level if exists', async () => {
    const [stock] = stockData;
    const stocks = await request(server).get(`/api/stocks?sku=${stock.sku}`).expect(200);
    expect(stocks).toHaveProperty('text');
    const response = JSON.parse(stocks.text);
    expect(response).toHaveProperty('sku');
    expect(response).toHaveProperty('qty');
    expect(response.sku).toEqual(stock.sku);
    expect(response.qty).toEqual(stock.stock);
  })
})