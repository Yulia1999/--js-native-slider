import Carousel from "./basic-carousel.js";
export default class SwipeCarousel extends Carousel {
  initListeners() {
    super.initListeners();
    this.container.addEventListener("touchStart", this.swipeStart.bind(this));
    this.container.addEventListener("touchEnd", this.swipeEnd.bind(this));
  }

  swipeStart(e) {
    this.swipeStartX = e.changedTouchers[0].pageX;
  }
  swipeEnd(e) {
    this.swipeEndX = e.changedTouchers[0].pageX;
    this.swipeStartX - swipeEndX < -100 && this.prev();
    this.swipeStartX - swipeEndX > 100 && this.next();
  }
}
