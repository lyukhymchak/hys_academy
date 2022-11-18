import { initFixedHeader } from './fixed-header';
import { initMobileMenu } from './mobile-menu';
import { paginator } from './paginator';
import { Slider } from './slider';
import { SlickSlider } from './slick-slider';
import Storage from './storage';
import { Form } from './form';
import { Select } from './select';

import { dataForPaginator, dataForSlickSlider } from './data/data';

import { SliderData } from './models/SliderData.model';

abstract class AppAbstract {
  protected baseUrl = 'https://jsonplaceholder.typicode.com/albums/';

  abstract getSliderData(albumID: string): Promise<SliderData[]>;
}
export class App extends AppAbstract {
  constructor() {
    super();
  }

  public async init() {
    initFixedHeader();
    initMobileMenu();

    this.initPaginator();

    this.initSlickSlider();

    this.initForm();

    const dataForSlider = await this.getSliderData();
    const slider = this.initSlider(dataForSlider);

    const select = new Select('#select');

    select.element.addEventListener('change', event =>
      this.onAlbumChange(event, slider)
    );
  }

  private async onAlbumChange(event: Event, s: Slider) {
    let data = await this.getSliderData(
      (event.target as HTMLSelectElement).value
    );
    s.emptySlider();
    s.initSlider(data);
  }

  async getSliderData(albumID: string = '1'): Promise<SliderData[]> {
    try {
      const url: string = this.baseUrl + `${albumID}/photos`;
      const response = await fetch(url);

      const result = await response.json();

      return result.slice(0, this.getRandomNumber(4, 20));
    } catch (e) {
      console.error(e);
    }
  }

  private getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private initSlider(data: SliderData[]) {
    const slider = new Slider('preference-slider', data);
    return slider;
  }

  private initSlickSlider() {
    const storageSlickSlider = new Storage('slickSlider');
    storageSlickSlider.init(dataForSlickSlider());

    const slickSlider = new SlickSlider(
      '.slick-slider',
      storageSlickSlider.getDatafromLocalStorage()
    );
  }

  private initPaginator() {
    const storagePaginator = new Storage('paginator');
    storagePaginator.init(dataForPaginator());

    paginator('paginator', storagePaginator.getDatafromLocalStorage());
  }

  private initForm() {
    const form = new Form('form');
  }
}
