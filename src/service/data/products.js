import { ModelName } from '../../common/enums/db.js';

export class ProductsService {
  constructor(sequelize) {
    this._Products = sequelize.models[ModelName.PRODUCT];
  }

  async getAllProducts() {
    const products = await this._Products.findAll();

    return products;
  }
}
