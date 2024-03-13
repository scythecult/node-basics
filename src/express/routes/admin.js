import { Router } from 'express';
import { AdminRoute, AppRoute, AppSubRoute } from '../../common/enums/api.js';
import {
  getAdminAddProduct,
  getAdminAllProducts,
  postAdminAddProducts,
  postAdminUpdateProducts,
  postAdminPendingProduct,
  postAdminRemovePendingProduct,
  postAdminRemoveAddedProduct,
} from '../controllers/admin.js';

export const initAdminRounter = (app) => {
  const adminRoutes = new Router();
  // можно добавить часть пути, по которому будет работать основной маршрут
  app.use(AppSubRoute.ADMIN, adminRoutes);

  adminRoutes.get(AppRoute.ADD_PRODUCT, getAdminAddProduct);
  adminRoutes.get(AdminRoute.ALL_PRODUCTS, getAdminAllProducts);
  adminRoutes.post(AppRoute.ADD_PRODUCT, postAdminPendingProduct);
  adminRoutes.post(AppRoute.ADD_PRODUCTS, postAdminAddProducts);
  adminRoutes.post(AppRoute.UPDATE_PRODUCTS, postAdminUpdateProducts);
  adminRoutes.post(AppRoute.REMOVE_PRODUCT, postAdminRemovePendingProduct);
  adminRoutes.post(AppRoute.REMOVE_ADDED_PRODUCT, postAdminRemoveAddedProduct);
};
