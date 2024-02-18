const productsContainer = document.querySelector('.js-products-container');

const init = () => {
  if (!productsContainer) {
    return;
  }

  productsContainer.addEventListener('click', async (evt) => {
    const addToCartButton = evt.target.closest('.js-add-to-cart');

    if (!addToCartButton) {
      return;
    }

    const { productId = '' } = addToCartButton.dataset;

    if (productId) {
      const response = await fetch('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const result = await response.json();

        console.log(result);
      }
    }
  });
};

init();
