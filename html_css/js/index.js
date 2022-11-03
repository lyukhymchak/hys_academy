import { paginator } from "./paginator.js";
import { dataForPaginator } from "./data/data.js";

window.addEventListener("DOMContentLoaded", () => {
  initPaginator();
});

function initPaginator() {
  paginator("paginator", dataForPaginator());
}
