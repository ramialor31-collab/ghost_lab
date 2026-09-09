/**
 * GHOST LAB — Reusable Product Card Component
 */

import { formatPrice } from '../data/products.js';

export function createProductCardHtml(product) {
  const isAvailable = product.available !== false && product.inStock !== false;
  const primaryImg = (product.images && product.images[0]) || 'assets/images/products/tee_cyber_samurai_back.jpg';
  const secondaryImg = (product.images && product.images[1]) || primaryImg;

  let badgeHtml = '';
  if (!isAvailable) {
    badgeHtml = `<div class="product-badge-pos"><span class="badge badge-out-of-stock">OUT OF STOCK</span></div>`;
  } else if (product.badge) {
    let badgeClass = 'badge';
    if (product.badgeType === 'new') badgeClass += ' badge-new';
    else if (product.badgeType === 'limited') badgeClass += ' badge-limited';
    else badgeClass += ' badge-oversized';
    badgeHtml = `<div class="product-badge-pos"><span class="${badgeClass}">${product.badge}</span></div>`;
  }

  const statusHtml = isAvailable
    ? `<span class="product-status">Ready to ship</span>`
    : `<span class="product-status product-status-out">Out of stock</span>`;

  const quickViewText = isAvailable ? 'View Details & Order' : 'View Drop (Sold Out)';

  return `
    <a href="#/product/${product.id}" class="product-card ${isAvailable ? '' : 'product-card-soldout'}" data-product-id="${product.id}" aria-label="${product.name} ${isAvailable ? '' : '(Out of stock)'}">
      <div class="product-media">
        ${badgeHtml}
        <img src="${primaryImg}" alt="${product.name}" class="product-img" loading="lazy">
        <img src="${secondaryImg}" alt="${product.name} Alternate" class="product-img-secondary" loading="lazy">
        <div class="product-quick-view">
          <span>${quickViewText}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category.replace('-', ' ')} • ${product.fabricWeight ? product.fabricWeight.split(' ')[0] : '280G'}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(product.price)}</span>
          ${statusHtml}
        </div>
      </div>
    </a>
  `;
}
