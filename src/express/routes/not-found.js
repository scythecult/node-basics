import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { StatusCodes } from 'http-status-codes';

export const initErrorRouter = (app) => {
  const errorRoutes = new Router();

  app.use(errorRoutes);

  errorRoutes.get(AppRoute.ALL, (req, res) => {
    res.status(StatusCodes.NOT_FOUND).render('not-found', { pageTitle: '404 not found' });
  });
};
