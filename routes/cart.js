import { Router } from 'express';
import { AppRoute } from '../utils.js';
import { getCartProduct, postCartProduct, postCartRemoveProduct, postCartUsePromocode } from '../controllers/cart.js';

const cartRoutes = new Router();

cartRoutes.get(AppRoute.CART, getCartProduct);
cartRoutes.post(AppRoute.CART, postCartProduct);
cartRoutes.post(AppRoute.CART_REMOVE_PRODUCT, postCartRemoveProduct);
cartRoutes.post(AppRoute.CART_USE_PROMOCODE, postCartUsePromocode);

export { cartRoutes };
