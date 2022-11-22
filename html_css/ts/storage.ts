import SlickSliderData from './models/SlickSliderData.model';
import PaginatorData from './models/PaginatorData.model';
import SliderData from './models/SliderData.model';

interface LocalStorage<T> {
  getDatafromLocalStorage<T>(): Array<T>;
  setDataToLocalStorage(data: Array<T>): void;
  init(data: Array<T>): void;
}

export class Storage<DataType> implements LocalStorage<DataType> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public init(data: Array<DataType>): void {
    this.setDataToLocalStorage(data);
  }

  public getDatafromLocalStorage<DataType>(): Array<DataType> {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key));
    }
  }

  public setDataToLocalStorage(data: Array<DataType>): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
