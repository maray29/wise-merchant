import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';

import gsap from 'gsap';
import Swiper from 'swiper';
import { Navigation, Parallax } from 'swiper/modules';

export function createProjectsSlider() {
  const projectsSlider = document.querySelector('[data-element="projects-slider"]');

  if (!projectsSlider) return;

  if (projectsSlider) {
    const swiper = new Swiper(projectsSlider, {
      modules: [Navigation],
      slidesPerView: '2.5',
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      // parallax: true,
      speed: 500,
      a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      breakpoints: {
        0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
        480: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
        767: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
        992: { slidesPerGroup: 2 },
        1440: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
      },
    });
  }

  const projectComponents = projectsSlider.querySelectorAll('[data-element="project-component"]');

  projectComponents.forEach((projectComponent) => {
    const projectImgWrap = projectComponent.querySelector('[data-element="project-img-wrap"]');
    const projectImg1 = projectComponent.querySelector('[data-element="project-img"]');
    const projectImg2 = projectComponent.querySelector('[data-element="project-img-2"]');
    projectImgWrap.addEventListener('mouseenter', () => {
      gsap.to(projectImg1, {
        autoAlpha: 0,
      });
    });

    projectImgWrap.addEventListener('mouseleave', () => {
      gsap.to(projectImg1, {
        autoAlpha: 1,
      });
    });
  });
}

export function createTestimonialsSlider() {
  const testimonialsSlider = document.querySelector('[data-element="testimonials-slider"]');
  const sliderBtnPrev = testimonialsSlider.parentElement.querySelector(
    '[data-element="swiper-prev"]'
  );
  const sliderBtnNext = testimonialsSlider.parentElement.querySelector(
    '[data-element="swiper-next"]'
  );

  if (!testimonialsSlider) return;

  const swiper = new Swiper(testimonialsSlider, {
    modules: [Navigation],
    slidesPerView: '1',
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    // centeredSlides: true,
    speed: 500,
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    navigation: {
      prevEl: sliderBtnPrev,
      nextEl: sliderBtnNext,
    },
  });
}

export function createProjectImgsSlider() {
  const sliderWraps = document.querySelectorAll('.project-imgs_list-wrap.swiper');

  sliderWraps.forEach((sliderWrap) => {
    const prevEl = sliderWrap.querySelector("[data-element='swiper-prev']");
    const nextEl = sliderWrap.querySelector("[data-element='swiper-next']");

    console.log(prevEl, nextEl);

    if (sliderWrap) {
      const swiper = new Swiper(sliderWrap, {
        modules: [Navigation],
        slidesPerView: '1',
        spaceBetween: 0,
        loop: true,
        grabCursor: true,
        // parallax: true,
        speed: 500,
        a11y: {
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        },
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl,
        },
      });
    }
  });
}
