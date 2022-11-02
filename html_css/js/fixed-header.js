export function initFixedHeader() {
  window.addEventListener("scroll", scrollHandler);
}

function scrollHandler() {
  const header = document.querySelector(".header");

  if (window.scrollY >= header.clientHeight) {
    header.classList.add("header-fixed");
  } else {
    header.classList.remove("header-fixed");
  }
}
