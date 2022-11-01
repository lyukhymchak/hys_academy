export class Select {
  constructor(id) {
    this.id = id;

    this.initSelectList(this.id);
  }

  initSelectList(id) {
    const divSelectList = document.querySelector(id);

    divSelectList.appendChild(this.getSelectListMarkup());
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
