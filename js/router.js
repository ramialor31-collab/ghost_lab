/**
 * GHOST LAB — Client-Side Hash Router
 * Connects live Supabase products to public storefront and manages #/admin route
 */

import { updateNavActiveState } from './components/navbar.js';
import { syncProductsFromSupabase } from './data/products.js';
import { renderHomePage } from './pages/home.js';
import { renderShopPage, initShopPageHandlers } from './pages/shop.js';
import { renderProductDetailPage, initProductDetailHandlers } from './pages/product-detail.js';
import { renderCustomPage, initCustomPageHandlers } from './pages/custom.js';
import { renderAboutPage } from './pages/about.js';
import { renderContactPage } from './pages/contact.js';
import { renderAdminPage, initAdminPageHandlers } from './pages/admin.js';

export class Router {
  constructor(appContainerId) {
    this.container = document.getElementById(appContainerId);
    this.hasInitialSync = false;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }

  async handleRoute() {
    const hash = window.location.hash || '#/';
    const [pathPart, queryPart] = hash.split('?');

    // Parse query params
    const params = new URLSearchParams(queryPart || '');

    // Reset scroll position on route navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active nav state
    updateNavActiveState(pathPart);

    if (!this.container) return;

    // Synchronize Supabase products (on initial load and storefront route navigation)
    if (!this.hasInitialSync) {
      await syncProductsFromSupabase();
      this.hasInitialSync = true;
    } else if (pathPart === '#/shop' || pathPart === '#/' || pathPart === '' || pathPart.startsWith('#/product/')) {
      await syncProductsFromSupabase();
    }

    // Route matching
    if (pathPart === '#/' || pathPart === '#' || pathPart === '') {
      document.title = 'GHOST LAB — Streetwear & Custom Clothing Atelier | Invisible But Present';
      this.container.innerHTML = renderHomePage();
    } else if (pathPart === '#/shop') {
      const category = params.get('cat') || 'all';
      document.title = 'Shop All Streetwear Drops — GHOST LAB';
      this.container.innerHTML = renderShopPage(category);
      initShopPageHandlers(category);
    } else if (pathPart.startsWith('#/product/')) {
      const productId = pathPart.replace('#/product/', '').trim();
      document.title = 'Streetwear Drop Details — GHOST LAB';
      this.container.innerHTML = renderProductDetailPage(productId);
      initProductDetailHandlers(productId);
    } else if (pathPart === '#/custom') {
      document.title = 'Custom Printing & High-Density Embroidery Atelier — GHOST LAB';
      this.container.innerHTML = renderCustomPage();
      initCustomPageHandlers();
    } else if (pathPart === '#/about') {
      document.title = 'About GHOST LAB — Invisible But Present';
      this.container.innerHTML = renderAboutPage();
    } else if (pathPart === '#/contact') {
      document.title = 'Contact GHOST LAB Atelier & WhatsApp Order';
      this.container.innerHTML = renderContactPage();
    } else if (pathPart === '#/admin') {
      document.title = 'Atelier Admin Dashboard — GHOST LAB';
      this.container.innerHTML = renderAdminPage();
      await initAdminPageHandlers();
    } else {
      // 404 fallback
      document.title = '404 Page Not Found — GHOST LAB';
      this.container.innerHTML = `
        <div class="container" style="margin-top: calc(var(--nav-height) + 40px); padding: 80px 20px; text-align: center;">
          <span class="section-kicker" style="justify-content: center;">ERROR 404</span>
          <h1 style="font-size: 2.8rem; margin: 12px 0;">LOOKBOOK ARCHIVE NOT FOUND</h1>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">The page you are looking for does not exist in the GHOST LAB database.</p>
          <a href="#/" class="btn btn-primary">Return to Homepage</a>
        </div>
      `;
    }
  }
}
