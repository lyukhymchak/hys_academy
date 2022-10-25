import { paginator } from "./paginator.js";
import { Slider } from "./slider.js";
import { SlickSlider } from "./slick-slider.js";
import { dataForPaginator, dataForSlider } from "./data/data.js";

document.onload = init();

function init() {
  paginator("paginator", dataForPaginator());
  const slider = new Slider("preference-slider", dataForSlider());
  const slickSlider = new SlickSlider(".courses__list");
}
