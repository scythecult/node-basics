import { Router } from 'express';
import { getProductDetailsPage } from '../controllers/product-details.js';
import { AppRoute } from '../utils.js';

const productDetailsRoute = new Router();

productDetailsRoute.get(AppRoute.PRODUCT_ID, getProductDetailsPage);

export { productDetailsRoute };
