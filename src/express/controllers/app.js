import { ProductService } from '../../db/services/product-service.js';
import { CartService } from '../../db/services/cart-service.js';
import { AppCodes } from '../../common/enums/api.js';

export const productService = new ProductService();
export const cartSevice = new CartService();

const getNotFound = (req, res) => {
  res.status(AppCodes.NOT_FOUND).render('not-found', { pageTitle: '404 not found' });
};

export { getNotFound };
