import { AppEnvironment, ENV } from '../common/enums/app.js';

export const DbConfig = {
  [AppEnvironment.DEVELOPMENT]: {
    database: ENV.DB_NAME,
    username: ENV.DB_USER_NAME,
    password: ENV.DB_PASSWORD,
    dialect: ENV.DB_DIALECT,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
  },
};
