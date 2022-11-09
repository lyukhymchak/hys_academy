import { initFixedHeader } from "./fixed-header.js";
import { initMobileMenu } from "./mobile-menu.js";
import { paginator } from "./paginator.js";
import { Slider } from "./slider.js";
import { SlickSlider } from "./slick-slider.js";
import { Storage } from "./storage.js";
import { Form } from "./form.js";

export class App {
  constructor() {}

  init() {
    initFixedHeader();
    initMobileMenu();

    const storage = new Storage();

    initPaginator(storage.getDatafromLocalStorage("paginator"));
    initSlider(storage.getDatafromLocalStorage("slider"));
    initslickSlider(storage.getDatafromLocalStorage("slickSlider"));

    initForm();
  }
}

function initSlider(data) {
  const slider = new Slider("preference-slider", data);
}

function initslickSlider(data) {
  const slickSlider = new SlickSlider(".slick-slider", data);
}

function initPaginator(data) {
  paginator("paginator", data);
}

function initForm() {
  const form = new Form("form");
}
