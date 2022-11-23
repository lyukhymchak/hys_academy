import SlickSliderData from './models/SlickSliderData.model';
import PaginatorData from './models/PaginatorData.model';
import SliderData from './models/SliderData.model';
import { data } from 'jquery';

interface Init<T> {
  init(data: T[]): void;
}

function LocalStorage<T>(
  key: string
): (target: Object, propertyKey: string) => void {
  return function (target: Object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function (): T[] {
        if (localStorage.getItem(this[key]))
          return JSON.parse(localStorage.getItem(this[key]));
      },
      set: function (data: T[]): void {
        if (this.key) localStorage.setItem(this[key], JSON.stringify(data));
      },
    });
  };
}

export class Storage<DataType> implements Init<DataType> {
  private readonly key: string;

  @LocalStorage<DataType>('key')
  public localData: DataType[];

  constructor(key: string) {
    this.key = key;
  }

  public init(data: Array<DataType>): void {
    this.localData = data;
  }
}
