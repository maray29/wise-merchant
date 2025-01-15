import { animateHeaderHeading, animateNav } from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  let lenis;
  lenis = scroll();

  animateHeaderHeading();
  animateNav();
  waitForHcaptchaAndRun();
});
