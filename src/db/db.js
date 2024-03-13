import { Sequelize } from 'sequelize';
import { DbConfig } from './sequelize-config.js';
import { AppEnvironment, ENV } from '../common/enums/app.js';

const config = DbConfig[ENV.NODE_ENV || AppEnvironment.DEVELOPMENT];

export const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: Number(config.port),
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
});
