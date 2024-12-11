import {
  animateFAQ,
  animateHeaderHeading,
  animateIconDivider,
  animateNav,
  animatePinnedSection,
  animateProcessTabs,
} from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import { createProjectImgsSlider } from '$sliders/sliders.js';
import { createProjectsSlider } from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  let lenis;
  lenis = scroll();

  animateNav();
  animateHeaderHeading();
  createProjectsSlider();
  animatePinnedSection();
  animateIconDivider();
  animateProcessTabs();
  animateFAQ();
  waitForHcaptchaAndRun();
  createProjectImgsSlider();
});
