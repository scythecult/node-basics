export const PORT = 3000;
export const REDIRECT_TIME = 2000;
export const HeaderName = {
  CONTENT_TYPE: 'Content-Type',
};

export const HeaderType = {
  TEXT: 'text/html',
  LOCATION: 'Location',
};

export const FSPath = {
  STORED: './stored',
};

export const AppRoute = {
  ROOT: '/',
  PRODUCT_ID: '/:id',
  CHECK: '/check',
  MESSAGE: '/message',
  USERS: '/users',
  CART: '/cart',
  CART_REMOVE_PRODUCT: '/cart/remove-product',
  CART_USE_PROMOCODE: '/cart/use-promocode',
  CREATE_USER: '/create-user',
  ADD_PRODUCT: '/add-product',
  PRODUCT_LIST: '/product-list',
  UPDATE_PRODUCTS: '/update-products',
  ADD_PRODUCTS: '/add-products',
  REMOVE_PRODUCT: '/remove-product',
  REMOVE_ADDED_PRODUCT: '/remove-added-product',
  PRODUCT: '/product-details',
  ALL: '*',
};

export const AdminRoute = {
  ALL_PRODUCTS: '/all-products',
  ADD_PRODUCT: '/add-product',
};

export const AppSubRoute = {
  ADMIN: '/admin',
  PRODUCT_DETAILS: '/product-details',
};

export const AppMethod = {
  POST: 'POST',
  GET: 'GET',
};

export const AppCodes = {
  REDIRECT: 302,
  NOT_FOUND: 404,
  SUCCESS: 200,
};

export const makeUcFirst = (word = '') => `${word.at(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
