import { AlbumEnum } from './models/AlbumEnum.model';

interface Init {
  init(): void;
}
export class Select implements Init {
  private el: HTMLSelectElement;
  private id: string;

  constructor(id: string) {
    this.id = id;
    this.init();
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
