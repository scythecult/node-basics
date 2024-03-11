import { AdminRoute, AppCodes, AppRoute } from '../common/enums/api.js';
import { Product } from '../models/product.js';
import { cartSevice, productService } from './app.js';

export const getAdminAddProduct = (req, res) => {
  // res.sendFile('admin.html', { root: './views' });
  // res.status(200).sendFile('product.html', { root: './views' });
  // res.status(AppCodes.SUCCESS).json('done');

  res.render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    adminActivePath: AdminRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const getAdminAllProducts = async (req, res) => {
  const products = await productService.getAll();

  res.render('admin/all-products', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    adminActivePath: AdminRoute.ALL_PRODUCTS,
    products,
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const postAdminUpdateProducts = async (req, res) => {
  const { editedProducts } = req.body;

  await productService.update(editedProducts);

  res.status(AppCodes.SUCCESS).json({ status: 'ok' });
};

export const postAdminPendingProduct = (req, res) => {
  const newProduct = req.body;

  productService.createPending(new Product(newProduct));

  res.status(AppCodes.SUCCESS).json({ status: 'ok' });
};

export const postAdminAddProducts = async (req, res) => {
  const { productIds } = req.body;

  await productService.applyPending(productIds);

  res.status(AppCodes.SUCCESS).json({ status: 'ok' });
};

export const postAdminRemovePendingProduct = (req, res) => {
  const { productId } = req.body;

  productService.removePendingById(productId);

  res.status(AppCodes.SUCCESS).json({ status: 'ok' });
};

export const postAdminRemoveAddedProduct = async (req, res) => {
  const { productId } = req.body;

  cartSevice.removeById(productId);
  await productService.removeById(productId);

  res.status(AppCodes.SUCCESS).json({ status: 'ok' });
};
