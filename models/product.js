import { AppState } from '../state/state.js';

// на клиенте отправить запрос с данными о товаре
// в контроллере обработать соотв. запрос вызвав метод инстанца Product
// внутри Product обращаемся к "БД" моковому стейту
// в БД у нас только актуальные продукты
// все остальные лежат в ProductService

class ProductService {
  // { id = '', title = '', price = '', description = '', imageScr = '' } = {}
  constructor() {
    this.pendingProducts = [];
    this.cartProducts = [];
  }

  getPendingProducts() {
    return this.pendingProducts;
  }

  getCartProducts() {
    return this.cartProducts;
  }

  getAll() {
    return AppState.getAll();
  }

  createPending(newProduct = {}) {
    this.pendingProducts.push(newProduct);
  }

  applyPending(productIds = []) {
    const appliedProducts = this.pendingProducts.filter((product) => productIds.includes(product.id));
    AppState.create(appliedProducts);
    this.clearPending();

    return AppState.getAll();
  }

  clearPending() {
    this.pendingProducts = [];
  }

  removeById(productId = '') {
    this.pendingProducts = this.pendingProducts.filter((product) => product.id !== productId);

    return this.pendingProducts;
  }

  getById(productId = '') {
    return AppState.getById(productId);
  }
}

export { ProductService };