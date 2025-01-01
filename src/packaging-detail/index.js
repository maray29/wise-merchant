import { animateNav, animatePageIntro } from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import { createPackagingSlider } from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  animateNav();
  animatePageIntro();
  waitForHcaptchaAndRun();
  createPackagingSlider();

  let lenis;
  lenis = scroll();
});
