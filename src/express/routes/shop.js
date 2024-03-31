import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { CookieName, CookieOptions } from '../../common/enums/cookies.js';

// api? которая использует внутри себя fetch и ходит по маршрутам
//

export const initShopRouter = (settings = {}) => {
  const shopRoutes = new Router();
  const { api } = settings;

  // будет работать в www.check.com/something
  // app.use(shopRoutes);
  // будет слушать только гет-запросы, по определённому адресу
  shopRoutes.get(AppRoute.ROOT, async (req, res) => {
    const { path, cookies } = req;
    const isKnownUser = !!cookies[CookieName.TRACK_FLAG];

    if (!isKnownUser) {
      res.cookie(CookieName.TRACK_FLAG, 'check', CookieOptions);
    }
    console.log('client cookies', cookies);
    // передаёт в ответе файл html, по определённому пути ФС
    // res.sendFile('shop.html', { root: './views' });

    // передаёт в ответе файл-шаблона, который был выбран в app.set('view engine', 'engine-name');
    // вторым аргументом передаём объект с данными, которые будут доступны в шаблоне
    // по соотв. названиям полей
    // !это дефолтный флоу работы с шаблонами
    await api.experimental_getAllProducts();

    const products = await api.getAllProducts();
    const cartProductQuantity = api.getCartProductsQuantity();

    res.render('shop/product-list', {
      pageTitle: 'Fancy Shop',
      activePath: AppRoute.ROOT,
      products,
      cartProductQuantity,
      isKnownUser,
    });
  });
  // shopRoutes.post(AppRoute.ROOT, postRootProducts);

  return shopRoutes;
};
