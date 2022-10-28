import {
  dataForPaginator,
  dataForSlider,
  dataForSlickSlider,
} from "./data/data.js";

export class Storage {
  constructor() {
    this.setDataToLocalStorage("paginator", dataForPaginator());
    this.setDataToLocalStorage("slider", dataForSlider());
    this.setDataToLocalStorage("slickSlider", dataForSlickSlider());
  }

  getDatafromLocalStorage(key) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }
  setDataToLocalStorage(key, data) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
}
