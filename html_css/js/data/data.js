import data from "./data.json" assert { type: "json" };
import dataSlider from "./dataSlider.json" assert { type: "json" };

export function dataForPaginator() {
  return data;
}

export function dataForSlider() {
  return dataSlider;
}
