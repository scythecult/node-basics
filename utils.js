export const PORT = 3000;
export const REDIRECT_TIME = 2000;
export const HeaderName = {
  CONTENT_TYPE: 'Content-Type',
};

export const HeaderType = {
  TEXT: 'text/html',
  LOCATION: 'Location',
};

export const AppRoute = {
  ROOT: '/',
  PRODUCT_ID: '/:id',
  CHECK: '/check',
  MESSAGE: '/message',
  USERS: '/users',
  CART: '/cart',
  CREATE_USER: '/create-user',
  ADD_PRODUCT: '/add-product',
  ADD_PRODUCTS: '/add-products',
  REMOVE_PRODUCT: '/remove-product',
  PRODUCT: '/product',
  ALL: '*',
};

export const AppSubRoute = {
  ADMIN: '/admin',
  PRODUCT: '/product',
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
