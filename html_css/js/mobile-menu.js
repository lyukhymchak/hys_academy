let isOpen = false;
const hamburger = document.querySelector(".hamburger-menu-logo");
hamburger.addEventListener("click", clickHandler);

function clickHandler() {
  const navbar = document.querySelector(".navbar");
  const btnNav = document.querySelector(".btn-nav");
  if (!isOpen) {
    btnNav.hidden = true;
    navbar.classList.add("hamburger-menu");
    isOpen = true;
  } else {
    closeMenu();
  }

  const closeBtn = document.querySelector(".close-svg");
  closeBtn.addEventListener("click", function () {
    closeMenu();
  });

  const navbarLinks = document.querySelectorAll(".navbar__link");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  //   navbar.addEventListener("click", () => {
  //     if (!isOpen) {
  //       btnNav.hidden = true;
  //       navbar.classList.add("hamburger-menu");
  //       isOpen = true;
  //     } else {
  //       closeMenu();
  //     }
  //   });

  function closeMenu() {
    navbar.classList.remove("hamburger-menu");
    btnNav.hidden = false;
    isOpen = false;
  }
}
