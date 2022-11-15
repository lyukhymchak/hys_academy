export class Select {
  #el;

  constructor(selector) {
    this.initSelectList(selector);
  }

  initSelectList(selector) {
    this.#el = document.querySelector(selector);

    this.#el.appendChild(this.getSelectListMarkup());
  }

  getSelectListMarkup() {
    const selectList = document.createElement('select');

    selectList.classList.add('preference__select');

    for (let i = 0; i < 3; i++) {
      const option = document.createElement('option');

      option.setAttribute('value', `${i + 1}`);
      option.innerHTML = `Album ${i + 1}`;

      selectList.appendChild(option);
    }

    return selectList;
  }
}
