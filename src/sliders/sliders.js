import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

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
        1440: { slidesPerView: 2.5, slidesPerGroup: 1, spaceBetween: 16 },
      },
    });
  }

  // const projectComponents = projectsSlider.querySelectorAll('[data-element="project-component"]');

  // projectComponents.forEach((projectComponent) => {
  //   const projectImgWrap = projectComponent.querySelector('[data-element="project-img-wrap"]');
  //   const projectImg1 = projectComponent.querySelector('[data-element="project-img"]');
  //   const projectImg2 = projectComponent.querySelector('[data-element="project-img-2"]');
  //   projectImgWrap.addEventListener('mouseenter', () => {
  //     gsap.to(projectImg1, {
  //       autoAlpha: 0,
  //     });
  //   });

  //   projectImgWrap.addEventListener('mouseleave', () => {
  //     gsap.to(projectImg1, {
  //       autoAlpha: 1,
  //     });
  //   });
  // });
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

export function createPackagingTabsSlider() {
  const packagingTabsComponent = document.querySelector(
    '[data-element="packaging-tabs-component"]'
  );
  if (!packagingTabsComponent) return;

  const packagingTabButtons = packagingTabsComponent.querySelectorAll(
    '[data-element="tab-button"]'
  );

  const packagingTabPanels = packagingTabsComponent.querySelectorAll('[data-element="tab-panel"]');

  let currentContentIndex = 0;

  function animateContent(newIndex, packagingTabPanels) {
    if (newIndex === currentContentIndex) return;
    if (newIndex < 0 || newIndex >= packagingTabPanels.length) return; // Add bounds check

    // Store current panel and new panel for clarity
    const currentPanel = packagingTabPanels[currentContentIndex];
    const newPanel = packagingTabPanels[newIndex];

    gsap.to(currentPanel, {
      autoAlpha: 0,
      duration: 0.25,
      onComplete: () => {
        currentPanel.style.display = 'none';
        newPanel.style.display = 'block';
        gsap.fromTo(newPanel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
      },
    });

    currentContentIndex = newIndex;
  }

  packagingTabPanels.forEach((panel, index) => {
    const packaginTypesSlider = panel.querySelector('[data-element="packaging-type-slider"]');
    const sliderBtnPrev = packaginTypesSlider.parentElement.querySelector(
      '[data-element="swiper-prev"]'
    );
    const sliderBtnNext = packaginTypesSlider.parentElement.querySelector(
      '[data-element="swiper-next"]'
    );

    if (!packaginTypesSlider) return;

    const swiper = new Swiper(packaginTypesSlider, {
      modules: [Navigation],
      slidesPerView: '5',
      spaceBetween: 12,
      // loop: true,
      rewind: true,
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
      breakpoints: {
        0: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 8 },
        480: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 12 },
        767: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 12 },
        992: { slidesPerGroup: 4 },
        1440: { slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 12 },
      },
    });

    if (index !== 0) {
      gsap.set(panel, { autoAlpha: 0 });
    }
  });

  packagingTabButtons.forEach((button, index) => {
    if (index === 0) {
      button.classList.add('is-selected');
    }

    if (packagingTabPanels[index]) {
      packagingTabPanels[index].style.position = 'absolute';
      packagingTabPanels[index].style.opacity = index === 0 ? 1 : 0;
    }

    button.addEventListener('click', () => {
      // Remove selected class from all options
      packagingTabButtons.forEach((btn) => btn.classList.remove('is-selected'));

      // Add selected class to clicked option
      button.classList.add('is-selected');

      animateContent(index, packagingTabPanels);
    });
  });

  ScrollTrigger.refresh();
}

export function createLogoSlider() {
  const logoSlider = document.querySelector('[data-element="logo-slider"]');

  if (!logoSlider) {
    return;
  }

  const sliderBtnPrev = logoSlider.parentElement.querySelector('[data-element="swiper-prev"]');
  const sliderBtnNext = logoSlider.parentElement.querySelector('[data-element="swiper-next"]');

  const swiper = new Swiper(logoSlider, {
    modules: [Navigation],
    slidesPerView: 2,
    spaceBetween: 64,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
    },
    speed: 500,
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    navigation: {
      prevEl: sliderBtnPrev,
      nextEl: sliderBtnNext,
    },
    breakpoints: {
      0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
      480: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 12 },
    },
  });
}
