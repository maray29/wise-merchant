import {
  animateFAQ,
  animateHeaderHeading,
  animateNav,
  animateProcessTabs,
} from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import {
  createLogoSlider,
  createPackagingSlider,
  createProjectImgsSlider,
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
  createProjectImgsSlider();
  createTestimonialsSlider();
  createLogoSlider();
  animateProcessTabs();
  animateFAQ();
  waitForHcaptchaAndRun();
  createPackagingSlider();
});
