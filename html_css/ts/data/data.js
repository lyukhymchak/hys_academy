import dataPaginator from './dataPaginator.json' assert { type: 'json' };
import dataSlider from './dataSlider.json' assert { type: 'json' };
import dataSlickSlider from './dataSlickSlider.json' assert { type: 'json' };

export function dataForPaginator() {
  return dataPaginator;
}

export function dataForSlider(n = 10) {
  return dataSlider.filter(
    (element, index) => element['albumId'] === 1 && index < n
  );
}

export function dataForSlickSlider() {
  return dataSlickSlider;
}
