/**
 * GHOST LAB — Navigation Header & Mobile Drawer Component
 */

export function renderNavbar(containerId, drawerId, backdropId) {
  const container = document.getElementById(containerId);
  const drawer = document.getElementById(drawerId);
  const backdrop = document.getElementById(backdropId);

  if (!container) return;

  // Header template
  container.innerHTML = `
    <div class="container nav-container">
      <a href="#/" class="brand-logo" id="nav-brand-logo" aria-label="GHOST LAB Home">
        <img src="assets/images/logo.svg" alt="GHOST LAB Logo" height="38">
      </a>

      <ul class="nav-desktop-links" id="desktop-nav-links">
        <li><a href="#/shop" class="nav-link" data-route="shop">Shop</a></li>
        <li><a href="#/custom" class="nav-link" data-route="custom">Custom & Embroidery</a></li>
        <li><a href="#/about" class="nav-link" data-route="about">About</a></li>
        <li><a href="#/contact" class="nav-link" data-route="contact">Contact</a></li>
      </ul>

      <div class="nav-actions">
        <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="nav-social-link" title="Instagram @ghost.lab1" aria-label="Follow on Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        <a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB,%20I%20have%20an%20inquiry" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" id="nav-whatsapp-cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.777.788 2.796.788 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.587-5.774-5.768-5.774zm3.376 8.219c-.14.394-.712.723-1.002.766-.279.043-.637.086-2.029-.485-1.782-.732-2.92-2.55-3.009-2.669-.089-.118-.72-1.026-.72-1.956 0-.931.488-1.388.663-1.581.176-.192.383-.24.512-.24.129 0 .258.006.371.012.119.006.279-.044.436.333.159.382.544 1.325.592 1.423.048.098.079.213.016.339-.063.125-.095.203-.189.314-.094.111-.198.247-.282.332-.095.095-.195.198-.083.39.111.192.495.817 1.06 1.32 1.064.945 1.71 1.134 1.952 1.254.242.12.383.104.526-.06.143-.164.615-.717.779-.962.164-.245.328-.205.552-.122.224.082 1.423.67 1.668.792.245.122.408.183.468.286.06.104.06.602-.08 1.002z"/>
          </svg>
          WhatsApp
        </a>

        <button class="mobile-menu-btn" id="mobile-hamburger-btn" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `;

  // Drawer template
  if (drawer) {
    drawer.innerHTML = `
      <div class="drawer-header">
        <a href="#/" class="brand-logo" aria-label="GHOST LAB Home">
          <img src="assets/images/logo.svg" alt="GHOST LAB" height="34">
        </a>
      </div>

      <ul class="drawer-nav-list">
        <li>
          <a href="#/shop" class="drawer-link" data-route="shop">
            Shop Drops <span class="kanji">店舗</span>
          </a>
        </li>
        <li>
          <a href="#/custom" class="drawer-link" data-route="custom">
            Custom Atelier <span class="kanji">刺繍</span>
          </a>
        </li>
        <li>
          <a href="#/about" class="drawer-link" data-route="about">
            Brand Story <span class="kanji">幽霊</span>
          </a>
        </li>
        <li>
          <a href="#/contact" class="drawer-link" data-route="contact">
            Contact & WhatsApp <span class="kanji">連絡</span>
          </a>
        </li>
      </ul>

      <div class="drawer-footer">
        <a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB,%20I%20want%20to%20order" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-full">
          Chat on WhatsApp
        </a>
        <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-full">
          Instagram @ghost.lab1
        </a>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 8px;">
          LIVRAISON 58 WILAYAS • CASH ON DELIVERY
        </div>
      </div>
    `;
  }

  // Toggle handlers
  const hamburger = document.getElementById('mobile-hamburger-btn');

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (drawer) drawer.classList.toggle('open', isOpen);
    if (backdrop) backdrop.classList.toggle('open', isOpen);
    if (hamburger) {
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMenu(false));
  }

  // Close drawer on link clicks
  if (drawer) {
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }
}

export function updateNavActiveState(route) {
  const desktopLinks = document.querySelectorAll('#desktop-nav-links .nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const cleanRoute = (route || '').replace('#/', '').split('?')[0].split('/')[0] || 'home';

  desktopLinks.forEach(link => {
    const linkRoute = link.getAttribute('data-route') || '';
    if (linkRoute === cleanRoute || (cleanRoute === 'home' && linkRoute === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  drawerLinks.forEach(link => {
    const linkRoute = link.getAttribute('data-route') || '';
    if (linkRoute === cleanRoute) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
