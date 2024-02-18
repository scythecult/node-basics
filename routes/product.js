import { Router } from 'express';
import { getProductPageProduct } from '../controllers/products.js';
import { AppRoute } from '../utils.js';

const productRoute = new Router();

productRoute.get(AppRoute.PRODUCT_ID, getProductPageProduct);

export { productRoute };
