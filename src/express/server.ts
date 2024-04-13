import express from 'express';
import bodyParser from 'body-parser';
import { AppRoute, SSR_PORT } from '../common/enums/api.js';
import path from 'path';
import * as url from 'url';
import { Api } from './api.js';
import cookieParser from 'cookie-parser';
import { initMainRouter } from './routes/main.js';
import { StatusCodes } from 'http-status-codes';

export const FILENAME = url.fileURLToPath(import.meta.url);
export const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

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
app.listen(SSR_PORT);
