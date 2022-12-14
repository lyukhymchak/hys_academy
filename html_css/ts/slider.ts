import SliderData from './models/slider-data.model';
import Init from './models/init.generic.model';

export default class Slider implements Init<Array<SliderData>> {
  private readonly id: string;

  private divSlider: HTMLDivElement;
  private numberOfSlidesPerPage: number;
  private curSlide: number;
  private maxSlide: number;

  constructor(id: string) {
    this.id = id;
  }

  public init(data: Array<SliderData>): void {
    this.divSlider = document
      .getElementById(this.id)
      .appendChild(this.getSliderItemMarkup(data.length));

    this.setData(data);

    this.numberOfSlidesPerPage = this.getNumberOfSlidesPerPage();
    this.curSlide = 0;
    this.maxSlide = data.length - this.numberOfSlidesPerPage;

    this.divSlider.addEventListener('click', (event: Event) =>
      this.clickBtnSliderHandler(event)
    );

    window.addEventListener('resize', () => {
      this.resizeWindowHandler();
    });
  }

  public empty(): void {
    this.divSlider.innerHTML = '';
  }

  private getSliderItemMarkup(numberOfSlides: number): HTMLDivElement {
    const divPreference: HTMLDivElement = document.createElement('div');
    const ulPreference: HTMLUListElement = document.createElement('ul');

    divPreference.classList.add('preference-carousel');
    ulPreference.classList.add('preference__list');

    for (let i = 0; i < numberOfSlides; i++) {
      const li: HTMLLIElement = document.createElement('li');

      li.classList.add('preference__item');
      ulPreference.appendChild(li);
    }

    const btnLeft: HTMLButtonElement = this.getBtnHTML('left');
    btnLeft.setAttribute('disabled', '');

    const btnRight: HTMLButtonElement = this.getBtnHTML('right');

    divPreference.appendChild(btnLeft);
    divPreference.appendChild(ulPreference);
    divPreference.appendChild(btnRight);

    return divPreference;
  }

  private getBtnHTML(direction: string): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement('button');

    btn.classList.add('btn-slider');
    btn.classList.add(`btn-slider-${direction}`);

    btn.innerHTML = this.getSvgHTML(direction);

    return btn;
  }

  private getSvgHTML(direction: string): string {
    return `<svg class="arrow arrow-${direction}" width="24" height="24">
              <use href="images/sprite-plus.svg#icon-chevron-${direction}"></use>
            </svg>`;
  }

  private setData(data: Array<SliderData>): void {
    const elementsOfSlider: NodeListOf<HTMLLIElement> =
      this.divSlider.querySelectorAll('.preference__item');

    elementsOfSlider.forEach((element, index) => {
      const title: string[] = data[index].title.split(' ');

      element.innerHTML = title[0] + ' ' + title[1];
      element.style.backgroundImage = `url("${data[index].url}")`;
    });
  }

  private getNumberOfSlidesPerPage(): number {
    const width: number = window.innerWidth;
    const sliderList: HTMLElement =
      this.divSlider.querySelector('.preference__list');

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

  private clickBtnSliderHandler(event: Event): void {
    const target: HTMLButtonElement = event.target as HTMLButtonElement;

    if (target.classList.contains('btn-slider-left')) {
      this.curSlide--;
      this.changePosition();
    }

    if (target.classList.contains('btn-slider-right')) {
      this.curSlide++;
      this.changePosition();
    }
  }

  private changePosition(): void {
    const elementsOfSlider: NodeListOf<HTMLLIElement> =
      this.divSlider.querySelectorAll('.preference__item');

    elementsOfSlider.forEach(element => {
      element.style.transform = `translateX(-${this.curSlide * 227}px`;
    });

    this.checkButtons();
  }

  private checkButtons(): void {
    const btnRight: HTMLButtonElement =
      this.divSlider.querySelector('.btn-slider-right');
    const btnLeft: HTMLButtonElement =
      this.divSlider.querySelector('.btn-slider-left');

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

  private resizeWindowHandler(): void {
    this.maxSlide += this.numberOfSlidesPerPage;
    this.numberOfSlidesPerPage = this.getNumberOfSlidesPerPage();
    this.maxSlide -= this.numberOfSlidesPerPage;

    if (this.curSlide > this.maxSlide) {
      this.curSlide = this.maxSlide;
    }

    this.changePosition();
  }
}
