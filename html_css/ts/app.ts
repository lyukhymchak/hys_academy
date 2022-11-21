import { initFixedHeader } from './fixed-header';
import { initMobileMenu } from './mobile-menu';
import { paginator } from './paginator';
import { Slider } from './slider';
import { SlickSlider } from './slick-slider';
import { Storage } from './storage';
import { Form } from './form';
import { Select } from './select';

export class App {
  private readonly slider = new Slider('preference-slider');
  private readonly slickSlider = new SlickSlider('.slick-slider');
  private readonly select = new Select('#select');
  private readonly storage = new Storage();
  private readonly form = new Form('form');

  constructor() {}

  public async init() {
    initFixedHeader();
    initMobileMenu();

    paginator('paginator', this.storage.getDatafromLocalStorage('paginator'));

    this.form.init();

    this.slickSlider.init(this.storage.getDatafromLocalStorage('slickSlider'));

    const dataForSlider = await this.getSliderData();
    this.slider.init(dataForSlider);

    this.select.init();
    this.select.el.addEventListener('change', (event: Event) =>
      this.onAlbumChange(event, this.slider)
    );
  }

  private async onAlbumChange(event: Event, slider: Slider) {
    let data = await this.getSliderData(
      (event.target as HTMLSelectElement).value
    );

    slider.empty();
    slider.init(data);
  }

  private async getSliderData(albumID: string = '1') {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumID}/photos`
      );

      const result = await response.json();

      return result.slice(0, this.getRandomNumber(4, 20));
    } catch (e) {
      console.error(e);
    }
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
