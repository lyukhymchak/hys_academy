import { SlickSliderData } from './models/SlickSliderData.model';
import { PaginatorData } from './models/PaginatorData.model';
import { SliderData } from './models/SliderData.model';

type DataType = SlickSliderData | PaginatorData | SliderData;

interface LocalStorage<T> {
  getDatafromLocalStorage<T>(): Array<T>;
  setDataToLocalStorage<T>(data: Array<T>): void;
  init<T>(data: Array<T>): void;
}

export default class Storage implements LocalStorage<DataType> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  init<DataType>(data: Array<DataType>): void {
    this.setDataToLocalStorage(data);
  }

  getDatafromLocalStorage<DataType>(): Array<DataType> {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key));
    }
  }

  setDataToLocalStorage<DataType>(data: Array<DataType>): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
