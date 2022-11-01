export function paginator(selector, data) {
  const paginatorDiv = document.getElementById(selector);
  paginatorDiv.appendChild(createBlogHtml(data));
}

function createBlogHtml(data) {
  const ul = document.createElement('ul');
  ul.classList.add('blog__list');

  if (data.length === 0) {
    return ul;
  } else if (data.length === 1) {
    ul.appendChild(createLi(data[0]));
  } else {
    ul.appendChild(createLi(data[0]));
    ul.appendChild(createLi(data[1]));
  }

  const li = document.createElement('li');
  li.appendChild(createNumberSlider(data));
  ul.appendChild(li);

  return ul;
}

function createNumberSlider(data) {
  const ul = document.createElement('ul');
  ul.classList.add('number-slider');

  let numberOfSlides =
    data.length % 2 === 0 ? data.length / 2 : Math.trunc(data.length / 2) + 1;

  for (let i = 0; i < numberOfSlides; i++) {
    const li = document.createElement('li');
    li.classList.add('number-slider-item');

    const button = document.createElement('button');
    button.classList.add('btn-number-slider');

    if (i === 0) {
      button.classList.add('btn-number-slider-active');
    }

    button.innerHTML = i + 1;

    li.appendChild(button);
    ul.appendChild(li);
  }

  ul.addEventListener('click', event => clickBtnSliderHandler(event, data));
  return ul;
}

function clickBtnSliderHandler(event, data) {
  if (event.target.classList.contains('btn-number-slider')) {
    const activeBtn = document.querySelector('.btn-number-slider-active');
    activeBtn.classList.remove('btn-number-slider-active');

    event.target.classList.add('btn-number-slider-active');

    event.path[4].childNodes[0].innerHTML = createCardTemplate(
      data[2 * (Number(event.target.innerHTML) - 1)]
    );

    let numberOfSlides =
      data.length % 2 === 0 ? data.length / 2 : Math.trunc(data.length / 2) + 1;

    if (
      Number(event.target.innerHTML) === numberOfSlides &&
      data.length % 2 !== 0
    ) {
      event.path[4].childNodes[1].innerHTML = '';
    } else {
      event.path[4].childNodes[1].innerHTML = createCardTemplate(
        data[2 * Number(event.target.innerHTML) - 1]
      );
    }
  }
}

function createLi(card) {
  const li = document.createElement('li');
  li.classList.add('blog__item');
  li.innerHTML = createCardTemplate(card);
  return li;
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
