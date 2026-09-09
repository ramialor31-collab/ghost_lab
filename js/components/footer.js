/**
 * GHOST LAB — Site Footer Component
 */

export function renderFooter(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#/" class="brand-logo" aria-label="GHOST LAB Home">
            <img src="assets/images/logo.svg" alt="GHOST LAB" height="34">
          </a>
          <p>
            Algerian independent streetwear & custom atelier. High-density embroidery, anime & manga graphics, heavyweight 280-450 GSM blanks. Invisible but present.
          </p>
          <div style="display: flex; gap: 12px; margin-top: 6px;">
            <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="nav-social-link" title="Instagram @ghost.lab1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>
            </a>
            <a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB" target="_blank" rel="noopener noreferrer" class="nav-social-link" title="WhatsApp 0676870535">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.777.788 2.796.788 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.587-5.774-5.768-5.774zm3.376 8.219c-.14.394-.712.723-1.002.766-.279.043-.637.086-2.029-.485-1.782-.732-2.92-2.55-3.009-2.669-.089-.118-.72-1.026-.72-1.956 0-.931.488-1.388.663-1.581.176-.192.383-.24.512-.24.129 0 .258.006.371.012.119.006.279-.044.436.333.159.382.544 1.325.592 1.423.048.098.079.213.016.339-.063.125-.095.203-.189.314-.094.111-.198.247-.282.332-.095.095-.195.198-.083.39.111.192.495.817 1.06 1.32 1.064.945 1.71 1.134 1.952 1.254.242.12.383.104.526-.06.143-.164.615-.717.779-.962.164-.245.328-.205.552-.122.224.082 1.423.67 1.668.792.245.122.408.183.468.286.06.104.06.602-.08 1.002z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="footer-col-title">Navigation</h4>
          <ul class="footer-links">
            <li><a href="#/shop">Shop All Drops</a></li>
            <li><a href="#/shop?cat=t-shirts">Streetwear Tees</a></li>
            <li><a href="#/shop?cat=hoodies">Heavyweight Hoodies</a></li>
            <li><a href="#/custom">Custom Printing & Embroidery</a></li>
            <li><a href="#/about">About The Brand</a></li>
            <li><a href="#/contact">Atelier Contact</a></li>
            <li><a href="#/admin" style="color: var(--text-muted); font-size: 0.82rem;">Atelier Admin ⚙</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Custom Studio</h4>
          <ul class="footer-links">
            <li><a href="#/custom">Broderie Haute Densité</a></li>
            <li><a href="#/custom">Impression DTF Textile</a></li>
            <li><a href="#/custom">Oversized Blanks (280-450 GSM)</a></li>
            <li><a href="#/custom">Crew & Brand Production</a></li>
            <li><a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB,%20I%20have%20a%20custom%20request" target="_blank" rel="noopener noreferrer">WhatsApp Direct Atelier</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Algeria Delivery</h4>
          <div class="footer-shipping-card">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--accent-white); font-size: 0.88rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              Livraison 58 Wilayas
            </div>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
              Fast delivery to your home or stop-desk across all 58 Algerian Wilayas. Paiement à la livraison (Cash on Delivery).
            </p>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #25d366; font-weight: 700;">
              WHATSAPP: 0676870535
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 GHOST LAB (幽霊実験室). All rights reserved. Made in Algeria.</div>
        <div style="display: flex; gap: 20px;">
          <span>INSTAGRAM: @ghost.lab1</span>
          <span>INVISIBLE BUT PRESENT</span>
        </div>
      </div>
    </div>
  `;
}
