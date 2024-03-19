import { Router } from 'express';
import { initShopRouter } from './shop.js';
import { AppRoute, AppSubRoute } from '../../common/enums/api.js';
import { initProductDetailsRouter } from './product-details.js';
import { initCartRouter } from './cart.js';
import { initAdminRouter } from './admin.js';

// Используем единую точку инициализации всех роутов

export const initMainRouter = (app, settings) => {
  const mainRouter = new Router();
  const { api } = settings;
  const shopRoutes = initShopRouter({ api });
  const productDetailsRoute = initProductDetailsRouter({ api });
  const cartRoutes = initCartRouter({ api });
  const adminRoutes = initAdminRouter({ api });

  mainRouter.use(AppRoute.ROOT, shopRoutes);
  mainRouter.use(AppSubRoute.PRODUCT_DETAILS, productDetailsRoute);
  mainRouter.use(AppRoute.CART, cartRoutes);
  mainRouter.use(AppSubRoute.ADMIN, adminRoutes);

  app.use(mainRouter);
};
