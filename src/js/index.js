// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// init Swiper:
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  parallax: true,
  speed: 1000,
  touchRatio: 0.5,
  keyboard: {
    enable: true,
  },
  mousewheel: {
    sensitivity: 1,
  },
  // If we need pagination
  pagination: {
    el: '.slider_controls_count',
    totalClass:'slider_controls_total',
    currentClass: 'slider_controls_curent',
    renderFraction: function (currentClass, totalClass, g) {
      return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
    },
    type: 'fraction',
  },

  // Navigation arrows
  navigation: {
    nextEl: '#sliderNext',
    prevEl: '#sliderPrev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});