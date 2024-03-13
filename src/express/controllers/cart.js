import { AppCodes, AppRoute } from '../../common/enums/api.js';
import { cartSevice } from './app.js';

export const getCartProduct = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Cart Page',
    activePath: AppRoute.CART,
    cartProducts: cartSevice.getProducts(),
    cartProductQuantity: cartSevice.getProductsQuantity(),
    totalPrice: cartSevice.getTotalPrice(),
  });
};

export const postCartProduct = (req, res) => {
  const { productId = '' } = req.body;

  const isProductAdded = cartSevice.addProduct(productId);

  if (isProductAdded) {
    res.status(AppCodes.SUCCESS).json({ status: 'product cart was updated', productId });
  }
};

export const postCartRemoveProduct = (req, res) => {
  const { productId = '' } = req.body;

  cartSevice.removeById(productId);

  res.status(AppCodes.SUCCESS).json({ status: 'product was removed', productId });
};

export const postCartUsePromocode = (req, res) => {
  const { promocode } = req.body;

  const userPromocode = cartSevice.setUserPromocode(promocode);

  res.status(AppCodes.SUCCESS).json({ status: 'current promocode:', promocode: userPromocode });
};
