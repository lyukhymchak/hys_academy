import {
  dataForPaginator,
  dataForSlider,
  dataForSlickSlider,
} from './data/data';

import { SliderData } from './models/SliderData.model';
import { SlickSliderData } from './models/SlickSliderData.model';
import { PaginatorData } from './models/PaginatorData.model';

export class Storage {
  constructor() {
    this.setDataToLocalStorage<PaginatorData>('paginator', dataForPaginator());

    this.setDataToLocalStorage<SliderData>('slider', dataForSlider());

    this.setDataToLocalStorage<SlickSliderData>(
      'slickSlider',
      dataForSlickSlider()
    );
  }

  getDatafromLocalStorage<DataType>(key: string): Array<DataType> {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  setDataToLocalStorage<DataType>(key: string, data: Array<DataType>): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
