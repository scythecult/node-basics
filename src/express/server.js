import express from 'express';
import bodyParser from 'body-parser';
import { AppRoute, PORT } from '../common/enums/api.js';
import { sequelize } from '../db/db.js';
import path from 'path';
import * as url from 'url';
import { Api } from './services/api.js';
import cookieParser from 'cookie-parser';
import { defineModels } from '../db/define-models.js';
import { initMainRouter } from './routes/main.js';
import { StatusCodes } from 'http-status-codes';

export const FILENAME = url.fileURLToPath(import.meta.url);
export const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('succeed');
  } catch (error) {
    console.error(error.message);

    throw error;
  }

  // const { Product } = defineModels(sequelize);

  // await sequelize.sync({ force: true });
};

init();
// устанавливаем темлэйт-движок
app.set('view engine', 'pug');
// ...или если у express нет втроенной интеграции стоит воспользоваться другим синтаксисом:
// первым аргументом передаём кастомное название
// вторым импортированный движок, см. доку конкретного движка
// app.engine('handlebars', handlseBars());
// далее так же вызываем 'set'
// app.set('view engine', 'handlebars');

// можно не ставить, если views находятся в корне
app.set('views', path.resolve(DIRNAME, 'views'));

// устанавливаем путь к папке с общими ресурсами
app.use(express.static(path.resolve(DIRNAME, 'public')));

// добавляем возможность легко парсить тело запроса
// без const body = [] ... body.push(...)
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const api = new Api();

initMainRouter(app, { api });

app.use(AppRoute.ALL, (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render('not-found', { pageTitle: '404 not found' });
});

// порт
app.listen(PORT);
