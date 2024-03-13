import { Router } from 'express';
import { getProductDetailsPage } from '../controllers/product-details.js';
import { AppRoute, AppSubRoute } from '../../common/enums/api.js';

export const initProductDetailsRouter = (app) => {
  const productDetailsRoute = new Router();

  app.use(AppSubRoute.PRODUCT_DETAILS, productDetailsRoute);

  productDetailsRoute.get(AppRoute.PRODUCT_ID, getProductDetailsPage);
};
