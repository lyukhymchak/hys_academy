export class SlickSlider {
  constructor(id) {
    this.id = id;
    this.initSlickSlider(id);
  }

  initSlickSlider(id) {
    $(id).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      variableWidth: true,
      infinite: false,
      cssEase: "ease-out",
      lazyLoad: "ondemand",
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
