/**
 * GHOST LAB — Shop Catalog View
 */

import { getAllProducts, getProductsByCategory } from '../data/products.js';
import { createProductCardHtml } from '../components/product-card.js';

export function renderShopPage(initialCategory = 'all') {
  return `
    <div class="container" style="margin-top: var(--nav-height); padding-top: var(--space-2xl); padding-bottom: var(--space-4xl);">
      <div class="shop-header">
        <span class="section-kicker">ARCHIVE CATALOG</span>
        <h1 class="section-title">The Streetwear Drops</h1>
        <p class="section-desc">Heavyweight silhouettes, drop shoulders, and custom anime embroidery. Crafted in limited quantities.</p>

        <div class="shop-controls">
          <div class="filter-pills" id="shop-category-filters">
            <button class="filter-btn ${initialCategory === 'all' ? 'active' : ''}" data-cat="all">All Drops</button>
            <button class="filter-btn ${initialCategory === 't-shirts' ? 'active' : ''}" data-cat="t-shirts">T-Shirts (280 GSM)</button>
            <button class="filter-btn ${initialCategory === 'hoodies' ? 'active' : ''}" data-cat="hoodies">Hoodies (450 GSM)</button>
            <button class="filter-btn ${initialCategory === 'custom' ? 'active' : ''}" data-cat="custom">Custom 1-of-1</button>
            <button class="filter-btn ${initialCategory === 'new' ? 'active' : ''}" data-cat="new">New Drops</button>
          </div>

          <div class="shop-sort-wrap">
            <span class="shop-counter" id="shop-product-count">Loading...</span>
            <select id="shop-sort-select" aria-label="Sort products">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="product-grid" id="shop-product-grid">
        <!-- Rendered via JS -->
      </div>
    </div>
  `;
}

export function initShopPageHandlers(initialCategory = 'all') {
  let currentCategory = initialCategory;
  let currentSort = 'featured';

  const grid = document.getElementById('shop-product-grid');
  const countEl = document.getElementById('shop-product-count');
  const filterBtns = document.querySelectorAll('#shop-category-filters .filter-btn');
  const sortSelect = document.getElementById('shop-sort-select');

  function updateView() {
    let list = getProductsByCategory(currentCategory);

    // Apply sorting
    if (currentSort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    if (countEl) {
      countEl.textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
    }

    if (grid) {
      if (list.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs);">
            <h3 style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 8px;">No drops found in this category</h3>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Check our custom atelier for personalized 1-of-1 requests.</p>
            <a href="#/custom" class="btn btn-primary btn-sm">Go to Custom Atelier</a>
          </div>
        `;
      } else {
        grid.innerHTML = list.map(p => createProductCardHtml(p)).join('');
      }
    }
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      updateView();
    });
  });

  // Sort changes
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      updateView();
    });
  }

  // Initial render
  updateView();
}
