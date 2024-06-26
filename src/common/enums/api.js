export const SSR_PORT = 3000;
export const SERVICE_PORT = 3030;
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
  API_ROOT: '/api',
  ROOT: '/',
  PRODUCT_ID: '/:id',
  CHECK: '/check',
  MESSAGE: '/message',
  USERS: '/users',
  CART: '/cart',
  CART_REMOVE_PRODUCT: '/remove-product',
  CART_USE_PROMOCODE: '/use-promocode',
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
