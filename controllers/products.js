import { ProductService } from '../services/product-service.js';
import { AdminRoute, AppCodes, AppRoute } from '../utils.js';
import { Product } from '../models/product.js';
import { CartService } from '../services/cart-service.js';

const productService = new ProductService();
const cartSevice = new CartService();

const getRootProducts = async (req, res) => {
  const { path } = req;
  // передаёт в ответе файл html, по определённому пути ФС
  // res.sendFile('shop.html', { root: './views' });

  // передаёт в ответе файл-шаблона, который был выбран в app.set('view engine', 'engine-name');
  // вторым аргументом передаём объект с данными, которые будут доступны в шаблоне
  // по соотв. названиям полей
  // !это дефолтный флоу работы с шаблонами
  const products = await productService.getAll();

  res.render('shop/product-list', {
    pageTitle: 'Fancy Shop',
    activePath: AppRoute.ROOT,
    products,
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

const getAdminAddProduct = (req, res) => {
  // res.sendFile('admin.html', { root: './views' });
  res.render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    adminActivePath: AdminRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

const getAdminAllProducts = async (req, res) => {
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

const postAdminUpdateProducts = async (req, res) => {
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

const postAdminPendingProduct = (req, res, next) => {
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

const postAdminAddProducts = async (req, res) => {
  const { productIds } = req.body;

  await productService.applyPending(productIds);

  res.status(AppCodes.SUCCESS).render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

const postAdminRemoveProduct = (req, res) => {
  const { productId } = req.body;

  productService.removeById(productId);

  res.status(AppCodes.SUCCESS).render('admin/add-product', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

const getProductDetailsPage = (req, res) => {
  const {
    params: { id },
  } = req;
  const targetProduct = productService.getById(id);

  res.render('shop/product-details', {
    activePath: AppRoute.PRODUCT,
    cartProductQuantity: cartSevice.getProductsQuantity(),
    productTitle: targetProduct?.title,
  });
};

const getCartProduct = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Cart Page',
    activePath: AppRoute.CART,
    cartProducts: cartSevice.getProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

const postCartProduct = (req, res) => {
  const { productId = '' } = req.body;

  const isProductAdded = cartSevice.addProduct(productId);

  if (isProductAdded) {
    res.status(AppCodes.SUCCESS).json({ status: 'product cart was updated', productId });
  }
};

const postCartRemoveProduct = (req, res) => {
  const { productId = '' } = req.body;

  cartSevice.removeById(productId);

  res.status(AppCodes.SUCCESS).json({ status: 'product was removed', productId });
};

export {
  getRootProducts,
  getAdminAddProduct,
  getAdminAllProducts,
  postAdminPendingProduct,
  postAdminAddProducts,
  postAdminRemoveProduct,
  postAdminUpdateProducts,
  getProductDetailsPage,
  getCartProduct,
  postCartProduct,
  postCartRemoveProduct,
};
