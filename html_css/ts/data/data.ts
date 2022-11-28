import SliderData from '../models/slider-data.model';
import SlickSliderData from '../models/slick-slider-data.model';
import PaginatorData from '../models/paginator-data.model';

import dataPaginator from './dataPaginator.json';
import dataSlider from './dataSlider.json';
import dataSlickSlider from './dataSlickSlider.json';

export function dataForPaginator(): PaginatorData[] {
  return dataPaginator;
}

export function dataForSlider(numberOfSlides: number = 10): SliderData[] {
  return dataSlider.slice(0, numberOfSlides);
}

export function dataForSlickSlider(): SlickSliderData[] {
  return dataSlickSlider;
}
