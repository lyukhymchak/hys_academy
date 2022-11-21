import { SlickSliderData } from './interfaces/SlickSliderData';

export class SlickSlider {
  private selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  init(data: SlickSliderData[]): void {
    this.createSlickSliderItemMarkup(data);
    this.initSlickSlider();
  }

  createSlickSliderItemMarkup(data: SlickSliderData[]): void {
    const ul: HTMLUListElement = document.querySelector(this.selector);

    for (let i = 0; i < data.length; i++) {
      const li: HTMLLIElement = document.createElement('li');

      li.innerHTML = this.getCardTemplate(data[i]);
      ul.appendChild(li);
    }
  }

  getCardTemplate(card: SlickSliderData): string {
    return `<div class="courses__list-item" style="background-image: url(${card.url});"><img class="courses__mentor" src="${card.mentor}" width="48" alt="mentor">
              <h4 class="courses__header">${card.header}</h4>
              <h3 class="courses__title">${card.title}</h3>
              <hr class="courses__line">
              <div class="courses__prices">
                <div>
                  <span class="courses__new-price">${card.newPrice}</span>
                  <span class="courses__old-price">${card.oldPrice}</span>
                </div>
                <span>⭐⭐⭐⭐(4)</span>
              </div>
            </div>`;
  }

  getBtnHTML(direction: string): string {
    return `<button class="btn-slider btn-slider-${direction} btn-slick-${direction}">
              <svg class="arrow arrow-${direction}" width="24" height="24">
                <use href="images/sprite-plus.svg#icon-chevron-${direction}"></use>
              </svg>
            </button>`;
  }

  initSlickSlider(): void {
    $(this.selector).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      variableWidth: true,
      infinite: false,
      cssEase: 'ease-out',
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
      prevArrow: this.getBtnHTML('left'),
      nextArrow: this.getBtnHTML('right'),
    });
  }
}
