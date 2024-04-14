import { Router } from 'express';
import { AdminRoute, AppRoute } from '../../common/enums/api.js';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../models/product.js';
import { RouteSettings } from '../types/common.js';

export const initAdminRouter = (settings: RouteSettings) => {
  const adminRoutes = Router();
  const { api } = settings;
  // можно добавить часть пути, по которому будет работать основной маршрут

  adminRoutes.get(AppRoute.ADD_PRODUCT, (req, res) => {
    // res.sendFile('admin.html', { root: './views' });
    // res.status(200).sendFile('product.html', { root: './views' });
    // res.status(AppCodes.SUCCESS).json('done');
    const pendingProducts = api.getPendingProducts();
    const cartProductQuantity = api.getCartProductsQuantity();

    res.render('admin/add-product', {
      pageTitle: 'Admin Page',
      activePath: AppRoute.ADD_PRODUCT,
      adminActivePath: AdminRoute.ADD_PRODUCT,
      pendingProducts,
      cartProductQuantity,
    });
  });

  adminRoutes.get(AdminRoute.ALL_PRODUCTS, async (req, res) => {
    const products = await api.getAllProducts();
    const cartProductQuantity = api.getCartProductsQuantity();

    res.render('admin/all-products', {
      pageTitle: 'Admin Page',
      activePath: AppRoute.ADD_PRODUCT,
      adminActivePath: AdminRoute.ALL_PRODUCTS,
      products,
      cartProductQuantity,
    });
  });

  adminRoutes.post(AppRoute.ADD_PRODUCT, (req, res) => {
    const newProduct = req.body;

    api.createPendingProduct(new Product(newProduct));

    res.status(StatusCodes.OK).json({ status: 'ok' });
  });

  adminRoutes.post(AppRoute.ADD_PRODUCTS, async (req, res) => {
    const { productIds } = req.body;

    await api.applyPendingProducts(productIds);

    res.status(StatusCodes.OK).json({ status: 'ok' });
  });

  adminRoutes.post(AppRoute.UPDATE_PRODUCTS, async (req, res) => {
    const { editedProducts } = req.body;

    await api.updateProducts(editedProducts);

    res.status(StatusCodes.OK).json({ status: 'ok' });
  });

  adminRoutes.post(AppRoute.REMOVE_PRODUCT, (req, res) => {
    const { productId } = req.body;

    api.removePendingById(productId);

    res.status(StatusCodes.OK).json({ status: 'ok' });
  });

  adminRoutes.post(AppRoute.REMOVE_ADDED_PRODUCT, async (req, res) => {
    const { productId } = req.body;

    api.removeCartProductById(productId);
    await api.removeProductById(productId);

    res.status(StatusCodes.OK).json({ status: 'ok' });
  });

  return adminRoutes;
};
