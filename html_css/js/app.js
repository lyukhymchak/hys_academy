import { initFixedHeader } from './fixed-header.js';
import { initMobileMenu } from './mobile-menu.js';
import { paginator } from './paginator.js';
import { Slider } from './slider.js';
import { SlickSlider } from './slick-slider.js';
import { Storage } from './storage.js';
import { Select } from './select.js';
import { formOnLoad } from './form.js';

export class App {
  constructor() {}

  async init() {
    initFixedHeader();
    initMobileMenu();

    const data = await this.makeRequest();

    const select = new Select('#select');

    const selectList = document.getElementById('select');
    selectList.addEventListener('change', (event, _) =>
      this.onAlbumChange(event, slider)
    );

    const storage = new Storage();

    initPaginator(storage.getDatafromLocalStorage('paginator'));

    initSlider(storage.getDatafromLocalStorage('slider'));
    initslickSlider(storage.getDatafromLocalStorage('slickSlider'));

    formOnLoad();
  }

  async onAlbumChange(event, s) {
    let data = await this.makeRequest(event.target.value);

    s.initSlider(data);
  }

  async makeRequest(albumID = 1) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumID}/photos`
    );

    const result = await response.json();

    return result.slice(0, this.getRandomArbitrary(4, 15));
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}

function initSlider(data) {
  const slider = new Slider('preference-slider', data);
}

function initslickSlider(data) {
  const slickSlider = new SlickSlider('.slick-slider', data);
}

function initPaginator(data) {
  paginator('paginator', data);
}
