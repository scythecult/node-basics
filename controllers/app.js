import { ProductService } from '../services/product-service.js';
import { CartService } from '../services/cart-service.js';

import { AppCodes } from '../utils.js';

export const productService = new ProductService();
export const cartSevice = new CartService();

const getNotFound = (req, res) => {
  res.status(AppCodes.NOT_FOUND).render('not-found', { pageTitle: '404 not found' });
};

export { getNotFound };
