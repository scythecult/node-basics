const cartProductContainer = document.querySelector('.js-products-container');
const promocodeForm = document.querySelector('.promocode-form');
const promocodeInput = document.querySelector('.js-promocode-input');

const init = () => {
  promocodeForm?.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const promocodeValue = promocodeInput.value.trim();

    if (promocodeValue.length) {
      const response = await fetch('/cart/use-promocode', {
        method: 'POST',
        body: JSON.stringify({ promocode: promocodeValue.toUpperCase() }),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        console.log(await response.json());
        location.reload();
      }
    }
  });

  cartProductContainer?.addEventListener('click', async (evt) => {
    const removeFromCartButton = evt.target.closest('.js-remove-from-list');

    if (removeFromCartButton) {
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
    }
  });
};

init();
