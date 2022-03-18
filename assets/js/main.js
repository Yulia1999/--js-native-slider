// const carousel = new Carousel();
import swipeCarousel from './advanced-carousel.js';

const carousel = new SwipeCarousel({
containerID: '.slider',
slideID: '.item',
interval: 1000
});
carousel.init();
