export function initFixedHeader(): void {
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler(): void {
  const header: HTMLDivElement = document.querySelector('.header');

  if (window.scrollY >= header.clientHeight) {
    header.classList.add('header-fixed');
  } else {
    header.classList.remove('header-fixed');
  }
}
