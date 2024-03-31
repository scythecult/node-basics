import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { StatusCodes } from 'http-status-codes';

export const productsService = (app, service) => {
  const productRoute = new Router();

  app.use(AppRoute.ROOT, productRoute);

  // ищем и возвращаем данные по запросу на
  // api/
  productRoute.get(AppRoute.ROOT, async (req, res) => {
    console.log('???');
    const result = await service.getAllProducts();

    res.status(StatusCodes.OK).json(result);
  });
};
