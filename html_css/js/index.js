import { paginator } from "./paginator.js";
import { dataForPaginator } from "./data/data.js";
import { initFixedHeader } from "./fixed-header.js";
import { initMobileMenu } from "./mobile-menu.js";

window.addEventListener("DOMContentLoaded", () => {
  initPaginator();
  initFixedHeader();
  initMobileMenu();
});

function initPaginator() {
  paginator("paginator", dataForPaginator());
}
