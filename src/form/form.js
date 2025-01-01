import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function createFormSubmissions() {
  gsap.registerPlugin(ScrollToPlugin);
  // Define hCaptcha widgets
  const widgetId = hcaptcha.render('h-captcha-1', {
    sitekey: '3168bd54-86e4-4ac8-9322-9f8cad701b88',
    size: 'invisible',
  });

  // FormData to JSON string
  function formDataToJson(formData) {
    const object = {};
    formData.forEach((value, key) => {
      // Exclude hCaptcha response key from form data
      // if (key === "g-recaptcha-response") return;

      if (!Reflect.has(object, key)) {
        object[key] = value;
        return;
      }
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      object[key].push(value);
    });
    return JSON.stringify(object);
  }

  // Form submission handler
  function handleFormSubmit(e, form, widgetId) {
    e.preventDefault();

    hcaptcha
      .execute(widgetId, { async: true })
      .then(({ response, key }) => {
        // console.log(response, key);
        const action = form.getAttribute('action');
        const data = new FormData(form);
        const jsonData = formDataToJson(data);

        fetch(action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: jsonData,
        })
          .then((response) => response.json())
          .then(() => {
            const parent = form.parentElement;
            parent.querySelector('form').style.display = 'none';
            parent.querySelector('.w-form-done').style.display = 'block';

            let formSection = form.closest('section');

            ScrollTrigger.refresh();

            gsap.to(window, {
              duration: 1.5,
              scrollTo: {
                y: formSection,
                offsetY: 80,
              },
              ease: 'power2.inOut',
              overwrite: 'auto',
            });
          })
          .catch(() => {
            form.parentElement.querySelector('.w-form-fail').style.display = 'block';
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Initialize form handling
  const requestForm = document.querySelector('.request-form_form');
  // Checkbox validation
  const checkboxes = requestForm.querySelectorAll('#form-checkboxes input[type="checkbox"]');

  console.log(checkboxes);

  if (!requestForm) {
    return;
  }

  requestForm.addEventListener('submit', (e) => {
    if (checkboxes.length > 0) {
      if (areCheckboxesValid()) {
        handleFormSubmit(e, requestForm, widgetId);
      }
    } else {
      handleFormSubmit(e, requestForm, widgetId);
    }
  });

  function areCheckboxesValid() {
    const checkedCount = Array.from(checkboxes).filter((cb) => cb.checked).length;
    if (checkedCount === 0) {
      checkboxes[0].setCustomValidity('Please check at least one checkbox.');
      requestForm.reportValidity();
      return false;
    }
    checkboxes[0].setCustomValidity('');
    return true;
  }

  if (checkboxes.length > 0) {
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        checkboxes[0].setCustomValidity('');
      });
    });
  }
}

export function waitForHcaptchaAndRun() {
  if (window.hcaptcha) {
    createFormSubmissions();
  } else {
    setTimeout(waitForHcaptchaAndRun, 100);
  }
}
