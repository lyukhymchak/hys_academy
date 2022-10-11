export function paginator(selector, data) {
  let paginatorDiv = document.getElementById(selector);
  paginatorDiv.appendChild(createBlogHtml(data));
}

function createBlogHtml(data, elementsPerPage = 2) {
  let ul = document.createElement("ul");
  let pageElements = [];
  ul.classList.add("blog__list");

  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.classList.add("blog__item");
    li.innerHTML = createCardTemplate(data[i]);
    ul.appendChild(li);
    let index = Math.trunc(i / elementsPerPage);
    if (i % elementsPerPage == 0) {
      pageElements.push([]);
    }
    pageElements[index].push(li);
    if (i < elementsPerPage) {
      setVisible(li);
    } else {
      setHidden(li);
    }
  }

  let li = document.createElement("li");
  li.appendChild(createNumberSlider(pageElements));
  ul.appendChild(li);

  return ul;
}

function createCardTemplate(card) {
  return `<div class="blog__block">
                  <h4 class="blog__header">${card.category}</h4>
                  <img
                    class="blog__image"
                    src="${card.url}"
                    width="259"
                    alt="working at laptop"
                  />
                  <div class="blog__block-bottom">
                    <div class="blog__mentor-image">
                      <img
                        src="${card.userImage}"
                        width="48"
                        alt="mentor of design"
                      />
                    </div>
                    <div>
                      <h3 class="blog__title">
                       ${card.title}
                      </h3>
                      <a class="blog__link" href="${card.redirectLink}">Read Now</p>
                    </div>
                  </div>
                </div>
            `;
}

function createNumberSlider(pageElements) {
  let ul = document.createElement("ul");
  ul.classList.add("number-slider");

  for (let i = 0; i < pageElements.length; i++) {
    let li = document.createElement("li");
    li.classList.add("number-slider-item");

    let button = document.createElement("button");
    button.classList.add("btn-number-slider");

    if (i === 0) {
      button.classList.add("btn-number-slider-active");
    }

    button.addEventListener("click", (event) =>
      clickBtnSliderHandler(event, pageElements, i)
    );
    button.innerHTML = i + 1;

    li.appendChild(button);
    ul.appendChild(li);
  }
  return ul;
}

function clickBtnSliderHandler(event, pageElements, page) {
  let activeBtn = document.getElementsByClassName("btn-number-slider-active");

  for (const btn of activeBtn) {
    btn.classList.remove("btn-number-slider-active");
  }

  event.path[0].classList.add("btn-number-slider-active");

  for (let element = 0; element < pageElements.length; element++) {
    for (let index = 0; index < pageElements[element].length; index++) {
      let li = pageElements[element][index];
      if (element == page) {
        setVisible(li);
      } else {
        setHidden(li);
      }
    }
  }
}

function setVisible(element) {
  element.style.height = "auto";
  element.style.width = "auto";
  element.style.overflow = "visible";
}

function setHidden(element) {
  element.style.height = 0;
  element.style.width = 0;
  element.style.overflow = "hidden";
}
