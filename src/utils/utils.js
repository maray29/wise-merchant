export function setHeroHeight() {
  // Get the hero wrapper element
  const heroWrapper = document.querySelector('[data-element="hero-wrapper"]');

  if (!heroWrapper) return;

  // Calculate the window height
  const windowHeight = window.innerHeight;

  // Set the height of the hero wrapper
  heroWrapper.style.height = `${windowHeight}px`;
}
