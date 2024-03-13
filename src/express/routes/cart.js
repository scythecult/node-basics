import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { cartSevice } from '../controllers/app.js';
import { StatusCodes } from 'http-status-codes';

export const initCartRouter = (app) => {
  const cartRoutes = new Router();

  app.use(cartRoutes);

  cartRoutes.get(AppRoute.CART, (req, res) => {
    res.render('shop/cart', {
      pageTitle: 'Cart Page',
      activePath: AppRoute.CART,
      cartProducts: cartSevice.getProducts(),
      cartProductQuantity: cartSevice.getProductsQuantity(),
      totalPrice: cartSevice.getTotalPrice(),
    });
  });

  cartRoutes.post(AppRoute.CART, (req, res) => {
    const { productId = '' } = req.body;

    const isProductAdded = cartSevice.addProduct(productId);

    if (isProductAdded) {
      res.status(StatusCodes.OK).json({ status: 'product cart was updated', productId });
    }
  });

  cartRoutes.post(AppRoute.CART_REMOVE_PRODUCT, (req, res) => {
    const { productId = '' } = req.body;

    cartSevice.removeById(productId);

    res.status(StatusCodes.OK).json({ status: 'product was removed', productId });
  });

  cartRoutes.post(AppRoute.CART_USE_PROMOCODE, (req, res) => {
    const { promocode } = req.body;

    const userPromocode = cartSevice.setUserPromocode(promocode);

    res.status(StatusCodes.OK).json({ status: 'current promocode:', promocode: userPromocode });
  });
};
