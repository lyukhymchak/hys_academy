import SliderData from '../interfaces/SliderData';
import SlickSliderData from '../interfaces/SlickSliderData';
import PaginatorData from '../interfaces/PaginatorData';

const dataPaginator: PaginatorData[] = require('./dataPaginator.json');
const dataSlider: SliderData[] = require('./dataSlider.json');
const dataSlickSlider: SlickSliderData[] = require('./dataSlickSlider.json');

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
