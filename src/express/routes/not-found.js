import { Router } from 'express';
import { AppRoute } from '../../common/enums/api.js';
import { getNotFound } from '../controllers/app.js';

const errorRoutes = new Router();

errorRoutes.get(AppRoute.ALL, getNotFound);

export { errorRoutes };
