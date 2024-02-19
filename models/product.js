class Product {
  constructor({ id = '', title = '', price = '', description = '', imageScr = '' } = {}) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageScr = imageScr;
  }
}

export { Product };
