export class Slider {
  constructor(id, data) {
    this.id = id;
    this.initSlider(data);
  }

  initSlider(data) {
    this.slider = document
      .getElementById(this.id)
      .appendChild(this.getSliderItemMarkup(data.length));

    this.setData(data);

    this.numberOfSlidesPerPage = this.getNumberOfSlidesPerPage();
    this.curSlide = 0;
    this.maxSlide = data.length - this.numberOfSlidesPerPage;

    this.slider.addEventListener('click', event =>
      this.clickBtnSliderHandler(event)
    );

    window.addEventListener('resize', () => {
      this.resizeWindowHandler();
    });
  }

  getSliderItemMarkup(numberOfSlides) {
    const divPreference = document.createElement('div');
    const ulPreference = document.createElement('ul');

    divPreference.classList.add('preference-carousel');
    ulPreference.classList.add('preference__list');

    for (let i = 0; i < numberOfSlides; i++) {
      const li = document.createElement('li');

      li.classList.add('preference__item');
      ulPreference.appendChild(li);
    }

    const btnLeft = this.getBtnHTML('left');
    btnLeft.setAttribute('disabled', '');

    const btnRight = this.getBtnHTML('right');

    divPreference.appendChild(btnLeft);
    divPreference.appendChild(ulPreference);
    divPreference.appendChild(btnRight);

    return divPreference;
  }

  getBtnHTML(direction) {
    const btn = document.createElement('button');

    btn.classList.add('btn-slider');
    btn.classList.add(`btn-slider-${direction}`);

    btn.innerHTML = this.getSvgHTML(direction);

    return btn;
  }

  getSvgHTML(direction) {
    return `<svg class="arrow arrow-${direction}" width="24" height="24">
              <use href="images/sprite-plus.svg#icon-chevron-${direction}"></use>
            </svg>`;
  }

  setData(data) {
    const elementsOfSlider = this.slider.querySelectorAll('.preference__item');

    elementsOfSlider.forEach((element, index) => {
      const title = data[index].title.split(' ');

      element.innerHTML = title[0] + ' ' + title[1];
      element.style.backgroundImage = `url(${data[index].url})`;
    });
  }

  getNumberOfSlidesPerPage() {
    const width = window.innerWidth;
    const sliderList = this.slider.querySelector('.preference__list');

    if (width <= 600) {
      sliderList.style.minWidth = '207px';
      return 1;
    }

    if (width > 600 && width <= 900) {
      sliderList.style.minWidth = '434px';
      return 2;
    }

    if (width > 900 && width < 1440) {
      sliderList.style.minWidth = '651px';
      return 3;
    }

    sliderList.style.minWidth = '888px';
    return 4;
  }

  clickBtnSliderHandler(event) {
    if (event.target.classList.contains('btn-slider-left')) {
      this.curSlide--;
      this.changePosition();
    }

    if (event.target.classList.contains('btn-slider-right')) {
      this.curSlide++;
      this.changePosition();
    }
  }

  changePosition() {
    const elementsOfSlider = this.slider.querySelectorAll('.preference__item');

    elementsOfSlider.forEach(element => {
      element.style.transform = `translateX(-${this.curSlide * 227}px)`;
    });

    this.checkButtons();
  }

  checkButtons() {
    const btnRight = this.slider.querySelector('.btn-slider-right');
    const btnLeft = this.slider.querySelector('.btn-slider-left');

    if (this.curSlide === 0) {
      btnLeft.setAttribute('disabled', '');
    } else {
      btnLeft.removeAttribute('disabled');
    }

    if (this.curSlide >= this.maxSlide) {
      btnRight.setAttribute('disabled', '');
    } else {
      btnRight.removeAttribute('disabled');
    }
  }

  resizeWindowHandler() {
    this.maxSlide += this.numberOfSlidesPerPage;
    this.numberOfSlidesPerPage = this.getNumberOfSlidesPerPage();
    this.maxSlide -= this.numberOfSlidesPerPage;

    if (this.curSlide > this.maxSlide) {
      this.curSlide = this.maxSlide;
    }

    this.changePosition();
  }

  emptySlider() {
    this.slider.innerHTML = '';
  }
}
