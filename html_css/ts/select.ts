import { AlbumEnum } from './models/AlbumEnum.model';

export class Select {
  private _el: Element;

  get el(): Element {
    return this._el;
  }

  set el(element: Element) {
    this._el = element;
  }

  constructor(id: string) {
    this.initSelectList(id);
  }

  initSelectList(id: string): void {
    this.el = document.querySelector(id);
    this.el.appendChild(this.getSelectListMarkup());
  }

  getSelectListMarkup(): HTMLElement {
    const selectList: HTMLSelectElement = document.createElement('select');

    selectList.classList.add('preference__select');

    const albums: string[] = Object.values(AlbumEnum);

    for (let i = 0; i < albums.length; i++) {
      const option: HTMLOptionElement = document.createElement('option');

      option.setAttribute('value', `${i + 1}`);
      option.innerHTML = albums[i];

      selectList.appendChild(option);
    }

    return selectList;
  }
}
