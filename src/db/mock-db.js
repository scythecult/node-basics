import fsPromise from 'node:fs/promises';
import { FSPath } from '../common/enums/api.js';

const fileSystem = fsPromise;

const DataBase = {
  products: [],

  _parseSafe() {
    return this.products.length ? JSON.parse(this.products) : [];
  },

  async _readProductReport() {
    try {
      this.products = await fileSystem.readFile(`${FSPath.STORED}/products.json`);
    } catch (error) {
      throw new Error(error.message);
    }

    return this._parseSafe();
  },

  async _writeProductReport() {
    try {
      await fileSystem.writeFile(`${FSPath.STORED}/products.json`, JSON.stringify(this.products));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAll() {
    return await this._readProductReport();
  },

  getById(productId = '') {
    return this._parseSafe().find((product) => product.id === productId) || {};
  },

  async create(newProducts = []) {
    this.products = this._parseSafe();

    this.products.push(...newProducts);

    await this._writeProductReport();

    return newProducts;
  },

  async removeById(productId = '') {
    const products = await this.getAll();
    this.products = products.filter((product) => product.id !== productId);

    await this._writeProductReport();

    return this.products;
  },

  async update(editedProducts = []) {
    const products = await this.getAll();
    const updatedProducts = products.map((product) => {
      const targetEditedProduct = editedProducts.find((editedProduct) => editedProduct.id === product.id);

      if (targetEditedProduct) {
        product = { ...product, ...targetEditedProduct };
      }

      return product;
    });

    this.products = updatedProducts;

    await this._writeProductReport();

    return this.products;
  },
};

export { DataBase };
