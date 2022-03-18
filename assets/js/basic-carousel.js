
export default class Carousel {
	constructor(objParams){
			// containerID = '#carousel', slideID = '.slide', interval = 2000
			this.container = document.querySelector(objParams.containerID);
			this.slides = this.container.querySelectorAll(objParams.slideID);
		  
			this.interval = objParams.interval;
	}

_initProps() {
    this.SLIDS_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";

    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.currentSlide = 0;
    this.isPlaying = true;
  }

  _initControls() {
    const controls = document.createElement("div");
    const PAUSE ='<span class = "control control--pause" id="pause-btn"><i class="fas fa-pause-circle"></i></span>';
    const PREV ='<span class = "control control--prev" id="prev-btn"><i class="fas fa-angle-left"></i></span>';
    const NEXT ='<span class = "control control--next" id="next-btn"><i class="fas fa-angle-right"></i></span>';

    controls.setAttribute("class", "controls");
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);
    this.pauseButton = this.container.querySelector("#pause-btn");
    this.prevButton = this.container.querySelector("#prev-btn");
    this.nextButton = this.container.querySelector("#next-btn");
  }

_initIndicators(){
	const indicators = document.createElement("div");

	indicators.setAttribute("class", "indicators");

	for (let i = 0; i < this.SLIDS_COUNT; i++) {
		const indicator = document.createElement('div');

		indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
		indicator.dataset.slideTo = `${i}`;
		indicators.append(indicator);	
	};
	this.container.append(indicators);
	this.indicatorsContainer = this.container.querySelector(".indicators");
	this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
}
  _initListeners() {
    this.pauseButton.addEventListener("click", this.pausePlay.bind(this));
    this.prevButton.addEventListener("click", this.prevHandler.bind(this));
    this.nextButton.addEventListener("click", this.nextHandler.bind(this));
    this.indicatorsContainer.addEventListener("click", this._indicate.bind(this));
    document.addEventListener("keydown", this._pressKey.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDS_COUNT) % this.SLIDS_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
  }

  _next() {
    this._gotoNth(this.currentSlide + 1);
  }

  _prev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _pause() {
    this.pauseButton.innerHTML = this.FA_PLAY;
    this.isPlaying = false;
    clearInterval(this.timerID);
  }

  _play() {
    this.pauseButton.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this._tick();
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
		this._pause();
      this._gotoNth(+target.dataset.slideTo);
    
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this._prev();
    if (e.code === this.CODE_RIGHT_ARROW) this._next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick() {
    this.timerID = setInterval( () => this._next(), this.interval);
  }

  prevHandler() {
    this._pause();
    this._next();
  }

  nextHandler() {
    this._pause();
    this._prev();
  }


  init () {
	this._initProps();
    this._initControls();
	this._initIndicators();
    this._initListeners();
    this._tick();
  }
}