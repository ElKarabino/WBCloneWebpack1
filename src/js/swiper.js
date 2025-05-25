import Swiper from 'swiper';
import { Navigation, Pagination} from 'swiper/modules';
// import Swiper and modules styles

import 'swiper/swiper-bundle.css';
export function initSwiper() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
});
}
// для автовоспроизведения при наведении мышки

