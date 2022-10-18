export class Slider {
  constructor(id, data) {
    const preferenceSlider = document.getElementById(id);
    preferenceSlider.appendChild(this.createSliderItemMarkup(4));
    this.setData(data);
  }

  createSliderItemMarkup(numberOfSlides) {
    const ul = document.createElement("ul");
    ul.classList.add("preference__list");

    for (let i = 0; i < numberOfSlides; i++) {
      const li = document.createElement("li");
      li.classList.add("preference__item");
      ul.appendChild(li);
    }

    const btnLeft = document.createElement("button");
    btnLeft.classList.add("btn-slider");
    const divLeft = document.createElement("div");
    divLeft.classList.add("slider-left");
    btnLeft.appendChild(divLeft);

    const btnRight = document.createElement("button");
    btnRight.classList.add("btn-slider");
    const divRight = document.createElement("div");
    divRight.classList.add("slider-right");
    btnRight.appendChild(divRight);

    const div = document.createElement("div");
    div.classList.add("preference-carousel");
    div.appendChild(btnLeft);
    div.appendChild(ul);
    div.appendChild(btnRight);

    return div;
  }

  setData(data) {
    let numberOfSlides = data.length;
    const liElements = document.querySelectorAll(".preference__item");

    liElements.forEach((element, index) => {
      element.style.backgroundImage = `url(${data[index].url})`;
      element.innerHTML = data[index].title;
    });
  }
}
