export function initMobileMenu() {
  let isMenuOpen = false;
  const nav = document.querySelector(".navbar");
  const btnExplore = document.querySelector(".btn-explore");

  nav.addEventListener("click", clickHandler);
  window.addEventListener("resize", autoCloseMenu);

  function clickHandler(event) {
    if (event.target.classList.contains("hamburger-menu-svg")) {
      if (!isMenuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    }

    if (
      event.target.classList.contains("close-svg") ||
      event.target.classList.contains("navbar__link")
    ) {
      closeMenu();
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    nav.classList.remove("hamburger-menu");
    btnExplore.hidden = false;
  }

  function openMenu() {
    isMenuOpen = true;
    nav.classList.add("hamburger-menu");
    btnExplore.hidden = true;
  }

  function autoCloseMenu() {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  }
}
