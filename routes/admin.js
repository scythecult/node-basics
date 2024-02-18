import { Router } from 'express';
import { AppRoute } from '../utils.js';
import {
  getAdminAddProduct,
  postAdminAddProducts,
  postAdminPendingProduct,
  postAdminRemoveProduct,
} from '../controllers/products.js';

const adminRoutes = new Router();

adminRoutes.get(AppRoute.ADD_PRODUCT, getAdminAddProduct);
adminRoutes.post(AppRoute.ADD_PRODUCT, postAdminPendingProduct);
adminRoutes.post(AppRoute.ADD_PRODUCTS, postAdminAddProducts);
adminRoutes.post(AppRoute.REMOVE_PRODUCT, postAdminRemoveProduct);

export { adminRoutes };
