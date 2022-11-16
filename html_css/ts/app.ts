import { initFixedHeader } from './fixed-header';
import { initMobileMenu } from './mobile-menu';
import { paginator } from './paginator';
import { Slider } from './slider';
import { SlickSlider } from './slick-slider';
import Storage from './storage';
import { Form } from './form';
import { Select } from './select';

import { dataForPaginator, dataForSlickSlider } from './data/data';

import { PaginatorData } from './models/PaginatorData.model';
import { SliderData } from './models/SliderData.model';
import { SlickSliderData } from './models/SlickSliderData.model';

export class App {
  constructor() {}

  async init() {
    initFixedHeader();
    initMobileMenu();

    initPaginator();

    initSlickSlider();

    initForm();

    const dataForSlider = await this.makeRequestForSliderData();
    const slider = initSlider(dataForSlider);

    const select = new Select('#select');

    select.el.addEventListener('change', event =>
      this.onAlbumChange(event, slider)
    );
  }

  async onAlbumChange(event: Event, s: Slider) {
    let data = await this.makeRequestForSliderData(
      (event.target as HTMLSelectElement).value
    );

    s.emptySlider();
    s.initSlider(data);
  }

  async makeRequestForSliderData(albumID: string = '1') {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumID}/photos`
      );

      const result = await response.json();

      return result.slice(0, getRandomNumber(4, 20));
    } catch (e) {
      console.error(e);

      return [];
    }
  }
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function initSlider(data: SliderData[]) {
  const slider = new Slider('preference-slider', data);
  return slider;
}

function initSlickSlider() {
  const storageSlickSlider = new Storage('slickSlider');
  storageSlickSlider.init<SlickSliderData>(dataForSlickSlider());

  const slickSlider = new SlickSlider(
    '.slick-slider',
    storageSlickSlider.getDatafromLocalStorage()
  );
}

function initPaginator() {
  const storagePaginator = new Storage('paginator');
  storagePaginator.init<PaginatorData>(dataForPaginator());

  paginator('paginator', storagePaginator.getDatafromLocalStorage());
}

function initForm() {
  const form = new Form('form');
}
