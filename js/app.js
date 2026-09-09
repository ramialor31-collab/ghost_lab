/**
 * GHOST LAB — Main Application Entry
 * Streetwear & Custom Clothing Brand (Algeria)
 */

import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { initSizeModal } from './components/size-modal.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount Navigation
  renderNavbar('navbar-container', 'mobile-drawer', 'drawer-backdrop');

  // 2. Mount Footer
  renderFooter('footer-container');

  // 3. Mount Size Guide Modal
  initSizeModal('size-modal-overlay');

  // 4. Initialize Router
  const router = new Router('app');

  // Handle direct initial load
  router.handleRoute();

  // Header scroll state effect
  const header = document.getElementById('navbar-container');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  console.log('%c GHOST LAB %c INVISIBLE BUT PRESENT. 幽霊実験室 ', 
    'background: #ffffff; color: #000000; font-weight: bold; padding: 4px 8px;',
    'background: #09090b; color: #a1a1aa; padding: 4px 8px;');
});
