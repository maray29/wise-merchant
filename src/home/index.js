import SplineLoader from '@splinetool/loader';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
  animateFAQ,
  animateHeaderHeading,
  animateIconDivider,
  animatePinnedSection,
  animateProcessTabs,
} from '$animation/animation.js';
import { createPackagingProjectsSlider } from '$sliders/sliders.js';
import scroll from '$utils/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  let lenis;
  lenis = scroll();

  animateHeaderHeading();
  createPackagingProjectsSlider();
  animatePinnedSection();
  animateIconDivider();
  animateProcessTabs();
  animateFAQ();
});

// scene
const scene = new THREE.Scene();

// spline scene
const loader = new SplineLoader();
loader.load('https://prod.spline.design/pPoPblCfwPLTPNhl/scene.splinecode', (splineScene) => {
  scene.add(splineScene);
  animateObjects(splineScene);
  //   const pouch = scene.getObjectByName('pouch');
  //   camera.lookAt(pouch.position);
  //   camera.rotation.set(0, 0, 0);
  //   camera.updateProjectionMatrix();
});

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const canvasWrap = document.querySelector('.canvas-wrap');
renderer.setSize(canvasWrap.clientWidth, canvasWrap.clientHeight);
canvasWrap.appendChild(renderer.domElement);

function calculateFrustumSize(width) {
  // This factor determines how much of the width the frustum should cover
  const coverageFactor = 800 / 1920; // Adjust this value as needed
  return width * coverageFactor;
}

// camera
const aspect = canvasWrap.clientWidth / canvasWrap.clientHeight;
// const frustumSize = 750;
const frustumSize = calculateFrustumSize(canvasWrap.clientWidth);
const camera = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  -100000,
  100000
);
camera.position.set(640.0, 300, 1017.96);
camera.zoom = 0.65;
camera.updateProjectionMatrix();

// renderer.setAnimationLoop(animate);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// scene.background = new THREE.Color('#ffedd4');
renderer.setClearAlpha(0);

// orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.125;
// controls.target.set(0, 0, 0);

function onWindowResize() {
  const width = canvasWrap.clientWidth;
  const height = canvasWrap.clientHeight;
  const aspect = width / height;
  const frustumSize = calculateFrustumSize(width);

  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;

  // Adjust zoom based on frustum size
  const baseFrustumSize = calculateFrustumSize(width);
  camera.zoom = (baseFrustumSize / frustumSize) * 0.65; // 0.65 is your initial zoom
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

const resizeObserver = new ResizeObserver(() => {
  onWindowResize();
});
resizeObserver.observe(canvasWrap);

function animate(time) {
  //   controls.update();
  // renderer.render(scene, camera);
}

gsap.ticker.add(() => {
  renderer.render(scene, camera);
});

function animateObjects(splineScene) {
  const jar = splineScene.getObjectByName('jar');
  const tinCan = splineScene.getObjectByName('tin-can');
  const vape = splineScene.getObjectByName('vape');
  const pouch = splineScene.getObjectByName('pouch');
  const drinkCan = splineScene.getObjectByName('drink-can');

  const objects = [jar, drinkCan, pouch, vape, tinCan];

  objects.forEach((obj, index) => {
    if (obj) {
      // console.log(obj);
      // Calculate the bounding box center
      const boundingBox = new THREE.Box3().setFromObject(obj);
      const center = boundingBox.getCenter(new THREE.Vector3());

      // Move the object so that the bounding box center is at the origin
      obj.position.sub(center);

      // Create a pivot point object at the original center
      const pivot = new THREE.Object3D();
      pivot.position.copy(center);
      splineScene.add(pivot);

      // Attach the object to the pivot point
      pivot.add(obj);

      // Store the original scale
      const originalScale = obj.scale.clone();

      // Set initial scale to 0
      obj.scale.set(0, 0, 0);

      // Intro animation: 360-degree rotation and scale up
      const introTl = gsap.timeline({
        delay: (index + 1) * 0.05,
        // delay: 0,
        onComplete: () => {
          // Start the animation
          startAnimation();
        },
      });

      introTl.to(
        pivot.rotation,
        {
          y: Math.PI * 2, // Full 360-degree rotation
          duration: 3, // Duration of the rotation
          ease: 'power2.out', // Smooth easing for a more natural rotation
        },
        0
      ); // Start at the beginning of the timeline

      introTl.to(
        obj.scale,
        {
          x: originalScale.x,
          y: originalScale.y,
          z: originalScale.z,
          duration: 1.5, // Duration of the scale animation
          ease: 'power2.out', // Overshoot effect for a more dynamic scale
        },
        0.5
      );

      // introTl.from(
      //   obj.position,
      //   {
      //     y: `-=${300}`,
      //     duration: 1.5,
      //     ease: 'power2.out',
      //   },
      //   0.5
      // );

      // const animationDuration = 2 + (index + 1) * 2;
      const animationDuration = 4;

      const objName = obj.name;
      const bodyName = `${objName}-body`;

      // Store the original NodeMaterial
      const objBody = obj.getObjectByName(bodyName);

      // if (!objBody) return;
      const originalMaterial = objBody.material;

      let mainTimeline;
      let currentRotation = { x: 0, y: 0, z: 0 };
      const delay = (index + 0.25) * 0.25;

      function createAmbientAnimation() {
        const tl = gsap.timeline({ delay: delay });

        tl.to(
          pivot.position,
          {
            y: '+=50',
            x: '+=15',
            z: '+=15',
            duration: animationDuration / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3,
          },
          0
        );

        tl.to(
          currentRotation,
          {
            // y: '+=0.5',
            x: '+=0.1',
            z: '+=0.1',
            duration: animationDuration / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3,
            onUpdate: () => {
              pivot.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
            },
          },
          0
        );

        tl.to(
          obj.scale,
          {
            x: originalScale.x * 1.02,
            y: originalScale.y * 1.02,
            z: originalScale.z * 1.02,
            duration: animationDuration / 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3,
          },
          0
        );

        return tl;
      }

      function createTurnaroundAnimation() {
        return gsap.timeline().to(currentRotation, {
          y: `+=${Math.PI * 2}`,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            pivot.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
          },
        });
      }

      let isFirstCycle = true;

      function changeAppearance() {
        if (objBody) {
          const tl = gsap.timeline();
          const { layers } = originalMaterial[0];
          layers.forEach((layer) => {
            // if (layer.data.type === 'color') {
            //   gsap.to(layer.color.color.value, {
            //     r: Math.random(),
            //     g: Math.random(),
            //     b: Math.random(),
            //     duration: 2,
            //     ease: 'power2.inOut',
            //     onUpdate: () => {
            //       originalMaterial.needsUpdate = true;
            //     },
            //   });
            // }

            if (layer.data.type === 'texture') {
              // console.log(layer);
              if (isFirstCycle) {
                // First cycle: animate from 0 to 1
                tl.to(layer.params.alpha, {
                  value: 1,
                  delay: animationDuration / 4,
                  ease: 'power2.inOut',
                  onUpdate: () => {
                    originalMaterial.needsUpdate = true;
                  },
                  onComplete: () => {
                    isFirstCycle = false;
                  },
                });
              } else {
                // Second cycle: animate from 1 to 0
                tl.to(layer.params.alpha, {
                  value: 0,
                  duration: 2,
                  ease: 'power2.inOut',
                  onUpdate: () => {
                    originalMaterial.needsUpdate = true;
                  },
                  onComplete: () => {
                    isFirstCycle = true;
                  },
                });
              }
            }
          });
        }
      }

      function startAnimation() {
        mainTimeline = gsap.timeline({ repeat: -1 });
        mainTimeline.add(createAmbientAnimation());
        mainTimeline.add(() => {
          createTurnaroundAnimation();
          changeAppearance();
        });
      }
    }
  });
}
