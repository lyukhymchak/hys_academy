import {
  dataForPaginator,
  dataForSlider,
  dataForSlickSlider,
} from './data/data';

export class Storage {
  constructor() {
    this.setDataToLocalStorage('paginator', dataForPaginator());
    this.setDataToLocalStorage('slider', dataForSlider());
    this.setDataToLocalStorage('slickSlider', dataForSlickSlider());
  }

  getDatafromLocalStorage(key: string): object {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  setDataToLocalStorage(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
