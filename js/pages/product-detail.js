/**
 * GHOST LAB — Product Detail Page View & Order Logic
 */

import { getProductById, getRelatedProducts, formatPrice, buildWhatsAppOrderUrl } from '../data/products.js';
import { createProductCardHtml } from '../components/product-card.js';
import { openSizeModal } from '../components/size-modal.js';
import { showToast } from '../components/toast.js';

export function renderProductDetailPage(productId) {
  const product = getProductById(productId);

  if (!product) {
    return `
      <div class="container" style="margin-top: calc(var(--nav-height) + 60px); padding: 80px 20px; text-align: center;">
        <h1 style="font-size: 2rem; margin-bottom: 12px;">Drop Not Found</h1>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The selected streetwear piece may have sold out or moved.</p>
        <a href="#/shop" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
  }

  const isAvailable = product.available !== false && product.inStock !== false;
  const related = getRelatedProducts(product.id, 3);
  const relatedHtml = related.map(p => createProductCardHtml(p)).join('');

  const primaryImg = product.images[0] || 'assets/images/products/tee_cyber_samurai_back.jpg';

  let badgeHtml = '';
  if (!isAvailable) {
    badgeHtml = `<div class="product-badge-pos"><span class="badge badge-out-of-stock">OUT OF STOCK</span></div>`;
  } else if (product.badge) {
    badgeHtml = `<div class="product-badge-pos"><span class="badge badge-${product.badgeType}">${product.badge}</span></div>`;
  }

  const thumbsHtml = product.images.map((img, idx) => `
    <button class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" data-img-src="${img}" aria-label="View product image ${idx + 1}">
      <img src="${img}" alt="${product.name} angle ${idx + 1}" loading="lazy">
    </button>
  `).join('');

  const sizesHtml = product.sizes.map((s, idx) => `
    <button class="size-btn ${idx === 0 ? 'active' : ''}" data-size="${s}" aria-label="Select size ${s}">${s}</button>
  `).join('');

  const colorsHtml = product.colors.map((c, idx) => `
    <button class="color-chip ${idx === 0 ? 'active' : ''}" data-color="${c.name}" aria-label="Select color ${c.name}">
      <span class="color-dot" style="background-color: ${c.hex};"></span>
      <span>${c.name}</span>
    </button>
  `).join('');

  const detailsList = product.details.map(d => `<li>${d}</li>`).join('');
  const careList = product.care.map(c => `<li>${c}</li>`).join('');

  return `
    <div class="container" style="margin-top: var(--nav-height); padding-top: var(--space-xl);">
      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); margin-bottom: var(--space-md); text-transform: uppercase; letter-spacing: 0.08em;">
        <a href="#/">Home</a> / <a href="#/shop">Shop</a> / <span style="color: var(--text-primary);">${product.name}</span>
      </nav>

      <div class="product-detail-layout">
        <!-- Image Gallery Column -->
        <div class="product-gallery">
          <div class="main-gallery-view">
            <img id="detail-main-img" src="${primaryImg}" alt="${product.name}" class="main-gallery-img">
            ${badgeHtml}
          </div>
          <div class="gallery-thumbs" id="detail-thumbs-container">
            ${thumbsHtml}
          </div>
        </div>

        <!-- Product Purchase Panel -->
        <div class="product-order-panel">
          <div class="product-main-meta">
            <span class="product-category">${product.category.replace('-', ' ')} • ${product.fabricWeight}</span>
            <h1 class="product-title-detail">${product.name}</h1>
            <div class="product-price-detail">
              <span>${formatPrice(product.price)}</span>
              <span class="tax-note">(Taxes incl. • Cash on delivery)</span>
            </div>
            <div class="product-status ${isAvailable ? '' : 'product-status-out'}" style="margin-top: 8px;">
              ${isAvailable ? 'In Stock — Delivery across 58 Wilayas (24h - 72h)' : 'Out of Stock — Drop Currently Unavailable'}
            </div>
          </div>

          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
            ${product.description}
          </p>

          <!-- SIZES -->
          <div class="selector-group">
            <div class="selector-label-row">
              <span class="selector-label">Select Size: <strong id="selected-size-display" style="color: var(--accent-white);">${product.sizes[0]}</strong></span>
              <button class="size-guide-trigger" id="detail-size-guide-btn" type="button">Size Guide (CM)</button>
            </div>
            <div class="size-options" id="detail-size-options">
              ${sizesHtml}
            </div>
          </div>

          <!-- COLORS -->
          <div class="selector-group">
            <div class="selector-label-row">
              <span class="selector-label">Color: <strong id="selected-color-display" style="color: var(--accent-white);">${product.colors[0].name}</strong></span>
            </div>
            <div class="color-options" id="detail-color-options">
              ${colorsHtml}
            </div>
          </div>

          <!-- QUANTITY & ACTIONS -->
          <div class="selector-group">
            <span class="selector-label">Quantity:</span>
            <div style="display: flex; gap: var(--space-md); align-items: center;">
              <div class="qty-stepper">
                <button class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
                <input type="number" id="qty-input" class="qty-input" value="1" min="1" max="10" readonly aria-label="Selected quantity">
                <button class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
              </div>

              <button class="btn btn-secondary btn-sm" id="share-product-btn" title="Copy product link" type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Share Link
              </button>
            </div>
          </div>

          <!-- LIVE WHATSAPP ORDER PREVIEW -->
          <div class="whatsapp-preview-box">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; font-weight: 700; color: #34d399;">
              <span>WHATSAPP PRE-FILLED MESSAGE</span>
              <span>ATELIER: 0676870535</span>
            </div>
            <div id="whatsapp-live-preview-text" style="white-space: pre-line;"></div>
          </div>

          <!-- ORDER BUTTON -->
          ${isAvailable ? `
          <a id="detail-whatsapp-order-btn" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg btn-full" style="font-size: 1.05rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.777.788 2.796.788 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.587-5.774-5.768-5.774zm3.376 8.219c-.14.394-.712.723-1.002.766-.279.043-.637.086-2.029-.485-1.782-.732-2.92-2.55-3.009-2.669-.089-.118-.72-1.026-.72-1.956 0-.931.488-1.388.663-1.581.176-.192.383-.24.512-.24.129 0 .258.006.371.012.119.006.279-.044.436.333.159.382.544 1.325.592 1.423.048.098.079.213.016.339-.063.125-.095.203-.189.314-.094.111-.198.247-.282.332-.095.095-.195.198-.083.39.111.192.495.817 1.06 1.32 1.064.945 1.71 1.134 1.952 1.254.242.12.383.104.526-.06.143-.164.615-.717.779-.962.164-.245.328-.205.552-.122.224.082 1.423.67 1.668.792.245.122.408.183.468.286.06.104.06.602-.08 1.002z"/>
            </svg>
            Order via WhatsApp Now
          </a>
          ` : `
          <button id="detail-whatsapp-order-btn" disabled class="btn btn-secondary btn-lg btn-full" style="font-size: 1.05rem; opacity: 0.65; cursor: not-allowed;">
            Drop Currently Sold Out
          </button>
          <div style="margin-top: 12px; text-align: center;">
            <a href="#/custom" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); text-decoration: underline;">
              Request a 1-of-1 custom atelier reproduction →
            </a>
          </div>
          `}

          <!-- SPECS ACCORDION -->
          <div class="accordion-group">
            <div class="accordion-item open">
              <button class="accordion-trigger" type="button">
                <span>Garment Specifications & Cut</span>
                <span class="accordion-icon">+</span>
              </button>
              <div class="accordion-content">
                <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px;">
                  ${detailsList}
                </ul>
              </div>
            </div>

            <div class="accordion-item">
              <button class="accordion-trigger" type="button">
                <span>Washing & Care Instructions</span>
                <span class="accordion-icon">+</span>
              </button>
              <div class="accordion-content">
                <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 6px;">
                  ${careList}
                </ul>
              </div>
            </div>

            <div class="accordion-item">
              <button class="accordion-trigger" type="button">
                <span>Delivery (Livraison 58 Wilayas)</span>
                <span class="accordion-icon">+</span>
              </button>
              <div class="accordion-content">
                <p>Delivery is provided across all 58 Wilayas in Algeria via express courier:</p>
                <ul style="padding-left: 20px; margin-top: 6px; display: flex; flex-direction: column; gap: 4px;">
                  <li>Algiers & surrounding wilayas: 24 to 48 hours</li>
                  <li>Other northern & eastern/western wilayas: 48 to 72 hours</li>
                  <li>Southern wilayas: 3 to 5 business days</li>
                  <li><strong>Paiement à la livraison (Cash On Delivery)</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RELATED PRODUCTS -->
      <section class="section" style="padding-top: var(--space-2xl); border-top: 1px solid var(--border-subtle);">
        <div class="section-title-wrap">
          <span class="section-kicker">CURATED SELECTION</span>
          <h2 class="section-title">Complete The Look</h2>
        </div>
        <div class="product-grid">
          ${relatedHtml}
        </div>
      </section>
    </div>
  `;
}

export function initProductDetailHandlers(productId) {
  const product = getProductById(productId);
  if (!product) return;

  let selectedSize = product.sizes[0];
  let selectedColor = product.colors[0].name;
  let quantity = 1;

  const mainImg = document.getElementById('detail-main-img');
  const thumbBtns = document.querySelectorAll('.gallery-thumb-btn');
  const sizeBtns = document.querySelectorAll('#detail-size-options .size-btn');
  const colorBtns = document.querySelectorAll('#detail-color-options .color-chip');
  const sizeDisplay = document.getElementById('selected-size-display');
  const colorDisplay = document.getElementById('selected-color-display');
  const qtyInput = document.getElementById('qty-input');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const orderBtn = document.getElementById('detail-whatsapp-order-btn');
  const previewText = document.getElementById('whatsapp-live-preview-text');
  const sizeGuideBtn = document.getElementById('detail-size-guide-btn');
  const shareBtn = document.getElementById('share-product-btn');

  // Accordion toggles
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });

  // Size guide trigger
  if (sizeGuideBtn) {
    sizeGuideBtn.addEventListener('click', () => openSizeModal());
  }

  // Gallery thumbnail click
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const src = btn.getAttribute('data-img-src');
      if (mainImg && src) {
        mainImg.src = src;
      }
    });
  });

  // Size click
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.getAttribute('data-size');
      if (sizeDisplay) sizeDisplay.textContent = selectedSize;
      syncWhatsAppUrl();
    });
  });

  // Color click
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor = btn.getAttribute('data-color');
      if (colorDisplay) colorDisplay.textContent = selectedColor;
      syncWhatsAppUrl();
    });
  });

  // Quantity changes
  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        if (qtyInput) qtyInput.value = quantity;
        syncWhatsAppUrl();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      if (quantity < 10) {
        quantity++;
        if (qtyInput) qtyInput.value = quantity;
        syncWhatsAppUrl();
      }
    });
  }

  // Update WhatsApp URL and preview
  function syncWhatsAppUrl() {
    const isAvailable = product.available !== false && product.inStock !== false;
    if (!isAvailable) {
      if (previewText) {
        previewText.textContent = `Drop #${product.id} (${product.name}) is currently out of stock.\nYou can request a 1-of-1 reproduction via our Custom Atelier.`;
      }
      return;
    }
    const url = buildWhatsAppOrderUrl(product.name, selectedSize, selectedColor, quantity, product.price);
    if (orderBtn && orderBtn.tagName === 'A') {
      orderBtn.href = url;
    }
    if (previewText) {
      previewText.textContent = 
`Hello GHOST LAB, I would like to order:
Product: ${product.name}
Size: ${selectedSize}
Color: ${selectedColor}
Quantity: ${quantity}
Total: ${formatPrice(product.price * quantity)}`;
    }
  }

  // Share button click
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Product link copied to clipboard!');
        }).catch(() => {
          showToast('Link ready: ' + url);
        });
      } else {
        showToast('Link ready: ' + url);
      }
    });
  }

  // Initial WhatsApp URL update
  syncWhatsAppUrl();
}
