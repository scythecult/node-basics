import { AppState } from '../../db/mock-db.js';

export class Api {
  constructor() {
    this.pendingProducts = [];
    this.cartProducts = [];
    this.totalPrice = 0;
    this.userPromocode = '';
    this.seasonPromocode = { value: 'CHECK', discount: 10 };
  }

  async getAllProducts() {
    return await AppState.getAll();
  }

  async applyPendingProducts(productIds = []) {
    const appliedProducts = this.pendingProducts.filter((product) => productIds.includes(product.id));
    AppState.create(appliedProducts);
    this._clearPendingProducts();

    return await AppState.getAll();
  }

  async addCartProduct(productId = '') {
    const allProducts = await AppState.getAll();

    if (allProducts.length) {
      const targetProduct = allProducts.find((product) => product.id === productId);

      if (targetProduct) {
        const sameProductIndex = this.cartProducts.findIndex((product) => product.id === targetProduct.id);

        if (sameProductIndex !== -1) {
          const updatedProduct = this.cartProducts[sameProductIndex];
          updatedProduct.quantity++;

          this.cartProducts = [
            ...this.cartProducts.slice(0, sameProductIndex),
            updatedProduct,
            ...this.cartProducts.slice(sameProductIndex + 1),
          ];

          return this.cartProducts;
        }

        this.cartProducts.push(targetProduct);

        return this.cartProducts;
      }
    }

    return null;
  }

  async removeProductById(productId = '') {
    return await AppState.removeById(productId);
  }

  async updateProducts(editedProducts = []) {
    return await AppState.update(editedProducts);
  }

  getPendingProducts() {
    return this.pendingProducts;
  }

  createPendingProduct(newProduct = {}) {
    this.pendingProducts.push(newProduct);
  }

  _clearPendingProducts() {
    this.pendingProducts = [];
  }

  removePendingById(productId = '') {
    this.pendingProducts = this.pendingProducts.filter((product) => product.id !== productId);

    return this.pendingProducts;
  }

  getProductById(productId = '') {
    return AppState.getById(productId);
  }

  getCartProducts() {
    return this.cartProducts;
  }

  setUserPromocode(promocode = '') {
    this.userPromocode = promocode;

    return this.userPromocode;
  }

  getTotalCartPrice() {
    const { value, discount } = this.seasonPromocode;
    const result = this.cartProducts.reduce(
      (initial, current) => (initial += current.quantity * current.price.replace(/\D+/g, '')),
      0
    );

    if (this.userPromocode && this.userPromocode === value) {
      this.totalPrice -= result * (discount / 100);

      return this.totalPrice.toFixed(1);
    }

    this.totalPrice = result;

    return this.totalPrice;
  }

  getCartProductsQuantity() {
    return this.cartProducts.reduce((initial, product) => (initial += product.quantity), 0);
  }

  removeCartProductById(productId = '') {
    this.cartProducts = this.cartProducts.reduce((initial, cartProduct) => {
      if (cartProduct.id === productId && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      } else if (cartProduct.quantity <= 1) {
        return initial.filter((product) => product.id !== cartProduct.id);
      }

      initial.push(cartProduct);

      return initial;
    }, []);

    return this.cartProducts;
  }
}
