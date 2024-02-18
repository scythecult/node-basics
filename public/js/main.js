const formElement = document.querySelector('.form');
const productInput = formElement.querySelector('.input');
const newProductsContainer = document.querySelector('.js-new-products-container');
const addProductsButton = document.querySelector('.js-add-products');

const getProductIds = () => {
  const products = newProductsContainer.querySelectorAll('.product');

  return products.length ? [...products].map((product) => product.dataset.productId) : [];
};

if (addProductsButton) {
  addProductsButton.addEventListener('click', async () => {
    const productIds = getProductIds();

    if (productIds.length) {
      const response = await fetch('/admin/add-products', {
        method: 'POST',
        body: JSON.stringify({ productIds }),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        console.log('ok');
        location.reload();
      }
    }
  });
}

if (newProductsContainer) {
  newProductsContainer.addEventListener('click', async (evt) => {
    const removeProductButton = evt.target.closest('.js-remove-from-list');

    if (!removeProductButton) {
      return;
    }

    const { productId } = removeProductButton.dataset;

    if (productId) {
      const response = await fetch('/admin/remove-product', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        console.log('ok');
        location.reload();
      }
    }
  });
}

formElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const productTitle = productInput.value.trim();

  if (!productTitle.length) {
    return;
  }

  const response = await fetch('/admin/add-product', {
    method: 'POST',
    body: JSON.stringify({ id: crypto.randomUUID(), [productInput.name]: productInput.value }),
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.ok) {
    console.log('ok');
    location.reload();
  }
});
