/**
 * 세종렌터카 - Main Application
 * Static website for car rental service
 */

(function() {
  'use strict';

  // DOM Elements
  const carsContainer = document.getElementById('carsContainer');
  const filterButtons = document.getElementById('filterButtons');
  const loadingEl = document.getElementById('loading');
  const noResultsEl = document.getElementById('noResults');

  // State
  let carsData = [];
  let activeFilter = '전체';

  /**
   * Load car data from YAML file
   */
  async function loadCarsData() {
    try {
      const response = await fetch('data/cars.yaml');
      if (!response.ok) {
        throw new Error('Failed to load car data');
      }
      const yamlText = await response.text();
      const data = jsyaml.load(yamlText);
      return data.cars || [];
    } catch (error) {
      console.error('Error loading cars:', error);
      return [];
    }
  }

  /**
   * Get all unique tags from cars data
   */
  function getAllTags(cars) {
    const tagsSet = new Set();
    cars.forEach(car => {
      car.tags.forEach(tag => tagsSet.add(tag));
    });
    return ['전체', ...Array.from(tagsSet).sort()];
  }

  /**
   * Format price with Korean won
   */
  function formatPrice(price) {
    return price.toLocaleString('ko-KR');
  }

  /**
   * Create car card HTML
   */
  function createCarCard(car) {
    const tagsHtml = car.tags
      .map(tag => `<span class="tag">#${tag}</span>`)
      .join('');

    return `
      <article class="car-card" data-tags="${car.tags.join(',')}">
        <div class="car-image-wrapper">
          <img 
            src="${car.image}" 
            alt="${car.name}" 
            class="car-image"
            loading="lazy"
            onerror="if(this.src!=='${window.location.origin}/images/placeholder.svg'){this.src='images/placeholder.svg';this.onerror=null;}"
          />
        </div>
        <div class="car-content">
          <span class="car-category">${car.category}</span>
          <h3 class="car-name">${car.name}</h3>
          <p class="car-description">${car.description}</p>
          <div class="car-tags">${tagsHtml}</div>
          <div class="car-price">
            <span class="currency">₩</span>${formatPrice(car.price)}
            <span class="unit">/ 일</span>
          </div>
          <button class="btn-contact" onclick="window.location.href='tel:055-962-4321'">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            대여 문의하기
          </button>
        </div>
      </article>
    `;
  }

  /**
   * Create filter button HTML
   */
  function createFilterButton(tag) {
    const isActive = tag === activeFilter;
    return `
      <button 
        class="filter-btn${isActive ? ' active' : ''}" 
        data-filter="${tag}"
        aria-pressed="${isActive}"
      >
        ${tag}
      </button>
    `;
  }

  /**
   * Render filter buttons
   */
  function renderFilters(tags) {
    filterButtons.innerHTML = tags.map(createFilterButton).join('');
    
    // Add click event listeners
    filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });
  }

  /**
   * Render car cards
   */
  function renderCars(cars) {
    if (cars.length === 0) {
      carsContainer.innerHTML = '';
      noResultsEl.style.display = 'block';
      return;
    }

    noResultsEl.style.display = 'none';
    carsContainer.innerHTML = cars.map(createCarCard).join('');
  }

  /**
   * Filter cars by tag
   */
  function filterCars(tag) {
    if (tag === '전체') {
      return carsData;
    }
    return carsData.filter(car => car.tags.includes(tag));
  }

  /**
   * Handle filter button click
   */
  function handleFilterClick(event) {
    const selectedTag = event.target.dataset.filter;
    
    if (selectedTag === activeFilter) return;

    // Update active state
    activeFilter = selectedTag;
    
    // Update button styles
    filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
      const isActive = btn.dataset.filter === activeFilter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    // Filter and render cars
    const filteredCars = filterCars(activeFilter);
    renderCars(filteredCars);
  }

  /**
   * Hide loading state
   */
  function hideLoading() {
    loadingEl.classList.add('hidden');
  }

  /**
   * Show loading state
   */
  function showLoading() {
    loadingEl.classList.remove('hidden');
  }

  /**
   * Initialize the application
   */
  async function init() {
    showLoading();

    // Load car data
    carsData = await loadCarsData();

    if (carsData.length === 0) {
      hideLoading();
      noResultsEl.innerHTML = '<p>차량 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.</p>';
      noResultsEl.style.display = 'block';
      return;
    }

    // Get all tags and render filters
    const tags = getAllTags(carsData);
    renderFilters(tags);

    // Render all cars
    renderCars(carsData);

    // Hide loading
    hideLoading();
  }

  // Start the application when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
