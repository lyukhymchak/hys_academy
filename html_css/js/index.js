import { paginator } from "./paginator.js";
import { initFixedHeader } from "./fixed-header.js";
import { initMobileMenu } from "./mobile-menu.js";
import { Slider } from "./slider.js";
import { SlickSlider } from "./slick-slider.js";
import {
  dataForPaginator,
  dataForSlider,
  dataForSlickSlider,
} from "./data/data.js";

window.addEventListener("DOMContentLoaded", () => {
  initPaginator();
  initFixedHeader();
  initMobileMenu();
  initSlider();
  iniSlickSlider();
});

function initSlider() {
  const slider = new Slider("preference-slider", dataForSlider());
}

function iniSlickSlider() {
  const slickSlider = new SlickSlider(".slick-slider", dataForSlickSlider());
}

function initPaginator() {
  paginator("paginator", dataForPaginator());
}
