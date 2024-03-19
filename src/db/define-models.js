import { defineProductModel } from './models/product.js';

export const defineModels = (sequelize) => {
  const Product = defineProductModel(sequelize);

  return { Product };
};
