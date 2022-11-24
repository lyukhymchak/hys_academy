import { AlbumEnum } from './models/AlbumEnum.model';
import Init from './models/Init.model';
export class Select implements Init {
  private readonly id: string;

  private el: HTMLSelectElement;

  constructor(id: string) {
    this.id = id;
  }

  public get element(): HTMLSelectElement {
    return this.el;
  }

  private set element(element: HTMLSelectElement) {
    this.el = element;
  }

  public init(): void {
    this.element = document.querySelector(this.id);
    this.element.appendChild(this.getSelectListMarkup());
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
