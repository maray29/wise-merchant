import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function animatePinnedSection() {
  gsap.registerPlugin(ScrollTrigger);

  const trigger = document.querySelector('[data-element="nav"]');
  const panel = document.querySelector('[data-element="pinned-section"]');
  const panelParent = document.querySelector('[data-element="pinned-section-parent"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'clamp(top top)',
      end: '+=2400px',
      scrub: 0.1,
      // markers: true,
    },
  });

  tl.to(
    panelParent,
    {
      scale: 0.85,
      yPercent: 50,
      autoAlpha: 0,
    },
    0
  );
}

export function animateIconDivider() {
  gsap.registerPlugin(ScrollTrigger);

  const iconDivider = document.querySelector('[data-element="icon-divider"]');

  if (!iconDivider) return;

  const distance = iconDivider.scrollWidth - window.innerWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: iconDivider,
      start: 'top bottom',
      end: '+=5000px',
      scrub: true,
      // pin: true,
      // markers: true,
    },
  });

  tl.to(iconDivider, {
    x: -distance,
  });
}

export function animateMerchIcons() {
  gsap.registerPlugin(ScrollTrigger);

  const merchListWrap = document.querySelector('[data-element="merch-list-wrap"]');

  if (!merchListWrap) return;

  const distance = merchListWrap.scrollWidth - window.innerWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: merchListWrap,
      start: 'top bottom',
      end: '+=5000px',
      scrub: true,
      // pin: true,
      // markers: true,
    },
  });

  tl.to(merchListWrap, {
    x: -500,
  });
}

export function animateProcessTabs() {
  const processComponent = document.querySelector('.process_component');
  const tabButtons = document.querySelectorAll('.process_component .tab-button_component');
  let activeTabButton = tabButtons[0]; // Set the initial active tab
  const tabPanels = document.querySelectorAll('.process_component .tab_panel');

  if (!processComponent) return;

  tabButtons.forEach((button, index) => {
    if (index !== 0) {
      const buttonDivider = button.querySelector('.tab-button_divider');
      if (!buttonDivider) return;
      const buttonArrow = button.querySelector('.tab-button_arrow');
      const buttonText = button.querySelector('.tab-button_heading');
      gsap.set(buttonDivider, { width: 0 });
      gsap.set(buttonArrow, {
        xPercent: -100,
        autoAlpha: 0,
      });
      gsap.set(buttonText, {
        x: -24,
      });
    }
  });

  gsap.set(tabPanels, { opacity: 0 });
  gsap.set(tabPanels[0], { opacity: 1 });

  const toggleTabPanel = (tabButton, tabPanel) => {
    if (tabButton === activeTabButton) return; // Skip if the tab is already active

    const tabButtonArrow = tabButton.querySelector('.tab-button_arrow');
    const tabButtonText = tabButton.querySelector('.tab-button_heading');
    const tabButtonDivider = tabButton.querySelector('.tab-button_divider');

    // Reset buttons
    tabButtons.forEach((button) => {
      const buttonDivider = button.querySelector('.tab-button_divider');
      const buttonArrow = button.querySelector('.tab-button_arrow');
      const buttonText = button.querySelector('.tab-button_heading');
      gsap.to(buttonDivider, { width: 0 });
      gsap.to(buttonArrow, {
        xPercent: -100,
        autoAlpha: 0,
      });
      gsap.to(buttonText, {
        x: -24,
      });
    });

    const tl = gsap.timeline();

    tl.to(tabButtonArrow, {
      xPercent: 0,
      autoAlpha: 1,
    })
      .to(
        tabButtonText,
        {
          x: 0,
        },
        '<'
      )
      .to(
        tabButtonDivider,
        {
          width: '100%',
        },
        '<'
      );

    // Animate panels
    gsap.to(tabPanels, { autoAlpha: 0, duration: 0.25 });
    gsap.to(tabPanel, { autoAlpha: 1, duration: 0.35 });
    gsap.from(tabPanel.children, {
      autoAlpha: 0,
      stagger: 0.1,
      y: 10,
      duration: 0.35,
    });

    // Update the active tab button
    activeTabButton = tabButton;
    ScrollTrigger.refresh();
  };

  tabButtons.forEach((button) => {
    button.addEventListener('mouseenter', function (e) {
      const targetData = e.currentTarget.getAttribute('data-target');
      const targetPanel = Array.from(tabPanels).find(
        (panel) => panel.getAttribute('data-panel') === targetData
      );

      if (targetPanel) {
        toggleTabPanel(button, targetPanel);
      }
    });
  });
}

export function animateFAQ() {
  // Accordion

  const accordions = document.querySelectorAll('[data-element="faq-list"]');

  if (!accordions) return;
  accordions.forEach((accordion) => {
    const accordionItems = [...accordion.querySelectorAll('.accordion1_item')];

    // on page load close every item but the first
    accordionItems.forEach((item, index) => {
      const accordionPanel = item.querySelector('.accordion1_panel');
      const arrow = item.querySelector('svg');

      gsap.set(accordionPanel, {
        height: 0,
      });
      gsap.to(arrow, {
        rotate: -90,
      });

      item.addEventListener('click', () => {
        console.log('click');
        accordionItems.forEach((el) => {
          const accordionPanel = el.querySelector('.accordion1_panel');
          const text = el.querySelector('.accordion1_panel .text-rich-text');
          const arrow = el.querySelector('svg');

          const duration = 0.35;

          // If the clicked item is not the current element, close it.
          if (item !== el) {
            gsap.to(accordionPanel, {
              height: '0px',
              duration: duration,
            });
            gsap.to(text, {
              y: 0,
              autoAlpha: 1,
              duration: duration,
            });
            gsap.to(arrow, {
              rotate: -90,
              duration: duration,
            });
          } else {
            // If the clicked item is the current element and it's open (height is not 0), close it.
            if (accordionPanel.clientHeight !== 0) {
              gsap.to(accordionPanel, {
                height: '0px',
                duration: duration,
              });
              gsap.to(text, {
                y: 0,
                autoAlpha: 1,
                duration: duration,
              });
              gsap.to(arrow, {
                rotate: -90,
                duration: duration,
              });
            } else {
              // If it's closed, open it.
              gsap.to(accordionPanel, {
                height: 'auto',
                duration: duration,
              });
              gsap.from(text, {
                y: 0,
                autoAlpha: 0,
                duration: duration,
              });
              gsap.to(arrow, {
                rotate: 0,
                duration: duration,
              });
            }
          }
        });
      });
    });
  });

  ScrollTrigger.refresh();
}

export function animateHeaderHeading() {
  const headerHeading = document.querySelector('[data-element="header-heading"]');

  if (!headerHeading) {
    gsap.to('.page-wrapper', {
      autoAlpha: 1,
    });
    return;
  }

  const headerHeadingElements = Array.from(
    headerHeading.querySelectorAll('.packaging-header_heading-line > *')
  );
  const headerIcon = headerHeading.querySelector('.packaging-header_icon');
  const headerBarcodeImg = headerHeading.querySelector('.packaging-header_barcode-img');
  const headerBarcodeLines = headerBarcodeImg.querySelectorAll('svg path');
  const underlines = headerHeading.querySelectorAll('.underline');

  const filteredHeaderHeadingElements = headerHeadingElements.filter(
    (element) => element !== headerBarcodeImg
  );

  const text = new SplitType(filteredHeaderHeadingElements, { types: 'chars' });

  // Split heading into lines.
  window.addEventListener('resize', () => {
    if (window.outerWidth !== windowWidth) {
      text.revert();
      location.reload();
    }
    windowWidth = window.outerWidth;
  });

  const tl = gsap.timeline({ delay: 1 });

  tl.set(text.chars, {
    autoAlpha: 0,
  });

  tl.set(underlines, {
    width: 0,
  });

  tl.to('.page-wrapper', {
    autoAlpha: 1,
  });

  tl.from(
    text.chars,
    {
      yPercent: 120,
      autoAlpha: 0,
      stagger: 0.02,
      duration: 0.75,
      ease: 'power1.out',
    },
    '<'
  );

  tl.from(
    headerIcon,
    {
      yPercent: 120,
      autoAlpha: 0,
      duration: 0.75,
      ease: 'power1.out',
      delay: 0.35,
    },
    '<'
  );

  tl.to(
    underlines,
    {
      width: '100%',
      stagger: 0.1,
      duration: 1,
    },
    '<0.75'
  );

  tl.from(
    headerBarcodeLines,
    {
      autoAlpha: 0,
      xPercent: -150,
      stagger: 0.0025,
    },
    '<0.75'
  );

  // headerHeadingLines.forEach((line) => {
  //   const elements = line.children;

  //   const text = new SplitType(line, { types: 'words' });

  //   // Split heading into lines.
  //   window.addEventListener('resize', () => {
  //     if (window.outerWidth !== windowWidth) {
  //       text.revert();
  //       location.reload();
  //     }
  //     windowWidth = window.outerWidth;
  //   });

  //   tl.set(line.children, {
  //     autoAlpha: 0,
  //   });

  //   tl.set(underlines, {
  //     width: 0,
  //   });

  //   tl.from(
  //     line.children,
  //     {
  //       yPercent: 100,
  //       autoAlpha: 0,
  //       stagger: 0.05,
  //       duration: 0.75,
  //     },
  //     '<'
  //   );
  // });
}

export function animateNav() {
  gsap.registerPlugin(ScrollTrigger);

  const nav = document.querySelector('[data-element="nav"]');
  const navLogo = document.querySelector('[data-element="nav-logo"]');
  const navBg = document.querySelector('[data-element="nav-bg"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: nav,
      start: 'clamp(top top)',
      end: '+=200px',
      scrub: true,
    },
  });

  tl.to(navLogo, {
    width: '10rem',
    willChange: 'width',
  })
    .to(
      nav,
      {
        height: '4.5rem',
        willChange: 'height',
      },
      '<'
    )
    .to(navBg, {
      opacity: 1,
      duration: 1,
    });
}
