import { animateNav, animatePageIntro } from '$animation/animation.js';
import { waitForHcaptchaAndRun } from '$form/form.js';
import scroll from '$utils/scroll.js';

// Function to group packaging items by category
function groupPackagingItems() {
  // Get all packaging items
  const packagingItems = document.querySelectorAll('[data-element="packaging-item"]');

  // Create a map to store items by category
  const categoryMap = new Map();

  // Group items by their packaging types
  packagingItems.forEach((item) => {
    const typeElements = item.querySelectorAll('[data-element="packaging-type"]');

    // Clone the item for each type it belongs to
    typeElements.forEach((typeElement) => {
      const category = typeElement.textContent.trim();

      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }

      // If item has multiple types, clone it for additional categories
      const itemForCategory = typeElements.length > 1 ? item.cloneNode(true) : item;

      // Update checkbox and option attributes
      const checkbox = itemForCategory.querySelector('[data-element="product-checkbox"]');
      const option = itemForCategory.querySelector('[data-element="product-option"]');

      if (checkbox && checkbox.hasAttribute('data-name')) {
        const dataName = checkbox.getAttribute('data-name');
        const newId = `${category.toLowerCase()}-${dataName}`.replace(/\s+/g, '-');

        checkbox.id = newId;
        checkbox.value = newId;

        if (option) {
          option.setAttribute('for', newId);
        }
      }

      categoryMap.get(category).push(itemForCategory);
    });

    // If the item has multiple types, remove the original from the DOM
    // (since we've created clones for each category)
    if (typeElements.length > 1) {
      item.remove();
    }
  });

  // Create container for grouped items
  const container = document.createElement('div');
  container.className = 'packaging-groups';

  // Insert the container at the appropriate position
  const firstItem = document.querySelector('[data-element="packaging-item"]');
  if (firstItem) {
    firstItem.parentNode.insertBefore(container, firstItem);
  }

  // Sort categories alphabetically and create groups with headers
  const sortedCategories = Array.from(categoryMap.keys()).sort();
  sortedCategories.forEach((category) => {
    const items = categoryMap.get(category);
    // Create group container
    const groupDiv = document.createElement('div');
    groupDiv.className = 'packaging-group';

    // Create and add header
    const header = document.createElement('h2');
    header.textContent = category;
    header.className = 'packaging-category-header';
    groupDiv.appendChild(header);

    // Create wrapper for items
    const itemsWrapper = document.createElement('div');
    itemsWrapper.className = 'packaging_list is-form';

    // Move items into wrapper
    items.forEach((item) => {
      itemsWrapper.appendChild(item);
    });

    // Add wrapper to group
    groupDiv.appendChild(itemsWrapper);

    // Add group to container
    container.appendChild(groupDiv);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  animateNav();
  animatePageIntro();
  waitForHcaptchaAndRun();
  groupPackagingItems();

  let lenis;
  lenis = scroll();
});
