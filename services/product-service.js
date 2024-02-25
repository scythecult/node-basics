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
  }

  getPendingProducts() {
    return this.pendingProducts;
  }

  async getAll() {
    return await AppState.getAll();
  }

  createPending(newProduct = {}) {
    this.pendingProducts.push(newProduct);
  }

  async applyPending(productIds = []) {
    const appliedProducts = this.pendingProducts.filter((product) => productIds.includes(product.id));
    AppState.create(appliedProducts);
    this.clearPending();

    return await AppState.getAll();
  }

  clearPending() {
    this.pendingProducts = [];
  }

  removePendingById(productId = '') {
    this.pendingProducts = this.pendingProducts.filter((product) => product.id !== productId);

    return this.pendingProducts;
  }

  async removeById(productId = '') {
    return await AppState.removeById(productId);
  }

  async update(editedProducts = []) {
    return await AppState.update(editedProducts);
  }

  getById(productId = '') {
    return AppState.getById(productId);
  }
}

export { ProductService };
