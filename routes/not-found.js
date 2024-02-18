import { Router } from 'express';
import { AppRoute } from '../utils.js';
import { getNotFound } from '../controllers/app.js';

const errorRoutes = new Router();

errorRoutes.get(AppRoute.ALL, getNotFound);

export { errorRoutes };
