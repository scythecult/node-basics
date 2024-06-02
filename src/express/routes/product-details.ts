import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { RouteSettings } from '../types/common.js';

export const initProductDetailsRouter = (settings: RouteSettings) => {
  const productDetailsRoute = Router();
  const { api } = settings;

  productDetailsRoute.get(AppRoute.PRODUCT_ID, (req, res) => {
    const {
      params: { id },
    } = req;
    const targetProduct = api.getProductById(id);
    const cartProductQuantity = api.getCartProductsQuantity();

    res.render('shop/product-details', {
      activePath: AppRoute.PRODUCT,
      cartProductQuantity,
      targetProduct,
    });
  });

  return productDetailsRoute;
};
