import { Router } from 'express';
import { getProductDetailsPage } from '../controllers/products.js';
import { AppRoute } from '../utils.js';

const productRoute = new Router();

productRoute.get(AppRoute.PRODUCT_ID, getProductDetailsPage);

export { productRoute };
