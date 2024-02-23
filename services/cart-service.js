import { AppState } from '../state/state.js';

class CartService {
  constructor() {
    this.cartProducts = [];
  }

  getProducts() {
    return this.cartProducts;
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
