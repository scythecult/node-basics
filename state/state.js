import fs from 'fs';
import { FSPath } from '../utils.js';

const fileSystem = fs;

const AppState = {
  products: [],

  async _readProductReport() {
    fileSystem.readFile(`${FSPath.STORED}/products.json`, (error, data) => {
      if (error) {
        throw new Error(error.message);
      }

      this.products = JSON.parse(data);
    });

    return this.products;
  },

  async _writeProductReport() {
    fileSystem.writeFile(`${FSPath.STORED}/products.json`, JSON.stringify(this.products), (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
  },

  async getAll() {
    const productsData = await this._readProductReport();

    return productsData;
  },

  getById(productId = '') {
    return this.products.find((product) => product.id === productId) || {};
  },

  create(newProducts = []) {
    this.products.push(...newProducts);

    this._writeProductReport();

    return newProducts;
  },
};

export { AppState };
