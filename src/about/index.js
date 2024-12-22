import { animateNav, animatePageIntro } from '$animation/animation.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  animatePageIntro();
  animateNav();

  let lenis;
  lenis = scroll();
});
