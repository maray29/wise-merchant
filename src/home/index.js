import {
  animateFAQ,
  animateHeaderHeading,
  animateIconDivider,
  animateNav,
  animatePinnedSection,
  animateProcessTabs,
} from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import {
  createPackagingTabsSlider,
  createProjectsSlider,
  createTestimonialsSlider,
} from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  animateNav();
  animateHeaderHeading();
  animatePinnedSection();
  createProjectsSlider();
  createTestimonialsSlider();
  createPackagingTabsSlider();
  animateProcessTabs();
  animateFAQ();
  waitForHcaptchaAndRun();
  animateIconDivider();

  let lenis;
  lenis = scroll();
});
