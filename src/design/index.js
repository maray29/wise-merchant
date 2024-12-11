import gsap from 'gsap';

import {
  animateFAQ,
  animateHeaderHeading,
  animateIconDivider,
  animateNav,
  animatePinnedSection,
  animateProcessTabs,
} from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import { createProjectsSlider, createTestimonialsSlider } from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  let lenis;
  lenis = scroll();

  animateNav();
  animateHeaderHeading();
  animatePinnedSection();
  createProjectsSlider();
  createTestimonialsSlider();
  animateProcessTabs();
  animateFAQ();
  waitForHcaptchaAndRun();
  animateIconDivider();
});
