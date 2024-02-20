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

  async getAll() {
    return await AppState.getAll();
  }

  async addToCart(productId = '') {
    const allProducts = await AppState.getAll();

    if (allProducts.length) {
      const targetProduct = allProducts.find((product) => product.id === productId);

      if (targetProduct) {
        this.cartProducts.push(targetProduct);

        return this.cartProducts;
      }
    }

    return null;
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

  removeById(productId = '') {
    this.pendingProducts = this.pendingProducts.filter((product) => product.id !== productId);

    return this.pendingProducts;
  }

  getById(productId = '') {
    return AppState.getById(productId);
  }
}

export { ProductService };
