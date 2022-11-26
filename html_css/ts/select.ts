import { AlbumEnum } from './enums/AlbumEnum';

export class Select {
  private readonly id: string;

  private _el: Element;

  constructor(id: string) {
    this.id = id;
  }

  public get el(): Element {
    return this._el;
  }

  private set el(element: Element) {
    this._el = element;
  }

  public init(): void {
    this.el = document.querySelector(this.id);
    this.el.appendChild(this.getSelectListMarkup());
  }

  private getSelectListMarkup(): HTMLElement {
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
