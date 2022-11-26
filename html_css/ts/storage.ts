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

  public getDatafromLocalStorage<DataType>(key: string): Array<DataType> {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  public setDataToLocalStorage<DataType>(
    key: string,
    data: Array<DataType>
  ): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
