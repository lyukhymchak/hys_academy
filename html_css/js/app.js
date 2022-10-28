import { paginator } from "./paginator.js";
import { Slider } from "./slider.js";
import { SlickSlider } from "./slick-slider.js";
import { Storage } from "./storage.js";

export class App {
  constructor() {}

  init() {
    const storage = new Storage();
    paginator("paginator", storage.getDatafromLocalStorage("paginator"));

    const slider = new Slider(
      "preference-slider",
      storage.getDatafromLocalStorage("slider")
    );

    const slickSlider = new SlickSlider(
      ".slick-slider",
      storage.getDatafromLocalStorage("slickSlider")
    );
  }
}
