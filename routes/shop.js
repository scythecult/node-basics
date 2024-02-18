import { Router } from 'express';
import { AppRoute } from '../utils.js';
import { getRootProducts } from '../controllers/products.js';

// api? которая использует внутри себя fetch и ходит по маршрутам
//
const shopRoutes = new Router();

// будет слушать только гет-запросы, по определённому адресу
shopRoutes.get(AppRoute.ROOT, getRootProducts);
// shopRoutes.post(AppRoute.ROOT, postRootProducts);

export { shopRoutes };
