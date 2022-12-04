import Albums from './models/albums.enum.model';
import Init from './models/init.model';

export default class Select implements Init {
  private readonly id: string;
  private el: HTMLSelectElement;

  private set element(element: HTMLSelectElement) {
    this.el = element;
  }

  public get element(): HTMLSelectElement {
    return this.el;
  }

  constructor(id: string) {
    this.id = id;
  }

  public init(): void {
    this.element = document.querySelector(this.id);
    this.element.appendChild(this.getSelectListMarkup());
  }

  private getSelectListMarkup(): HTMLElement {
    const selectList: HTMLSelectElement = document.createElement('select');

    selectList.classList.add('preference__select');

    const albums: string[] = Object.keys(Albums).filter(item => {
      return isNaN(Number(item));
    });

    for (let i = 0; i < albums.length; i++) {
      const option: HTMLOptionElement = document.createElement('option');

      option.setAttribute('value', `${i + 1}`);
      option.innerHTML = albums[i];

      selectList.appendChild(option);
    }

    return selectList;
  }
}
