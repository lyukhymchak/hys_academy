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
  initSliders();
});

function initSliders() {
  const slider = new Slider("preference-slider", dataForSlider());
  const slickSlider = new SlickSlider(".slick-slider", dataForSlickSlider());
}

function initPaginator() {
  paginator("paginator", dataForPaginator());
}
