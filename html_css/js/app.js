import { paginator } from "./paginator.js";
import { Slider } from "./slider.js";
import { SlickSlider } from "./slick-slider.js";
import { Storage } from "./storage.js";
import { Select } from "./select.js";
import { formChangeData, formOnLoad } from "./form.js";

export class App {
  constructor() {}

  async init() {
    formOnLoad();
    formChangeData();

    const storage = new Storage();

    const select = new Select("select");

    paginator("paginator", storage.getDatafromLocalStorage("paginator"));
    const data = await this.makeRequest();
    const slider = new Slider("preference-slider", data);

    const slickSlider = new SlickSlider(
      ".slick-slider",
      storage.getDatafromLocalStorage("slickSlider")
    );

    const selectId = document.getElementById("select");
    selectId.addEventListener("change", (event, _) =>
      this.onAlbumChange(event, slider)
    );
  }

  async onAlbumChange(event, s) {
    let data = await this.makeRequest(event.target.value);
    s.initSlider(data);
  }

  async makeRequest(albumID = 1) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumID}/photos`
    );
    const result = await response.json();

    return result.slice(0, this.getRandomArbitrary(4, 15));
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
