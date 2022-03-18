import Carousel from './basic-carousel.js';
export default class SwipeCarousel extends Carousel{
	
_initListeners () {
	super._initListeners()
	this.container.addEventListener("touchStart", this._swipeStart.bind(this));
	this.container.addEventListener("touchEnd", this._swipeEnd.bind(this));
	}
	
_swipeStart (e) {
	  this.swipeStartX = e.changedTouchers[0].pageX;
	}
_swipeEnd (e) {
	  this.swipeEndX = e.changedTouchers[0].pageX;
	  this.swipeStartX - swipeEndX < -100 && this.prev();
	  this.swipeStartX - swipeEndX > 100 && this.next();
	}
}

