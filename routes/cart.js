import { Router } from 'express';
import { AppRoute } from '../utils.js';
import { getCartProduct, postCartProduct, postCartRemoveProduct } from '../controllers/products.js';

const cartRoutes = new Router();

cartRoutes.get(AppRoute.CART, getCartProduct);
cartRoutes.post(AppRoute.CART, postCartProduct);
cartRoutes.post(AppRoute.CART_REMOVE_PRODUCT, postCartRemoveProduct);

export { cartRoutes };
