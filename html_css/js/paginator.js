export function paginator(selector, data) {
  const paginatorDiv = document.getElementById(selector);
  paginatorDiv.appendChild(getBlogHTML(data));
}

function getBlogHTML(data) {
  const cardsPerPage = data.length > 2 ? 2 : data.length;
  const divBlog = document.createElement("div");
  const divCards = [];

  for (let i = 0; i < cardsPerPage; i++) {
    const dataAtr = `card-${i + 1}`;

    divCards[dataAtr] = document.createElement("div");
    divCards[dataAtr].setAttribute("data-card", dataAtr);
    divCards[dataAtr].innerHTML = getCardTemplate(data[i]);
    divBlog.appendChild(divCards[dataAtr]);
  }

  if (data.length > 2) {
    const divPaginator = document.createElement("div");
    divPaginator.appendChild(getPaginatorHTML(data, cardsPerPage));
    divBlog.appendChild(divPaginator);
  }

  divBlog.classList.add("blog__list");

  return divBlog;
}

function getPaginatorHTML(data, cardsPerPage, startIndex = 0) {
  const countOfPages = getCountOfPages(data.length, cardsPerPage);
  const ul = document.createElement("ul");

  for (let i = startIndex; i < startIndex + countOfPages; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    li.classList.add("number-slider-item");
    button.classList.add("btn-number-slider");

    if (i === 0) {
      button.classList.add("btn-number-slider-active");
    }

    button.innerHTML = i + 1;

    li.appendChild(button);
    ul.appendChild(li);
  }

  ul.classList.add("number-slider");
  ul.addEventListener("click", (event) =>
    clickBtnPaginatorHandler(event, data)
  );

  return ul;
}

function getCardTemplate(card) {
  return `<div class="blog__block" ">
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

function getCountOfPages(count, cardsPerPage = 2) {
  if (count / cardsPerPage < 5)
    return count % cardsPerPage === 0
      ? count / cardsPerPage
      : Math.trunc(count / cardsPerPage) + 1;

  return 5;
}

function clickBtnPaginatorHandler(event, data) {
  if (event.target.classList.contains("btn-number-slider")) {
    const numnberOfCurrentPage = Number(event.target.innerHTML);
    const indexOfCard1 = 2 * (numnberOfCurrentPage - 1);
    const indexOfCard2 = 2 * numnberOfCurrentPage - 1;

    const activeBtn = document.querySelector(".btn-number-slider-active");
    activeBtn.classList.remove("btn-number-slider-active");
    event.target.classList.add("btn-number-slider-active");

    const divOfCard1 = document.querySelector(`div[data-card="card-1"]`);
    const divOfCard2 = document.querySelector(`div[data-card="card-2"]`);

    divOfCard1.innerHTML = getCardTemplate(data[indexOfCard1]);

    if (indexOfCard2 === data.length && data.length % 2 != 0) {
      divOfCard2.innerHTML = "";
    } else {
      divOfCard2.innerHTML = getCardTemplate(data[indexOfCard2]);
    }
  }
}
