import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import { AppRoute, AppSubRoute, PORT } from './utils.js';
import { adminRoutes } from './routes/admin.js';
import { shopRoutes } from './routes/shop.js';
import { errorRoutes } from './routes/not-found.js';
import { productRoute } from './routes/product.js';
import { cartRoutes } from './routes/cart.js';
const fileSystem = fs;
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
// app.set('views', '/views');

// устанавливаем путь к папке с общими ресурсами
app.use(express.static('public'));

// добавляем возможность легко парсить тело запроса
// без const body = [] ... body.push(...)
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// можно добавить часть пути, по которому будет работать основной маршрут
app.use(AppSubRoute.ADMIN, adminRoutes);

// будет работать в www.check.com/something
app.use(shopRoutes);
app.use(AppSubRoute.PRODUCT, productRoute);
app.use(cartRoutes);
app.use(errorRoutes);

// порт
app.listen(PORT);
