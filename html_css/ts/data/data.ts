import { SliderData } from '../types/SliderData';
import { SlickSliderData } from '../types/SlickSliderData';
import { PaginatorData } from '../types/PaginatorData';

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
