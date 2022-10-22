export class Slider {
  constructor(id, data) {
    const preferenceSlider = document.getElementById(id);
    preferenceSlider.appendChild(this.createSliderItemMarkup(data.length));
    this.setData(data);
    this.numberOfSlidesPerPage = this.getNumberOfSlides(window.innerWidth);
    this.curSlide = 0;
    this.maxSlide = data.length;
  }

  createSliderItemMarkup(numberOfSlides) {
    const ul = document.createElement("ul");
    ul.classList.add("preference__list");

    for (let i = 0; i < numberOfSlides; i++) {
      const li = document.createElement("li");
      li.classList.add("preference__item");
      ul.appendChild(li);
    }

    const div = document.createElement("div");
    div.classList.add("preference-carousel");

    const btnLeft = this.createBtn("left");

    const btnRight = this.createBtn("right");
    btnLeft.setAttribute("disabled", "");

    div.appendChild(btnLeft);
    div.appendChild(ul);
    div.appendChild(btnRight);

    div.addEventListener("click", (event) => this.clickBtnSlider(event));

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
    let numberOfSlides = data.length;
    const liElements = document.querySelectorAll(".preference__item");

    liElements.forEach((element, index) => {
      element.style.backgroundImage = `url(${data[index].url})`;
      const title = data[index].title.split(" ");
      element.innerHTML = title[0] + " " + title[1];
    });
  }

  clickBtnSlider(event) {
    if (event.target.classList.toString().indexOf("left") > -1) {
      this.curSlide--;
      this.slide();
      this.checkButtons();
    }

    if (event.target.classList.toString().indexOf("right") > -1) {
      this.curSlide++;
      this.slide();
      this.checkButtons();
    }
  }

  slide() {
    const liElements = document.querySelectorAll(".preference__item");
    liElements.forEach((element, index) => {
      element.style.transform = `translateX(-${this.curSlide * 217}px)`;
    });
  }

  getNumberOfSlides(width) {
    const slider = document.querySelector(".preference__list");
    if (width <= 768) {
      slider.style.maxWidth = "207px";
      return 1;
    }
    if (width >= 1440) {
      slider.style.maxWidth = "858px";
      return 4;
    }
    slider.style.maxWidth = "424px";
    return 2;
  }
  checkButtons() {
    const btnRight = document.querySelector(".btn-slider-right");
    const btnLeft = document.querySelector(".btn-slider-left");

    if (this.curSlide === 0) {
      btnLeft.setAttribute("disabled", "");
    } else {
      btnLeft.removeAttribute("disabled");
    }

    if (this.curSlide + this.numberOfSlidesPerPage === this.maxSlide) {
      btnRight.setAttribute("disabled", "");
    } else {
      btnRight.removeAttribute("disabled");
    }
  }
}
