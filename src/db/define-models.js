import { defineProductModel } from './models/product.js';

export const defineModels = (sequelize) => {
  const Product = defineProductModel(sequelize);

  // тут будут устанавливаться связи между моделями

  return { Product };
};
