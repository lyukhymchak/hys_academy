const header = document.querySelector(".header");
window.addEventListener("scroll", scrollHandler);

function scrollHandler() {
  if (window.scrollY >= header.clientHeight) {
    header.classList.add("header-fixed");
  } else {
    header.classList.remove("header-fixed");
  }
}
