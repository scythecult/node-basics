const product = {
  editedProducts: [],
  removedProducts: new Set(),
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
  priceInput: document.querySelector('.js-price-input'),
  descInput: document.querySelector('.js-desc-input'),
  imageUrlInput: document.querySelector('.js-img-url-input'),
  handler: null,

  setHandler(handler, context) {
    this.handler = handler.bind(context);
  },

  init() {
    this.form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const productTitle = this.titleInput.value.trim();
      const productPrice = this.priceInput.value.trim();
      const productDesc = this.descInput.value.trim();
      const productImageUrl = this.imageUrlInput.value.trim();

      if (!productTitle.length || !productPrice.length || !productDesc.length || !productImageUrl.length) {
        return;
      }

      const editedProduct = {
        [this.titleInput.name]: productTitle,
        [this.priceInput.name]: productPrice,
        [this.descInput.name]: productDesc,
        [this.imageUrlInput.name]: productImageUrl,
      };

      this.handler?.(editedProduct);
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

const removeProduct = async (productId = '') => {
  const response = await fetch('/admin/remove-added-product', {
    method: 'POST',
    body: JSON.stringify({ productId }),
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.ok) {
    console.log('ok');
    modal.close();
    location.reload();
  }
};

const init = () => {
  editForm.init();
  editForm.setHandler(product.save, product);

  document.body.addEventListener('click', async (evt) => {
    const editButton = evt.target.closest('.js-edit');
    const removeButton = evt.target.closest('.js-remove');
    const closeModalButton = evt.target.closest('.js-close-modal');

    if (editButton) {
      const { productId } = editButton.dataset;
      modal.open();
      product.create({ id: productId });
    }

    if (removeButton) {
      const { productId } = removeButton.dataset;

      removeProduct(productId);
    }

    if (closeModalButton) {
      modal.close();
      product.reset();
    }
  });
};

init();
