import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { StatusCodes } from 'http-status-codes';
import { RouteSettings } from '../types/common.js';

export const initCartRouter = (settings: RouteSettings) => {
  const cartRoutes = Router();
  const { api } = settings;

  cartRoutes.get(AppRoute.ROOT, (req, res) => {
    const cartProducts = api.getCartProducts();
    const cartProductQuantity = api.getCartProductsQuantity();
    const totalPrice = api.getTotalCartPrice();

    res.render('shop/cart', {
      pageTitle: 'Cart Page',
      activePath: AppRoute.CART,
      cartProducts,
      cartProductQuantity,
      totalPrice,
    });
  });

  cartRoutes.post(AppRoute.ROOT, async (req, res) => {
    const { productId = '' } = req.body;

    const isProductAdded = await api.addCartProduct(productId);

    if (isProductAdded) {
      res.status(StatusCodes.OK).json({ status: 'product cart was updated', productId });
    }
  });

  cartRoutes.post(AppRoute.CART_REMOVE_PRODUCT, (req, res) => {
    const { productId = '' } = req.body;

    api.removeCartProductById(productId);

    res.status(StatusCodes.OK).json({ status: 'product was removed', productId });
  });

  cartRoutes.post(AppRoute.CART_USE_PROMOCODE, (req, res) => {
    const { promocode } = req.body;

    const userPromocode = api.setUserPromocode(promocode);

    res.status(StatusCodes.OK).json({ status: 'current promocode:', promocode: userPromocode });
  });

  return cartRoutes;
};
