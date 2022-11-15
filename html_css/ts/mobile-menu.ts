export function initMobileMenu(): void {
  let isMenuOpen: boolean = false;
  const nav: HTMLElement = document.querySelector('.navbar');
  const btnExplore: HTMLButtonElement = document.querySelector('.btn-explore');

  nav.addEventListener('click', clickHandler);
  window.addEventListener('resize', autoCloseMenu);

  function clickHandler(event: Event): void {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('hamburger-menu-svg')) {
      if (!isMenuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    }

    if (
      target.classList.contains('close-svg') ||
      target.classList.contains('navbar__link')
    ) {
      closeMenu();
    }
  }

  function closeMenu(): void {
    isMenuOpen = false;
    nav.classList.remove('hamburger-menu');
    btnExplore.hidden = false;
  }

  function openMenu(): void {
    isMenuOpen = true;
    nav.classList.add('hamburger-menu');
    btnExplore.hidden = true;
  }

  function autoCloseMenu(): void {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  }
}
