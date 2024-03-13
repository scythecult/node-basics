import { AppRoute } from '../../common/enums/api.js';
import { cartSevice, productService } from './app.js';

const getRootProducts = async (req, res) => {
  const { path } = req;
  // передаёт в ответе файл html, по определённому пути ФС
  // res.sendFile('shop.html', { root: './views' });

  // передаёт в ответе файл-шаблона, который был выбран в app.set('view engine', 'engine-name');
  // вторым аргументом передаём объект с данными, которые будут доступны в шаблоне
  // по соотв. названиям полей
  // !это дефолтный флоу работы с шаблонами

  const products = await productService.getAll();

  res.render('shop/product-list', {
    pageTitle: 'Fancy Shop',
    activePath: AppRoute.ROOT,
    products,
    cartProductQuantity: cartSevice.getProductsQuantity(),
  });
};

export { getRootProducts };
