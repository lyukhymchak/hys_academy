export class SlickSlider {
  constructor(selector, data) {
    this.createSlickSliderItemMarkup(selector, data);
    this.initSlickSlider(selector);
  }

  createSlickSliderItemMarkup(selector, data) {
    const ul = document.querySelector(selector);

    for (let i = 0; i < data.length; i++) {
      ul.appendChild(this.getCardTemplate(data[i]));
    }
  }

  getCardTemplate(card) {
    const li = document.createElement("li");
    const div = document.createElement("div");

    div.classList.add("courses__list-item");
    div.style.backgroundImage = `url(${card.url})`;

    div.innerHTML = `<img
                      class="courses__mentor"
                      src="${card.mentor}"
                      width="48"
                      alt="mentor"
                    />
                    <h4 class="courses__header">${card.header}</h4>
                    <h3 class="courses__title">${card.title}</h3>
                    <hr class="courses__line" />
                    <div class="courses__prices">
                      <div>
                        <span class="courses__new-price">${card.newPrice}</span>
                        <span class="courses__old-price">${card.oldPrice}</span>
                      </div>
                      <span>⭐⭐⭐⭐(4)</span>
                    </div>`;
    li.appendChild(div);
    return li;
  }

  initSlickSlider(selector) {
    $(selector).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      variableWidth: true,
      infinite: false,
      cssEase: "ease-out",
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
      prevArrow: `<button class="btn-slider btn-slider-left btn-slick-left">
                        <svg class="arrow arrow-left" width="24" height="24">
                            <use href="images/sprite-plus.svg#icon-chevron-left"></use>
                        </svg>
                  </button>`,
      nextArrow: `<button class="btn-slider btn-slider-right btn-slick-right">
                        <svg class="arrow arrow-right" width="24" height="24">
                            <use href="images/sprite-plus.svg#icon-chevron-right"></use>
                        </svg>
                  </button>`,
    });
  }
}
