import { SliderData } from '../models/SliderData.model';
import { SlickSliderData } from '../models/SlickSliderData.model';
import { PaginatorData } from '../models/PaginatorData.model';

const dataPaginator = require('./dataPaginator.json');
const dataSlider = require('./dataSlider.json');
const dataSlickSlider = require('./dataSlickSlider.json');

export function dataForPaginator(): PaginatorData[] {
  return dataPaginator;
}

export function dataForSlider(numberOfSlides: number = 10): SliderData[] {
  return dataSlider.filter(
    (element: SliderData, index: number) =>
      element['albumId'] === 1 && index < numberOfSlides
  );
}

export function dataForSlickSlider(): SlickSliderData[] {
  return dataSlickSlider;
}
