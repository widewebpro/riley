// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);

// class SwiperSlide extends HTMLElement {
//   constructor() {
//     super();

//     this.size = this.dataset.size;

//     this.swiperInit();
//   }

//   swiperInit() {
//     this.slider = new Swiper(this.querySelector('.mySwiper'), {
//       init: false,
//       slidesPerView: 1.3,
//       spaceBetween: 10,
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//       breakpoints: {
//         640: {
//           slidesPerView: 2.3,
//           spaceBetween: 20,
//         },
//         1024: {
//           slidesPerView: 3.3,
//           spaceBetween: 32,
//         },
//       },
//     });

//     if(size == 'large') {
//       this.swiper.init()
//     }
//   }
// }

// export default customElements.define('swiper-slide', SwiperSlide);
