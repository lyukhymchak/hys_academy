import { AlbumEnum } from './AlbumEnum';

export class Select {
  constructor(id: string) {
    this.initSelectList(id);
  }

  initSelectList(id: string): void {
    const divSelectList: HTMLDivElement = document.querySelector(id);

    divSelectList.appendChild(this.getSelectListMarkup());
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
