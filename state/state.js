import fsPromise from 'node:fs/promises';
import { FSPath } from '../utils.js';

const fileSystem = fsPromise;

const AppState = {
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
};

export { AppState };
