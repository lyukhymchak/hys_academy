export class Slider {
  constructor(id, data) {
    this.id = id;
    this.initSlider(data);
  }

  initSlider(data) {
    this.slider = document.getElementById(this.id);
    this.slider.innerHTML = "";
    this.slider.appendChild(this.createSliderItemMarkup(data.length));

    this.setData(data);

    this.numberOfSlidesPerPage = this.setNumberOfSlidesPerPage();
    this.curSlide = 0;
    this.maxSlide = data.length - this.numberOfSlidesPerPage;
  }

  createSliderItemMarkup(numberOfSlides) {
    const div = document.createElement("div");
    div.classList.add("preference-carousel");

    const ul = document.createElement("ul");
    ul.classList.add("preference__list");
    for (let i = 0; i < numberOfSlides; i++) {
      const li = document.createElement("li");
      li.classList.add("preference__item");
      ul.appendChild(li);
    }

    const btnLeft = this.createBtn("left");
    btnLeft.setAttribute("disabled", "");

    const btnRight = this.createBtn("right");

    div.appendChild(btnLeft);
    div.appendChild(ul);
    div.appendChild(btnRight);

    div.addEventListener("click", (event) => this.clickBtnSliderHandler(event));
    window.addEventListener("resize", () => {
      this.resizeWindowHandler();
    });

    return div;
  }

  createBtn(direction) {
    const btn = document.createElement("button");

    btn.classList.add("btn-slider");
    btn.classList.add(`btn-slider-${direction}`);

    btn.innerHTML = `<svg class="arrow arrow-${direction}" width="24" height="24">
                        <use href="images/sprite-plus.svg#icon-chevron-${direction}"></use>
                    </svg>
                    `;
    return btn;
  }

  setData(data) {
    const liElements = document.querySelectorAll(".preference__item");

    liElements.forEach((element, index) => {
      element.style.backgroundImage = `url(${data[index].url})`;
      const title = data[index].title.split(" ");
      element.innerHTML = title[0] + " " + title[1];
    });
  }

  setNumberOfSlidesPerPage() {
    let width = window.innerWidth;
    const slider = document.querySelector(".preference__list");

    if (width <= 768) {
      slider.style.maxWidth = "207px";
      return 1;
    }

    if (width > 1440) {
      slider.style.maxWidth = "858px";
      return 4;
    }

    slider.style.maxWidth = "424px";
    return 2;
  }

  clickBtnSliderHandler(event) {
    if (event.target.classList.toString().indexOf("left") > -1) {
      this.curSlide--;
      this.changePosition();
    }

    if (event.target.classList.toString().indexOf("right") > -1) {
      this.curSlide++;
      this.changePosition();
    }
  }

  resizeWindowHandler() {
    this.maxSlide += this.numberOfSlidesPerPage;
    this.numberOfSlidesPerPage = this.setNumberOfSlidesPerPage();
    this.maxSlide -= this.numberOfSlidesPerPage;

    if (this.curSlide > this.maxSlide) {
      this.curSlide = this.maxSlide;
      this.changePosition();
    }
  }

  changePosition() {
    const liElements = document.querySelectorAll(".preference__item");

    liElements.forEach((element) => {
      element.style.transform = `translateX(-${this.curSlide * 217}px)`;
    });

    this.checkButtons();
  }

  checkButtons() {
    const btnRight = this.slider.querySelector(".btn-slider-right");
    const btnLeft = this.slider.querySelector(".btn-slider-left");

    if (this.curSlide === 0) {
      btnLeft.setAttribute("disabled", "");
    } else {
      btnLeft.removeAttribute("disabled");
    }

    if (this.curSlide >= this.maxSlide) {
      btnRight.setAttribute("disabled", "");
    } else {
      btnRight.removeAttribute("disabled");
    }
  }
}
