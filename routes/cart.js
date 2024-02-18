import { Router } from 'express';
import { AppRoute } from '../utils.js';
import { getCartProduct, postCartProduct } from '../controllers/products.js';

const cartRoutes = new Router();

cartRoutes.get(AppRoute.CART, getCartProduct);
cartRoutes.post(AppRoute.CART, postCartProduct);

export { cartRoutes };
