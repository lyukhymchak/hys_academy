export default function initFixedHeader(): void {
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler(): void {
  const header: HTMLDivElement = document.querySelector('.header');

  header.classList.toggle(
    'header-fixed',
    window.scrollY >= header.clientHeight
  );
}
