import PaginatorData from './models/paginator-data.model';

export default function paginator(
  selector: string,
  data: PaginatorData[]
): void {
  const paginatorDiv: HTMLElement = document.getElementById(selector);

  paginatorDiv.appendChild(getBlogHTML(data));
  paginatorDiv.addEventListener('click', (event: Event) =>
    clickBtnPaginatorHandler(event, data)
  );
}

function getBlogHTML(data: PaginatorData[]): HTMLDivElement {
  const cardsPerPage: number = data.length > 2 ? 2 : data.length;
  const countOfVisiblePages: number = getCountOfVisiblePages(data.length);

  const divBlog: HTMLDivElement = document.createElement('div');
  const divCards: HTMLDivElement[] = [];

  for (let i = 0; i < cardsPerPage; i++) {
    const dataAtr: string = `card-${i + 1}`;

    divCards[i] = document.createElement('div');
    divCards[i].setAttribute('data-card', dataAtr);
    divCards[i].innerHTML = getCardTemplate(data[i]);
    divBlog.appendChild(divCards[i]);
  }

  if (countOfVisiblePages > 1) {
    const divPaginator: HTMLDivElement = document.createElement('div');

    divPaginator.classList.add('blog__paginator');
    divPaginator.appendChild(getPaginatorHTML(0, countOfVisiblePages));
    divBlog.appendChild(divPaginator);
  }

  divBlog.classList.add('blog__list');

  return divBlog;
}

function getPaginatorHTML(
  indexOfActiveBtn: number,
  endIndex: number,
  startIndex: number = 0
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div');

  for (let i = startIndex; i < endIndex; i++) {
    div.appendChild(getBtnHTML(i + 1));
  }

  (div.childNodes[indexOfActiveBtn] as HTMLButtonElement).classList.add(
    'btn-number-slider-active'
  );
  div.classList.add('number-slider');

  return div;
}

function getBtnHTML(numberOfPage: number): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');

  button.classList.add('btn-number-slider');
  button.innerHTML = String(numberOfPage);

  return button;
}

function getCardTemplate(card: PaginatorData): string {
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

function getCountOfPages(count: number): number {
  const cardsPerPage: number = 2;

  if (count % cardsPerPage === 0) {
    return count / cardsPerPage;
  }

  return Math.trunc(count / cardsPerPage) + 1;
}

function getCountOfVisiblePages(count: number): number {
  const cardsPerPage: number = 2;
  const countOfVisiblePages: number = 5;

  if (count / cardsPerPage <= countOfVisiblePages) {
    return getCountOfPages(count);
  }

  return countOfVisiblePages;
}

function clickBtnPaginatorHandler(event: Event, data: PaginatorData[]): void {
  const target: HTMLButtonElement = event.target as HTMLButtonElement;

  if (target.classList.contains('btn-number-slider')) {
    const countOfPages: number = getCountOfPages(data.length);
    const numberOfCurrentPage: number = Number(target.innerHTML);
    const indexOfCard1: number = 2 * (numberOfCurrentPage - 1);
    const indexOfCard2: number = 2 * numberOfCurrentPage - 1;

    const divOfCard1: HTMLDivElement = document.querySelector(
      `div[data-card="card-1"]`
    );
    const divOfCard2: HTMLDivElement = document.querySelector(
      `div[data-card="card-2"]`
    );

    divOfCard1.innerHTML = getCardTemplate(data[indexOfCard1]);

    if (isLastCardSingle(indexOfCard2, data.length)) {
      divOfCard2.innerHTML = '';
    } else {
      divOfCard2.innerHTML = getCardTemplate(data[indexOfCard2]);
    }

    refreshPaginatorHTML(target, numberOfCurrentPage, countOfPages);
  }
}

function isLastCardSingle(
  indexOfCard: number,
  indexOfLastElement: number
): boolean {
  return indexOfCard === indexOfLastElement && indexOfLastElement % 2 !== 0;
}

function refreshPaginatorHTML(
  btn: HTMLButtonElement,
  numberOfCurrentPage: number,
  countOfPages: number
): void {
  if (
    countOfPages < 5 ||
    numberOfCurrentPage === 1 ||
    numberOfCurrentPage === countOfPages
  ) {
    changeActiveBtn(btn);
    return;
  }

  const numSlider: HTMLDivElement = document.querySelector('.blog__paginator');
  numSlider.innerHTML = '';

  switch (numberOfCurrentPage) {
    case 2:
      numSlider.appendChild(getPaginatorHTML(1, 5, 0));
      break;
    case countOfPages - 1:
      numSlider.appendChild(
        getPaginatorHTML(3, countOfPages, countOfPages - 5)
      );
      break;
    default:
      numSlider.appendChild(
        getPaginatorHTML(2, numberOfCurrentPage + 2, numberOfCurrentPage - 3)
      );
  }
}

function changeActiveBtn(btn: HTMLButtonElement): void {
  const activeBtn: HTMLButtonElement = document.querySelector(
    '.btn-number-slider-active'
  );

  activeBtn.classList.remove('btn-number-slider-active');
  btn.classList.add('btn-number-slider-active');
}
