import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

class CardSwiper extends HTMLElement {
  constructor() {
    super();

    this.DOM = {};
    this.DOM.el = this;

    this.events();
  }

  events() {
     this.swiperInit();
     this.heightSlider();
  }

  heightSlider() {
    let arrHeight = [];
    this.DOM.el.querySelectorAll('.swiper-slide').forEach((e,i) => {
     arrHeight.push(e.offsetHeight);
    });

    let elemHeight = Math.max.apply(Math, arrHeight);
    this.DOM.el.querySelector('.swiper-inner').style.cssText=`min-height: ${elemHeight}px`;
    this.DOM.el.closest('section').style.cssText=`padding-bottom: ${elemHeight}px`;
  }

  swiperInit() {

    this.slider = new Swiper(this.DOM.el.querySelector('.card-swiper'), {
      slidesPerView: 1.1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 32,
        },
      },
    });
  }
}

export default customElements.define('card-swiper', CardSwiper);
