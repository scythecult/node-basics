import { defineProductModel } from './models/product.js';
import { definePromocodeModel } from './models/promocode.js';

export const defineModels = (sequelize) => {
  const Product = defineProductModel(sequelize);
  const Promocode = definePromocodeModel(sequelize);
  // тут будут устанавливаться связи между моделями

  return { Product, Promocode };
};
