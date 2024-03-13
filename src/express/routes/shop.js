import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { getRootProducts } from '../controllers/shop.js';

// api? которая использует внутри себя fetch и ходит по маршрутам
//

export const initShopRouter = (app) => {
  const shopRoutes = new Router();

  // будет работать в www.check.com/something
  app.use(shopRoutes);
  // будет слушать только гет-запросы, по определённому адресу
  shopRoutes.get(AppRoute.ROOT, getRootProducts);
  // shopRoutes.post(AppRoute.ROOT, postRootProducts);
};
