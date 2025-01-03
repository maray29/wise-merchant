import {
  animateFAQ,
  animateHeaderHeading,
  animateIconDivider,
  animateNav,
  animateProcessTabs,
} from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import {
  createLogoSlider,
  createProjectsSlider,
  createTestimonialsSlider,
} from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';
import { setHeroHeight } from '$utils/utils.js';

window.addEventListener('DOMContentLoaded', () => {
  let lenis;
  lenis = scroll();

  setHeroHeight(true);
  animateNav();
  animateHeaderHeading();
  createProjectsSlider();
  createTestimonialsSlider();
  createLogoSlider();
  animateProcessTabs();
  animateFAQ();
  waitForHcaptchaAndRun();
  animateIconDivider();
});
