import {
  animateFAQ,
  animateHeaderHeading,
  animateIconDivider,
  animateNav,
  animatePinnedSection,
  animateProcessTabs,
} from '$animation/animation.js';
import {
  createPackagingTabsSlider,
  createProjectsSlider,
  createTestimonialsSlider,
} from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';
import { setHeroHeight } from '$utils/utils.js';

window.addEventListener('DOMContentLoaded', () => {
  setHeroHeight();
  animateNav();
  animateHeaderHeading();
  animatePinnedSection();
  createProjectsSlider();
  createTestimonialsSlider();
  createPackagingTabsSlider();
  animateProcessTabs();
  animateFAQ();
  animateIconDivider();

  let lenis;
  lenis = scroll();
});
