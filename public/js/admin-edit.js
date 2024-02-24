const product = {
  editedProducts: [],
  product: {
    id: '',
    title: '',
    price: '',
    description: '',
    imageScr: '',
  },

  create(newProduct = {}) {
    this.product = { ...this.product, ...newProduct };

    return this.product;
  },

  reset() {
    this.product = {
      id: '',
      title: '',
      price: '',
      description: '',
      imageScr: '',
    };
  },

  save(newProduct = {}) {
    const product = this.create(newProduct);

    const editedProductIndex = this.editedProducts.findIndex((editedProduct) => editedProduct.id === product.id);

    if (editedProductIndex !== -1) {
      this.editedProducts[editedProductIndex] = product;

      return;
    }

    this.editedProducts.push(product);
  },

  getEdited() {
    return this.editedProducts;
  },
};

const modal = {
  dropdown: document.querySelector('.js-dropdown'),
  modal: document.querySelector('.js-modal'),

  open() {
    this.dropdown.classList.add('opened');
    this.modal.classList.add('opened');
  },

  close() {
    this.dropdown.classList.remove('opened');
    this.modal.classList.remove('opened');
  },
};

const editForm = {
  form: document.querySelector('.js-from-edit'),
  titleInput: document.querySelector('.js-title-input'),
  handler: null,

  setHandler(handler, context) {
    this.handler = handler.bind(context);
  },

  init() {
    this.form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const productTitle = this.titleInput.value.trim();

      if (!productTitle.length) {
        return;
      }

      this.handler?.({ title: productTitle });
      const editedProducts = product.getEdited();

      const response = await fetch('/admin/update-products', {
        method: 'POST',
        body: JSON.stringify({ editedProducts }),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        console.log('ok');
        modal.close();
        product.reset();
        location.reload();
      }
    });
  },
};

const init = () => {
  editForm.init();
  editForm.setHandler(product.save, product);

  document.body.addEventListener('click', (evt) => {
    const editButton = evt.target.closest('.js-edit');
    const closeModalButton = evt.target.closest('.js-close-modal');

    if (editButton) {
      const { productId } = editButton.dataset;
      modal.open();
      product.create({ id: productId });
    }

    if (closeModalButton) {
      modal.close();
      product.reset();
    }
  });
};

init();
