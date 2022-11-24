import initFixedHeader from './fixed-header';
import initMobileMenu from './mobile-menu';
import paginator from './paginator';

import { Slider } from './slider';
import { SlickSlider } from './slick-slider';
import { Storage } from './storage';
import { Form } from './form';
import { Select } from './select';

import SliderData from './models/SliderData.model';
import SlickSliderData from './models/SlickSliderData.model';
import PaginatorData from './models/PaginatorData.model';

import { dataForPaginator, dataForSlickSlider } from './data/data';

import ReadOnly from './decorators/readOnly.decorator';

import Init from './models/Init.model';
abstract class AppAbstract {
  protected baseUrl = 'https://jsonplaceholder.typicode.com/albums/';

  protected abstract getSliderData(albumID: string): Promise<SliderData[]>;
}
export class App extends AppAbstract implements Init {
  private readonly slider = new Slider('preference-slider');
  private readonly slickSlider = new SlickSlider('.slick-slider');
  private readonly select = new Select('#select');
  private readonly form = new Form('form');

  private readonly storagePaginator = new Storage<PaginatorData>('paginator');
  private readonly storageSlickSlider = new Storage<SlickSliderData>(
    'slickSlider'
  );

  constructor() {
    super();
  }

  @ReadOnly(true)
  public async init(): Promise<void> {
    initFixedHeader();
    initMobileMenu();

    this.form.init();

    this.storagePaginator.init(dataForPaginator());
    this.storageSlickSlider.init(dataForSlickSlider());

    paginator('paginator', this.storagePaginator.localData);
    this.slickSlider.init(this.storageSlickSlider.localData);

    this.slider.init(await this.getSliderData());

    this.select.init();
    this.select.element.addEventListener('change', (event: Event) =>
      this.onAlbumChange(event, this.slider)
    );
  }

  private async onAlbumChange(event: Event, slider: Slider): Promise<void> {
    const data: SliderData[] = await this.getSliderData(
      (event.target as HTMLSelectElement).value
    );

    slider.empty();
    slider.init(data);
  }

  protected async getSliderData(albumID: string = '1'): Promise<SliderData[]> {
    try {
      const url: string = this.baseUrl + `${albumID}/photos`;
      const response: Response = await fetch(url);

      const result: SliderData[] = await response.json();

      return result.slice(0, this.getRandomNumber(4, 20));
    } catch (e) {
      console.error(e);
    }
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
