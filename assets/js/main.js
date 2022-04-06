// const carousel = new Carousel();
import SwipeCarousel from './advanced-carousel.js';

const carousel = new SwipeCarousel({
// containerID: '.slider',
slideID: '.item',
interval: 3000,
isPlaying: false
});

carousel.init();