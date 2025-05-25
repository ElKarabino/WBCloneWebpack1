import '../scss/style.scss'
import '../scss/swiper.scss'
import { initSwiper } from './swiper'
import '../scss/cdn.scss'
import '../scss/header.scss'
import { createModalCart, openModalCart, addToCart, clearBasketStorage } from './cart'


document.addEventListener('DOMContentLoaded', () => {
  initSwiper();
  filter();
  createModalCart();
  addToCart();
})


import appleImage from '../assets/img/apple.png'
import cartImage from '../assets/img/cart.png'
import closeButton from '../assets/img/close-button.png'
const sectionCards = document.getElementById('cards')

const container = document.createElement('div')
container.classList.add('container')
sectionCards.appendChild(container)

// обертка для всех карточек товаров
const cardsMainWrap = document.createElement('div')
cardsMainWrap.classList.add('cards-main-wrap')
container.appendChild(cardsMainWrap)

// обертка для одной карточки товара
// const createCardItem = () => {
// const cardItemWrap = document.createElement('div')
// cardItemWrap.classList.add('card-item-wrap')
// cardsMainWrap.appendChild(cardItemWrap);

// // обертка для картинки товара
// const cardItemImage = document.createElement('div')
// cardItemImage.classList.add('card-item-image')
// cardItemWrap.appendChild(cardItemImage)

// // вставка самой картинки
// const itemImage = document.createElement('img')
// itemImage.src = appleImage
// console.log(itemImage.src)
// itemImage.alt = 'apple'
// itemImage.classList.add('item-image')
// cardItemImage.appendChild(itemImage)

// // вставка текста "Быстрый просмотр"
// const itemQuickViewWrap = document.createElement('div')
// itemQuickViewWrap.classList.add('item-quick-view-wrap')
// cardItemImage.appendChild(itemQuickViewWrap)

// const itemQuickView = document.createElement('p')
// itemQuickView.classList.add('item-quick-view')
// itemQuickView.textContent = 'Быстрый просмотр'
// itemQuickViewWrap.appendChild(itemQuickView)

// // обертка для краткого описания товара
// const cardItemShortDesc = document.createElement('div')
// cardItemShortDesc.classList.add('card-item-short-desc')
// cardItemWrap.appendChild(cardItemShortDesc)

// const itemNameAndPrice = document.createElement('div')
// itemNameAndPrice.classList.add('item-name-and-price')

// const nameParagraph = document.createElement('p')
// nameParagraph.classList.add('name-paragraph')
// nameParagraph.textContent = 'Телефон Apple iPhone 15 128GB (фиолетовый)'
// itemNameAndPrice.appendChild(nameParagraph)

// const priceParagraph = document.createElement('p')
// priceParagraph.classList.add('name-paragraph')
// priceParagraph.textContent = '2230,00 р.'
// itemNameAndPrice.appendChild(priceParagraph)

// cardItemShortDesc.appendChild(itemNameAndPrice)

// // обертка для кнопки "В корзину"
// const itemCartIconWrap = document.createElement('div')
// itemCartIconWrap.classList.add('item-cart-icon-wrap')
// cardItemShortDesc.appendChild(itemCartIconWrap)

// const itemCartIcon = document.createElement('img')
// itemCartIcon.src = cartImage
// itemCartIcon.alt = 'cart'
// itemCartIcon.classList.add('item-cart-icon')
// itemCartIconWrap.appendChild(itemCartIcon)

// ///////////////////////////////////////////////////////////////////////////////

// обертка для модального окна затемнение
const modalWindow = document.createElement('div')
modalWindow.classList.add('modal-window')
container.appendChild(modalWindow)

// обертка самой карточки товара в модальном окне
const modalCardItemWrap = document.createElement('div')
modalCardItemWrap.classList.add('modal-card-item-wrap')
modalWindow.appendChild(modalCardItemWrap)

// обертка для картинки в модальном окне
const modalImageWrap = document.createElement('div')
modalImageWrap.classList.add('modal-image-wrap')
modalCardItemWrap.appendChild(modalImageWrap)

// вставка картинки в модальное окно
const modalImage = document.createElement('img')
modalImage.src = appleImage
modalImage.alt = 'apple'
modalImage.classList.add('modal-image')
modalImageWrap.appendChild(modalImage)

// обертка для текста в модальном окне
const modalTextWrap = document.createElement('div')
modalTextWrap.classList.add('modal-text-wrap')
modalCardItemWrap.appendChild(modalTextWrap)

// вставка текста в модальное окно
const itemDetailedDescription = {
    title: 'iPhone 15 128GB (фиолетовый)',
    image: appleImage,
    price: '2230,00 р.',
    description: 'Сверхбыстрый чип A16 Bionic, яркий OLED-дисплей и улучшенная камера.',
    specs: [ //используем массив для хранения характеристик тк нам не нужно к каждой данной характеиристике обращаться отдельно, как в объекте
      'Дисплей: 6.1" OLED',
      'Процессор: A16 Bionic',
      'Камера: 48+12 Мп / 12 Мп',
      'Память: 128GB',
      'Зарядка: USB-C',
      'Защита: IP68'
    ]
  }

const modalText = document.createElement('p')
modalText.classList.add('modal-text')
modalText.textContent = itemDetailedDescription.title
modalTextWrap.appendChild(modalText)

const modalPrice = document.createElement('p')
modalPrice.classList.add('modal-price')
modalPrice.textContent = itemDetailedDescription.price
modalTextWrap.appendChild(modalPrice)

const modalDescription = document.createElement('p')
modalDescription.classList.add('modal-description')
modalDescription.textContent = itemDetailedDescription.description
modalTextWrap.appendChild(modalDescription)

const modalSpecs = document.createElement('ul')
modalSpecs.classList.add('modal-specs')
itemDetailedDescription.specs.forEach(spec => {
    const specItem = document.createElement('li')
    specItem.textContent = spec
    modalSpecs.appendChild(specItem)
})
modalTextWrap.appendChild(modalSpecs)

const modalBasket = document.createElement('div');
modalBasket.classList.add('modal-basket');
modalCardItemWrap.appendChild(modalBasket);

const modalBasketImg = document.createElement('img');
modalBasketImg.src = cartImage;
modalBasket.appendChild(modalBasketImg)

// закрыть модальное окно
const closeModalButton = document.createElement('div')
closeModalButton.classList.add('close-modal-button')
closeModalButton.addEventListener('click', () => {
    modalWindow.style.display = 'none'
})
modalCardItemWrap.appendChild(closeModalButton)

const closeButtonImage = document.createElement('img')
closeButtonImage.src = closeButton
closeButtonImage.alt = 'close'
closeButtonImage.classList.add('close-button-image')
closeModalButton.appendChild(closeButtonImage)

//открываем модал
function openModal(item) {
  modalImage.src = item.image;
  modalText.textContent = item.title;
  modalPrice.textContent = "$"+ item.price;
  modalDescription.textContent = item.description;
  modalSpecs.textContent = item.category;
  modalWindow.style.display = 'flex'
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalWindow.style.display = 'none'
  document.body.style.overflow = '';
}
//создаем карточку
function createCard(item) {
const cardItemWrap = document.createElement('div')
cardItemWrap.classList.add('card-item-wrap'); 
cardItemWrap.innerHTML = `
<div class="card-item-image">
  <img src="${item.image}" alt="${item.title}">
</div>
<div class="card-item-short-desc">
  <div class="item-name-and-price">
    <p class="name-paragraph">${item.title}</p>
    <p class="name-paragraph">$${item.price}</p>
  </div>
</div>
<div class="item-quick-view-wrap">
    <p class="item-quick-view">Quick view</p>
</div>
`
cardsMainWrap.appendChild(cardItemWrap);
cardItemWrap.addEventListener('click',() => openModal(item))
  return cardItemWrap;
}
closeModalButton.addEventListener('click', closeModal)
// let cards = [];
// fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(products => {
//     cards = products.map(item => createCard(item));
//   });



let productData = [] //создаем пустой массив, куда будем сохранять товары
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    productData = products //сохранили полученые данные products в нашу созданную выше переменную и далее работам с ней
    products.forEach(item => createCard(item)) //проходимся по каждому полученному продукту и создаем карточку товара
  });



  //поиск
  const searchInput = document.querySelector('.header_search_input')
  // функция фильтрации
  export function filterProducts(event) {
  const searchValue = event.target.value.toLowerCase() //event - событие, event.target - элемент на котором произошло событие, event.target.value - что ввел юзер, к нижнему регистру во избежании некорректности работы поиска
  // очищаем все карточки
  cardsMainWrap.innerHTML = '';
  // фильтруем и отображаем подходящие карточки
  const filteredCards = productData.filter(item =>
    item.title.toLowerCase().includes(searchValue)
  );
  filteredCards.forEach(item => createCard(item));
}
// назначаем обработчик
export function filter() {
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }
}

//Фильтр по категориям

const category = document.querySelectorAll('.catalog_link');
category.forEach(link => {
  link.addEventListener('click', function() {
    const selectedCategory = this.textContent.toLowerCase();
    const filteredItems = selectedCategory === 'all'

    ? productData
    : productData.filter(item => item.category.toLowerCase() === selectedCategory);

    cardsMainWrap.innerHTML = '';
    filteredItems.forEach(item => {
    const card = createCard(item);
    cardsMainWrap.appendChild(card);

    category.forEach(link => link.classList.remove('active_catalog'));
    this.classList.add('active_catalog');
  });
  });
 
})

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обработчик кнопки добавления в корзину из модалки
modalBasket.addEventListener('click', () => {
  const product = {
    title: modalText.textContent,
    image: modalImage.src,
    price: modalPrice.textContent.replace('$', '')
  };

  addToCart(product); // Добавляем товар
  closeModal();       // Закрываем модалку
  openModalCart();    // Открываем корзину
});

document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.querySelector('.modal-cart-button');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      localStorage.clear();
    });
  }
});