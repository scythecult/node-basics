import express from 'express';
import { createServiceRoutes } from '../service/api/index.js';
import { AppRoute, SERVICE_PORT } from '../common/enums/api.js';
import { sequelize } from '../db/db.js';

try {
  await sequelize.authenticate();
  console.log('succeed');
} catch (error) {
  console.error(error.message);

  throw error;
}

const app = express();
const serviceRoutes = await createServiceRoutes();
// await sequelize.sync({ force: true });

app.use(express.json());

app.use(AppRoute.API_ROOT, serviceRoutes);
app.listen(SERVICE_PORT);
