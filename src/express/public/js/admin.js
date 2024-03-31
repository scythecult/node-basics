const formElement = document.querySelector('.form');
const productTitleInput = formElement.querySelector('.js-title-input');
const productPriceInput = formElement.querySelector('.js-price-input');
const productDescInput = formElement.querySelector('.js-desc-input');
const productImageUrlInput = formElement.querySelector('.js-img-url-input');
const newProductsContainer = document.querySelector('.js-new-products-container');
const addProductsButton = document.querySelector('.js-add-products');

const getProductIds = () => {
  const products = newProductsContainer.querySelectorAll('.product');

  return products.length ? [...products].map((product) => product.dataset.productId) : [];
};

const init = () => {
  addProductsButton?.addEventListener('click', async () => {
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

  newProductsContainer?.addEventListener('click', async (evt) => {
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

  formElement?.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const productTitle = productTitleInput.value.trim();
    const productPrice = productPriceInput.value.trim();
    const productDesc = productDescInput.value.trim();
    const productImageUrl = productImageUrlInput.value.trim();

    if (!productTitle.length || !productPrice.length || !productDesc.length || !productImageUrl.length) {
      return;
    }

    const response = await fetch('/admin/add-product', {
      method: 'POST',
      body: JSON.stringify({
        [productTitleInput.name]: productTitle,
        [productPriceInput.name]: productPrice,
        [productDescInput.name]: productDesc,
        [productImageUrlInput.name]: productImageUrl,
      }),
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
};

init();
