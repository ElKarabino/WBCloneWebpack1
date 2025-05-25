const burgerOpenButton = document.querySelector('.burger_menu');
const catalog = document.querySelector('.catalog_list');
const overlay = document.querySelector('.overlay');
const catalogItems = document.querySelectorAll('.catalog_link');
const burgerCloseButton = document.querySelector('.burger_close');

function openCatalog() {
    catalog.classList.add('catalog_list_open');
    document.body.style.overflow = 'hidden';
    overlay.classList.add('overlay_open');
    burgerCloseButton.classList.add('burger_close_open');
}
function closeCatalog() {
    catalog.classList.remove('catalog_list_open');
    document.body.style.overflow = '';
    overlay.classList.remove('overlay_open');
    burgerCloseButton.classList.remove('burger_close_open');
}
burgerOpenButton.addEventListener('click', openCatalog)
catalogItems.forEach((item) => {
    item.addEventListener('click', closeCatalog);
})
overlay.addEventListener('click', closeCatalog);
burgerCloseButton.addEventListener('click', closeCatalog);