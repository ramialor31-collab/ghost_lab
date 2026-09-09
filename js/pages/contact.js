/**
 * GHOST LAB — Contact & Atelier Inquiries Page View
 */

export function renderContactPage() {
  return `
    <div class="container" style="margin-top: var(--nav-height); padding-top: var(--space-2xl); padding-bottom: var(--space-4xl);">
      <div class="shop-header" style="margin-bottom: var(--space-2xl);">
        <span class="section-kicker">DIRECT CONTACT</span>
        <h1 class="section-title">Connect With GHOST LAB</h1>
        <p class="section-desc">
          For drop inquiries, sizing recommendations, or custom embroidery and DTF orders, reach out directly through WhatsApp or Instagram.
        </p>
      </div>

      <div class="contact-grid">
        <!-- Direct Contact Cards -->
        <div class="contact-card-list">
          <!-- WhatsApp Card -->
          <a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB,%20I%20have%20a%20question" target="_blank" rel="noopener noreferrer" class="contact-info-card whatsapp-direct">
            <div class="contact-icon-bubble">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.777.788 2.796.788 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.587-5.774-5.768-5.774zm3.376 8.219c-.14.394-.712.723-1.002.766-.279.043-.637.086-2.029-.485-1.782-.732-2.92-2.55-3.009-2.669-.089-.118-.72-1.026-.72-1.956 0-.931.488-1.388.663-1.581.176-.192.383-.24.512-.24.129 0 .258.006.371.012.119.006.279-.044.436.333.159.382.544 1.325.592 1.423.048.098.079.213.016.339-.063.125-.095.203-.189.314-.094.111-.198.247-.282.332-.095.095-.195.198-.083.39.111.192.495.817 1.06 1.32 1.064.945 1.71 1.134 1.952 1.254.242.12.383.104.526-.06.143-.164.615-.717.779-.962.164-.245.328-.205.552-.122.224.082 1.423.67 1.668.792.245.122.408.183.468.286.06.104.06.602-.08 1.002z"/>
              </svg>
            </div>
            <div>
              <span class="badge badge-new" style="margin-bottom: 6px;">PRIMARY ORDER CHANNEL</span>
              <h3 style="font-size: 1.25rem; color: var(--accent-white); margin-bottom: 4px;">WhatsApp Atelier</h3>
              <p style="font-family: var(--font-mono); font-size: 1.05rem; color: #25d366; font-weight: 700; margin-bottom: 4px;">
                0676870535
              </p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Fast reply for orders, custom tech packs, and sizing questions.
              </p>
            </div>
          </a>

          <!-- Instagram Card -->
          <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="contact-info-card">
            <div class="contact-icon-bubble">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
            </div>
            <div>
              <span class="badge" style="margin-bottom: 6px;">OFFICIAL ARCHIVE</span>
              <h3 style="font-size: 1.25rem; color: var(--accent-white); margin-bottom: 4px;">Instagram</h3>
              <p style="font-family: var(--font-mono); font-size: 1rem; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">
                @ghost.lab1
              </p>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Drop announcements, behind-the-scenes embroidery reels, and lookbooks.
              </p>
            </div>
          </a>

          <!-- Custom Studio Link -->
          <a href="#/custom" class="contact-info-card">
            <div class="contact-icon-bubble">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div>
              <span class="badge badge-limited" style="margin-bottom: 6px;">CUSTOM SERVICE</span>
              <h3 style="font-size: 1.25rem; color: var(--accent-white); margin-bottom: 4px;">Custom Inquiry Builder</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">
                Use our interactive builder to configure custom embroidery and DTF garments with instant WhatsApp integration.
              </p>
            </div>
          </a>
        </div>

        <!-- FAQ & Ordering Guide -->
        <div class="faq-card">
          <span class="section-kicker">FREQUENTLY ASKED QUESTIONS</span>
          <h2 style="font-size: 1.5rem; margin-bottom: var(--space-lg);">Delivery & Ordering in Algeria</h2>

          <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
            <div>
              <h4 style="font-size: 1rem; color: var(--accent-white); margin-bottom: 4px;">How do I place an order?</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
                Simply select your product, size, and color on our website, then click <strong>"Order via WhatsApp"</strong>. This generates an exact pre-formatted message sent directly to our atelier at <strong>0676870535</strong>. We confirm availability and ship to your address.
              </p>
            </div>

            <div>
              <h4 style="font-size: 1rem; color: var(--accent-white); margin-bottom: 4px;">What payment methods are supported?</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
                We use <strong>Paiement à la livraison (Cash on Delivery)</strong>. You pay the courier upon inspecting and receiving your package. CCP or BaridiMob is also available upon request.
              </p>
            </div>

            <div>
              <h4 style="font-size: 1rem; color: var(--accent-white); margin-bottom: 4px;">Which wilayas do you ship to?</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
                We ship across all <strong>58 Wilayas of Algeria</strong> via express parcel services (delivery to home or stop-desk pick-up points).
              </p>
            </div>

            <div>
              <h4 style="font-size: 1rem; color: var(--accent-white); margin-bottom: 4px;">How long does delivery take?</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
                Stock pieces: 24 to 48 hours for central wilayas, 48 to 72 hours for other regions. Custom embroidery pieces typically require 2 to 4 days for production before shipment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
