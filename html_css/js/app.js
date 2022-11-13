import { initFixedHeader } from './fixed-header.js';
import { initMobileMenu } from './mobile-menu.js';
import { paginator } from './paginator.js';
import { Slider } from './slider.js';
import { SlickSlider } from './slick-slider.js';
import { Storage } from './storage.js';
import { Form } from './form.js';
import { Select } from './select.js';

export class App {
  constructor() {}

  async init() {
    initFixedHeader();
    initMobileMenu();

    const storage = new Storage();

    initPaginator(storage.getDatafromLocalStorage('paginator'));

    initSlickSlider(storage.getDatafromLocalStorage('slickSlider'));

    initForm();

    const data = await this.makeRequest();
    const slider = initSlider(data);

    const select = new Select('#select');

    const selectList = document.getElementById('select');
    selectList.addEventListener('change', event =>
      this.onAlbumChange(event, slider)
    );
  }

  async onAlbumChange(event, s) {
    let data = await this.makeRequest(event.target.value);
    s.emptySlider();
    s.initSlider(data);
  }

  async makeRequest(albumID = 1) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumID}/photos`
    );

    const result = await response.json();

    return result.slice(0, getRandomNumber(4, 20));
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function initSlider(data) {
  const slider = new Slider('preference-slider', data);
  return slider;
}

function initSlickSlider(data) {
  const slickSlider = new SlickSlider('.slick-slider', data);
}

function initPaginator(data) {
  paginator('paginator', data);
}

function initForm() {
  const form = new Form('form');
}
