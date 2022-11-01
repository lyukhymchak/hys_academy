export class Select {
  constructor(id) {
    this.init(id);
  }

  init(id) {
    const select = document.getElementById(id);
    select.appendChild(this.createSelectItemMarkup());
  }

  createSelectItemMarkup() {
    const select = document.createElement("select");
    select.classList.add("preference__select");

    for (let i = 0; i < 3; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", `${i + 1}`);
      option.innerHTML = `Item ${i + 1}`;

      select.appendChild(option);
    }

    return select;
  }
}
