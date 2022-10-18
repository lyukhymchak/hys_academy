import { paginator } from "./paginator.js";
import { Slider } from "./slider.js";
import { dataForPaginator, dataForSlider } from "./data/data.js";

document.onload = init();

function init() {
  paginator("paginator", dataForPaginator());
  const slider = new Slider("preference-slider", dataForSlider());
}
