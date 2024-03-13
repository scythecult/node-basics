import express from 'express';
import bodyParser from 'body-parser';
import { initAdminRounter } from './routes/admin.js';
import { initShopRouter } from './routes/shop.js';
import { errorRoutes } from './routes/not-found.js';
import { initProductDetailsRouter } from './routes/product-details.js';
import { initCartRouter } from './routes/cart.js';
import { PORT } from '../common/enums/api.js';
import { sequelize } from '../db/db.js';
import path from 'path';
import * as url from 'url';
import { Api } from './services/api.js';

export const FILENAME = url.fileURLToPath(import.meta.url);
export const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('succeed');
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

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

const api = new Api();

initShopRouter(app, { api });
initAdminRounter(app);
initProductDetailsRouter(app);
initCartRouter(app);
app.use(errorRoutes);

// порт
app.listen(PORT);
