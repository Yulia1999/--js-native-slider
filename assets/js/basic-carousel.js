export default class Carousel {
  constructor(objParams) {
    const settings = this.initConfig(objParams);

    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  initConfig(objectsParams) {
    const defaultParams = {
      containerID: "#carousel",
      slideID: ".slide",
      interval: 2000,
      isPlaying: true,
    };
    return { ...defaultParams, ...objectsParams };
  }

  initProps() {
    this.SLIDS_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";

    this.FA_PAUSE = '<i class="fas fa-pause-circle fa-10x"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle fa-10x"></i>';
    this.currentSlide = 0;
    this.isPlaying = true;
  }

  initControls() {
    const controls = document.createElement("div");
    const PAUSE = `<span class = "control control--pause" id="pause-btn">
	<span id = "fa-pause-icon">${this.FA_PAUSE}</span>
	<span id = "fa-play-icon">${this.FA_PLAY}</span>
	</span>`;
    const PREV = `<span class = "control control--prev" id="prev-btn"><i class="fas fa-angle-left fa-4x"></i></span>`;
    const NEXT = `<span class = "control control--next" id="next-btn"><i class="fas fa-angle-right fa-4x"></i></span>`;

    controls.setAttribute("class", "controls");
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);
    this.pauseButton = this.container.querySelector("#pause-btn");
    this.prevButton = this.container.querySelector("#prev-btn");
    this.nextButton = this.container.querySelector("#next-btn");

    this.pauseIcon = this.container.querySelector("#fa-pause-icon");
    this.playIcon = this.container.querySelector("#fa-play-icon");

    this.isPlaying
      ? (this.pauseIcon.style.opacity = 1)
      : (this.playIcon.style.opacity = 1);
  }

  initIndicators() {
    const indicators = document.createElement("div");

    indicators.setAttribute("class", "indicators");

    for (let i = 0; i < this.SLIDS_COUNT; i++) {
      const indicator = document.createElement("div");

      indicator.setAttribute(
        "class",
        i !== 0 ? "indicator" : "indicator active"
      );
      indicator.dataset.slideTo = `${i}`;

      indicators.append(indicator);
    }

    this.container.append(indicators);
    this.indicatorsContainer = this.container.querySelector(".indicators");
    this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
  }

  initListeners() {
    this.pauseButton.addEventListener("click", this.pausePlay.bind(this));
    this.prevButton.addEventListener("click", this.nextHandler.bind(this));
    this.nextButton.addEventListener("click", this.prevHandler.bind(this));
    this.indicatorsContainer.addEventListener(
      "click",
      this.indicate.bind(this)
    );
    this.container.addEventListener("mouseenter", this.pause.bind(this));
    this.container.addEventListener("mouseleave", this.play.bind(this));
    document.addEventListener("keydown", this.pressKey.bind(this));
  }

  gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDS_COUNT) % this.SLIDS_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
  }

  next() {
    this.gotoNth(this.currentSlide + 1);
  }

  prev() {
    this.gotoNth(this.currentSlide - 1);
  }

  pause() {
    this.playVisible();
    this.isPlaying = false;
    clearInterval(this.timerID);
  }

  play() {
    this.pauseVisible();
    this.isPlaying = true;
    this.tick();
  }

  pauseVisible(isVisible = true) {
    isVisible
      ? (this.pauseIcon.style.opacity = 1)
      : (this.pauseIcon.style.opacity = 0);
    !isVisible
      ? (this.playIcon.style.opacity = 1)
      : (this.playIcon.style.opacity = 0);
  }

  playVisible() {
    this.pauseVisible(false);
  }
  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }
  indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this.pause();
      this.gotoNth(+target.dataset.slideTo);
    }
  }

  pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this.next(), this.interval);
  }

  prevHandler() {
    this.pause();
    this.next();
  }

  nextHandler() {
    this.pause();
    this.prev();
  }

  init() {
    this.initProps();
    this.initControls();
    this.initIndicators();
    this.initListeners();
    this.tick(this.isPlaying);
  }
}
