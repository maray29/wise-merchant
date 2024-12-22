export function setHeroHeight(subtractNav = false) {
  const element = document.querySelector('[data-element="hero-wrapper"]');

  if (!element) return;

  const vh = window.innerHeight;

  let finalHeight = vh;

  if (subtractNav) {
    const navbar = document.querySelector('[data-element="nav"]');
    const navHeight = navbar ? navbar.offsetHeight : 0;
    finalHeight = finalHeight - navHeight;
  }

  element.style.height = `${finalHeight}px`;
}
