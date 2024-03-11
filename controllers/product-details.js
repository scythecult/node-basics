import { AppRoute } from '../common/enums/api.js';
import { cartSevice, productService } from './app.js';

export const getProductDetailsPage = (req, res) => {
  const {
    params: { id },
  } = req;
  const targetProduct = productService.getById(id);

  res.render('shop/product-details', {
    activePath: AppRoute.PRODUCT,
    cartProductQuantity: cartSevice.getProductsQuantity(),
    targetProduct,
  });
};
