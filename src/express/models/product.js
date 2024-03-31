import { randomUUID } from 'crypto';
import { makeUcFirst } from '../../utils/utils.js';

const { format } = Intl.NumberFormat('en-EN');

class Product {
  constructor({ id = '', title = '', price = '', description = '', imageSrc = '' } = {}) {
    this.quantity = 1;
    this.id = randomUUID();
    this.title = makeUcFirst(title);
    this.price = format(price);
    this.description = makeUcFirst(description);
    this.imageSrc = imageSrc;
  }
}

export { Product };
