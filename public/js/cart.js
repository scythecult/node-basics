const cartProductContainer = document.querySelector('.js-products-container');

const init = () => {
  cartProductContainer?.addEventListener('click', async (evt) => {
    const removeFromCartButton = evt.target.closest('.js-remove-from-list');

    if (!removeFromCartButton) {
      return;
    }

    const { productId } = removeFromCartButton.dataset;

    if (productId) {
      const response = await fetch('/cart/remove-product', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        location.reload();
      }
    }
  });
};

init();
