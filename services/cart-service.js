import { AppState } from '../state/state.js';

class CartService {
  constructor() {
    this.cartProducts = [];
    this.totalPrice = 0;
    this.userPromocode = '';
    this.seasonPromocode = { value: 'CHECK', discount: 10 };
  }

  getProducts() {
    return this.cartProducts;
  }

  setUserPromocode(promocode = '') {
    this.userPromocode = promocode;

    return this.userPromocode;
  }

  getTotalPrice() {
    const { value, discount } = this.seasonPromocode;
    const result = this.cartProducts.reduce((initial, current) => (initial += current.quantity * current.price), 0);

    if (this.userPromocode && this.userPromocode === value) {
      this.totalPrice -= result * (discount / 100);

      return this.totalPrice.toFixed(1);
    }

    this.totalPrice = result;

    return this.totalPrice;
  }

  getProductsQuantity() {
    return this.cartProducts.reduce((initial, product) => (initial += product.quantity), 0);
  }

  removeById(productId = '') {
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

  async addProduct(productId = '') {
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

          return;
        }

        this.cartProducts.push(targetProduct);

        return this.cartProducts;
      }
    }

    return null;
  }
}

export { CartService };
