import { Router } from 'express';
import { defineModels } from '../../db/define-models.js';
import { sequelize } from '../../db/db.js';
import { productsService } from './products.js';
import { ProductsService } from '../data/products.js';

export const createServiceRoutes = async () => {
  const serviceRouter = new Router();

  defineModels(sequelize);

  productsService(serviceRouter, new ProductsService(sequelize));

  return serviceRouter;
};
