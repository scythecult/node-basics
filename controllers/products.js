import { ProductService } from '../models/product.js';
import { AppState } from '../state/state.js';
import { AppCodes, AppRoute } from '../utils.js';

const productService = new ProductService();

const getRootProducts = (req, res) => {
  const { path } = req;
  // передаёт в ответе файл html, по определённому пути ФС
  // res.sendFile('shop.html', { root: './views' });

  // передаёт в ответе файл-шаблона, который был выбран в app.set('view engine', 'engine-name');
  // вторым аргументом передаём объект с данными, которые будут доступны в шаблоне
  // по соотв. названиям полей
  // !это дефолтный флоу работы с шаблонами
  res.render('shop', {
    pageTitle: 'Fancy Shop',
    activePath: AppRoute.ROOT,
    products: productService.getAll(),
    cartProducts: productService.getCartProducts(),
  });
};

const getAdminAddProduct = (req, res) => {
  // res.sendFile('admin.html', { root: './views' });
  res.render('admin', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProducts: productService.getCartProducts(),
  });
};

const postAdminPendingProduct = (req, res, next) => {
  const newProduct = req.body;

  productService.createPending(newProduct);

  // products.push(req.body);
  // res.status(200).sendFile('product.html', { root: './views' });
  // res.status(AppCodes.SUCCESS).json('done');
  res.status(AppCodes.SUCCESS).render('admin', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProducts: productService.getCartProducts(),
  });
};

const postAdminAddProducts = (req, res) => {
  const { productIds } = req.body;

  productService.applyPending(productIds);

  res.status(AppCodes.SUCCESS).render('admin', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProducts: productService.getCartProducts(),
  });
};

const postAdminRemoveProduct = (req, res) => {
  const { productId } = req.body;

  productService.removeById(productId);

  res.status(AppCodes.SUCCESS).render('admin', {
    pageTitle: 'Admin Page',
    activePath: AppRoute.ADD_PRODUCT,
    pendingProducts: productService.getPendingProducts(),
    cartProducts: productService.getCartProducts(),
  });
};

const getProductPageProduct = (req, res) => {
  const {
    params: { id },
  } = req;
  const targetProduct = productService.getById(id);

  res.render('product', {
    activePath: AppRoute.PRODUCT,
    cartProducts: productService.getCartProducts(),
    productTitle: targetProduct?.title,
  });
};

const getCartProduct = (req, res) => {
  res.render('cart', {
    pageTitle: 'Cart Page',
    activePath: AppRoute.CART,
    cartProducts: productService.getCartProducts(),
  });
};

const postCartProduct = (req, res) => {
  const { productId = '' } = req.body;
  const targetProduct = Product.getById(productId);

  // if (targetProduct) {
  //   cartProducts: AppState.cartProducts.push(targetProduct);
  //   res.status(AppCodes.SUCCESS).json({ status: 'product cart was updated', productId });

  //   return;
  // }

  // res.status(AppCodes.SUCCESS).json({ status: 'Product doesnt exists!' });
};

export {
  getRootProducts,
  getAdminAddProduct,
  postAdminPendingProduct,
  postAdminAddProducts,
  postAdminRemoveProduct,
  getProductPageProduct,
  getCartProduct,
  postCartProduct,
};
