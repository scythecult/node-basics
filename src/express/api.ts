import { SERVICE_PORT } from '../common/enums/api.js';
import { DataBase } from '../db/mock-db.js';
import type { Product, Promocode } from './types/common.js';

interface ApiType {
  applyPendingProducts: (productIds: string[]) => void;
  createPendingProduct: (newProduct: Product) => void;
}

export class Api implements ApiType {
  pendingProducts: Product[];
  cartProducts: Product[];
  totalPrice: number;
  userPromocode: string;
  seasonPromocode: Promocode;
  constructor() {
    this.pendingProducts = [];
    this.cartProducts = [];
    this.totalPrice = 0;
    this.userPromocode = '';
    this.seasonPromocode = { value: 'CHECK', discount: 10 };
  }

  async experimental_getAllProducts() {
    const response = await fetch(`http://localhost:${SERVICE_PORT}/api/`, { method: 'GET' });

    return await response.json();
  }

  async getAllProducts() {
    return await DataBase.getAll();
  }

  // далее такая бизнес логика должна переехать в ssr-часть
  async applyPendingProducts(productIds: string[] = []) {
    const appliedProducts = this.pendingProducts.filter((product) => productIds.includes(product.id));
    DataBase.create(appliedProducts);
    this._clearPendingProducts();

    return await DataBase.getAll();
  }

  async addCartProduct(productId = '') {
    const allProducts = await DataBase.getAll();

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
    return await DataBase.removeById(productId);
  }

  async updateProducts(editedProducts: Product[] = []) {
    return await DataBase.update(editedProducts);
  }

  getPendingProducts() {
    return this.pendingProducts;
  }

  createPendingProduct(newProduct: Product) {
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
    return DataBase.getById(productId);
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
      (initial, current) => (initial += current.quantity * +current.price.replace(/\D+/g, '')),
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
    this.cartProducts = this.cartProducts.reduce<Product[]>((initial, cartProduct) => {
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
