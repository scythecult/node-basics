const AppState = {
  products: [],

  getAll() {
    return this.products;
  },

  getById(productId = '') {
    return this.products.find((product) => product.id === productId) || {};
  },

  create(newProducts = []) {
    this.products.push(...newProducts);

    return newProducts;
  },
};

export { AppState };
