import { initFixedHeader } from './fixed-header';
import { initMobileMenu } from './mobile-menu';
import { paginator } from './paginator';
import { Slider } from './slider';
import { SlickSlider } from './slick-slider';
import { Storage } from './storage';
import { Form } from './form';
import { Select } from './select';

import { PaginatorData } from './data/PaginatorData';
import { SliderData } from './data/SliderData';
import { SlickSliderData } from './data/SlickSliderData';

export class App {
  constructor() {}

  async init() {
    initFixedHeader();
    initMobileMenu();

    const storage = new Storage();

    initPaginator(
      storage.getDatafromLocalStorage('paginator') as PaginatorData[]
    );

    initSlickSlider(
      storage.getDatafromLocalStorage('slickSlider') as SlickSliderData[]
    );

    initForm();

    const slider = initSlider(
      storage.getDatafromLocalStorage('slider') as SliderData[]
    );

    const data = await this.makeRequest();

    const select = new Select('#select');

    const selectList = document.getElementById('select');
    selectList.addEventListener('change', event =>
      this.onAlbumChange(event, slider)
    );
  }

  async onAlbumChange(event: Event, s: Slider) {
    let data = await this.makeRequest(
      (event.target as HTMLSelectElement).value
    );

    s.emptySlider();
    s.initSlider(data);
  }

  async makeRequest(albumID: string = '1') {
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

function initSlickSlider(data: SlickSliderData[]) {
  const slickSlider = new SlickSlider('.slick-slider', data);
}

function initPaginator(data: PaginatorData[]) {
  paginator('paginator', data);
}

function initForm() {
  const form = new Form('form');
}
