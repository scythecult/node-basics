import { Api } from '../api.js';

export type RouteSettings = {
  api: Api;
};

export type Product = {
  id: string;
  quantity: number;
  title: string;
  price: string;
  description: string;
  imageSrc: string;
};

export type Promocode = {
  value: string;
  discount: number;
};
