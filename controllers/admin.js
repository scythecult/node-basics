import { AdminRoute, AppCodes, AppRoute } from '../utils.js';
import { Product } from '../models/product.js';
import { cartSevice, productService } from './app.js';

export const getAdminAddProduct = (req, res) => {
  // res.sendFile('admin.html', { root: './views' });
  res.render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    adminActivePath: AdminRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const getAdminAllProducts = async (req, res) => {
  // res.sendFile('admin.html', { root: './views' });
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

  const updatedProducts = await productService.update(editedProducts);

  res.render('admin/all-products', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    adminActivePath: AdminRoute.ALL_PRODUCTS,
    products: updatedProducts,
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const postAdminPendingProduct = (req, res, next) => {
  const newProduct = req.body;

  productService.createPending(new Product(newProduct));

  // products.push(req.body);
  // res.status(200).sendFile('product.html', { root: './views' });
  // res.status(AppCodes.SUCCESS).json('done');
  res.status(AppCodes.SUCCESS).render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const postAdminAddProducts = async (req, res) => {
  const { productIds } = req.body;

  await productService.applyPending(productIds);

  res.status(AppCodes.SUCCESS).render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const postAdminRemovePendingProduct = (req, res) => {
  const { productId } = req.body;

  productService.removePendingById(productId);

  res.status(AppCodes.SUCCESS).render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export const postAdminRemoveAddedProduct = async (req, res) => {
  const { productId } = req.body;

  await productService.removeById(productId);

  res.status(AppCodes.SUCCESS).render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};
