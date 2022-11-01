import dataPaginator from './dataPaginator.json' assert { type: 'json' };
import dataSlider from './dataSlider.json' assert { type: 'json' };
import dataSlickSlider from './dataSlickSlider.json' assert { type: 'json' };

export function dataForPaginator() {
  return dataPaginator;
}

export function dataForSlider() {
  const myData = dataSlider.filter((element, index) => {
    return element['albumId'] === 1 && index < 10;
  });

  return myData;
}

export function dataForSlickSlider() {
  return dataSlickSlider;
}
