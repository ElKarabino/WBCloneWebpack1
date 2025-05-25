import '../scss/header.scss'

let modalCart = null

//создаем модалку корзины
export function createModalCart() {
  modalCart = document.createElement('div')
  modalCart.classList.add('modal-cart')
  modalCart.style.display = 'none'
  modalCart.innerHTML = `
    <div class="modal-cart__content">
      <h2>Your cart</h2>
      <div class="cart-items"></div>
      <p class="empty-cart-text">The cart is empty, please add items.</p>
      <div class="cart-total">
        <span>Total:</span>
        <span class="cart-total-price">$0</span>
      </div>
      <button class="modal-cart-button">Clear</button>
    </div>
    
    `
    document.body.appendChild(modalCart)
    // Добавляем обработчик события на кнопку открытия модалки
    const openCartBtn = document.querySelector('.header_basket')
    openCartBtn.addEventListener('click', () => {
      openModalCart();
    })
    // Закрытие модалки при клике вне её области
    modalCart.addEventListener('click', (event) => {
      if (event.target === modalCart) {
        closeModalCart();
      }
    })
  }

// открываем модалку
export function openModalCart() {
  modalCart.style.display = 'block'
  document.body.style.overflow = 'hidden'
  renderCartFromStorage();
  const clearButton = modalCart.querySelector('.modal-cart-button');
  clearButton.addEventListener('click', clearCart);
}
// закрываем модалку
export function closeModalCart() {
  modalCart.style.display = 'none'
  document.body.style.overflow = ''
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
// добавляем товар в корзину
export function addToCart(product) {
  const cartItemsContainer = modalCart.querySelector('.cart-items');
  const emptyCartText = modalCart.querySelector('.empty-cart-text');
  const cartItemCount = cartItemsContainer.childElementCount;
  // Создаем элемент для товара в корзине
  // и добавляем его в контейнер
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  cartItem.innerHTML = `
    <div class="cart-item-image">
    <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="cart-item-info">
      <p class="cart-item-title">${product.title}</p>
      <p class="cart-item-price">$${product.price}</p>
    </div>
  `;

  cartItemsContainer.appendChild(cartItem);

  if (cartItemsContainer.childElementCount > 0) {
    emptyCartText.style.display = 'none';
  }
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
}
function renderCartFromStorage() {
  const cartItemsContainer = modalCart.querySelector('.cart-items');
  const emptyCartText = modalCart.querySelector('.empty-cart-text');
  const totalPrice = modalCart.querySelector('.cart-total-price');

  cartItemsContainer.innerHTML = ''; // Очищаем перед отрисовкой

  if (cart.length === 0) {
    emptyCartText.style.display = 'block';
    totalPrice.textContent = '$0';
    return;
  }
  let total = 0;
  cart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="cart-item-info">
        <p class="cart-item-title">${product.title}</p>
        <p class="cart-item-price">$${product.price}</p>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
    total += parseFloat(product.price);
  });
  totalPrice.textContent = `$${total.toFixed(2)}`;
  emptyCartText.style.display = 'none';
}
function clearCart() {
  cart = [];
  const cartItemsContainer = modalCart.querySelector('.cart-items');
  const emptyCartText = modalCart.querySelector('.empty-cart-text');
  cartItemsContainer.innerHTML = '';
  emptyCartText.style.display = 'block';
  const totalPrice = modalCart.querySelector('.cart-total-price');
  totalPrice.innerHTML = '$0'
}