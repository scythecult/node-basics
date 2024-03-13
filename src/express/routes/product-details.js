import { Router } from 'express';
import { AppRoute, AppSubRoute } from '../../common/enums/api.js';

export const initProductDetailsRouter = (app, settings = {}) => {
  const productDetailsRoute = new Router();
  const { api } = settings;

  app.use(AppSubRoute.PRODUCT_DETAILS, productDetailsRoute);

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
};
