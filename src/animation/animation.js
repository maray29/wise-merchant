import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function animatePinnedSection() {
  gsap.registerPlugin(ScrollTrigger);

  const panel = document.querySelector('[data-element="pinned-section"]');
  const panelParent = document.querySelector('[data-element="pinned-section-parent"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panelParent,
      start: 'clamp(top top)',
      end: '+=100%',
      scrub: true,
      // pin: true,
      markers: true,
    },
  });

  gsap.set(panel, {
    // yPercent: 100,
  });

  tl.to(
    panelParent,
    {
      scale: 0.85,
      yPercent: 50,
      // autoAlpha: 0,
      // backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    0
  );
  tl.to(
    panel,
    {
      // yPercent: -100,
      ease: 'none',
    },
    0
  );
  // add other animations here, after the panel is in position
}
