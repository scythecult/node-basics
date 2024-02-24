import { Router } from 'express';
import { AdminRoute, AppRoute } from '../utils.js';
import {
  getAdminAddProduct,
  getAdminAllProducts,
  postAdminAddProducts,
  postAdminUpdateProducts,
  postAdminPendingProduct,
  postAdminRemoveProduct,
} from '../controllers/products.js';

const adminRoutes = new Router();

adminRoutes.get(AppRoute.ADD_PRODUCT, getAdminAddProduct);
adminRoutes.get(AdminRoute.ALL_PRODUCTS, getAdminAllProducts);
adminRoutes.post(AppRoute.ADD_PRODUCT, postAdminPendingProduct);
adminRoutes.post(AppRoute.ADD_PRODUCTS, postAdminAddProducts);
adminRoutes.post(AppRoute.UPDATE_PRODUCTS, postAdminUpdateProducts);
adminRoutes.post(AppRoute.REMOVE_PRODUCT, postAdminRemoveProduct);

export { adminRoutes };
