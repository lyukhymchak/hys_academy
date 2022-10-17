import { paginator } from "./paginator.js";
import { dataForPaginator } from "./data/data.js";

document.onload = init();

function init() {
  paginator("paginator", dataForPaginator());
}
