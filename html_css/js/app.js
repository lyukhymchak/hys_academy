import { paginator } from "./paginator.js";
import { Slider } from "./slider.js";
import { SlickSlider } from "./slick-slider.js";
import { Storage } from "./storage.js";
import { Select } from "./select.js";
import { formChangeData, formOnLoad } from "./form.js";

export class App {
  constructor() {}

  init() {
    formOnLoad();
    formChangeData();

    const storage = new Storage();

    const select = new Select("select");

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
