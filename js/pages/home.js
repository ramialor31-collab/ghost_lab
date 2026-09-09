/**
 * GHOST LAB — Home Page View
 */

import { getFeaturedProducts } from '../data/products.js';
import { createProductCardHtml } from '../components/product-card.js';

export function renderHomePage() {
  const featured = getFeaturedProducts();
  const featuredHtml = featured.map(p => createProductCardHtml(p)).join('');

  return `
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="hero-bg-media">
        <img src="assets/images/lookbook/hero_lookbook.jpg" alt="GHOST LAB Streetwear Lookbook" class="hero-bg-img">
        <div class="hero-overlay"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span style="display:inline-block; width:6px; height:6px; background:#22c55e; border-radius:50%;"></span>
            LIVRAISON 58 WILAYAS DISPONIBLE
          </div>

          <h1 class="hero-title">
            <span class="accent">INVISIBLE</span>
            BUT PRESENT.
            <span class="sub-kanji">不可視だが存在する</span>
          </h1>

          <p class="hero-desc">
            Algerian independent streetwear & custom clothing atelier. Heavyweight French Terry hoodies, anime graphics, and high-density precision embroidery crafted for the underground.
          </p>

          <div class="hero-cta-group">
            <a href="#/shop" class="btn btn-primary btn-lg">
              Shop Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#/custom" class="btn btn-secondary btn-lg">
              Custom Atelier
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-num">58</span>
              <span class="stat-label">Wilayas Covered</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">280-450</span>
              <span class="stat-label">Heavy GSM Blanks</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">100%</span>
              <span class="stat-label">Cotton & Terry</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTINUOUS TICKER MARQUEE -->
    <div class="ticker-wrap" aria-hidden="true">
      <div class="ticker-track">
        <div class="ticker-item"><span class="dot"></span> LIVRAISON 58 WILAYAS</div>
        <div class="ticker-item"><span class="dot"></span> GHOST LAB 幽霊実験室</div>
        <div class="ticker-item"><span class="dot"></span> BRODERIE HAUTE DENSITÉ</div>
        <div class="ticker-item"><span class="dot"></span> HEAVYWEIGHT 280-450 GSM</div>
        <div class="ticker-item"><span class="dot"></span> INVISIBLE BUT PRESENT</div>
        <div class="ticker-item"><span class="dot"></span> BOX OVERSIZED CUTS</div>
        <div class="ticker-item"><span class="dot"></span> IMPRESSION DTF TEXTILE</div>
        <div class="ticker-item"><span class="dot"></span> WHATSAPP DIRECT ORDER</div>
        <!-- Duplicate for infinite seamless scroll -->
        <div class="ticker-item"><span class="dot"></span> LIVRAISON 58 WILAYAS</div>
        <div class="ticker-item"><span class="dot"></span> GHOST LAB 幽霊実験室</div>
        <div class="ticker-item"><span class="dot"></span> BRODERIE HAUTE DENSITÉ</div>
        <div class="ticker-item"><span class="dot"></span> HEAVYWEIGHT 280-450 GSM</div>
        <div class="ticker-item"><span class="dot"></span> INVISIBLE BUT PRESENT</div>
        <div class="ticker-item"><span class="dot"></span> BOX OVERSIZED CUTS</div>
        <div class="ticker-item"><span class="dot"></span> IMPRESSION DTF TEXTILE</div>
        <div class="ticker-item"><span class="dot"></span> WHATSAPP DIRECT ORDER</div>
      </div>
    </div>

    <!-- FEATURED COLLECTION -->
    <section class="section" id="featured-drops">
      <div class="container">
        <div class="featured-header">
          <div class="section-title-wrap" style="margin-bottom: 0;">
            <span class="section-kicker">STREETWEAR DROPS</span>
            <h2 class="section-title">Latest Releases</h2>
            <p class="section-desc">Limited drops crafted in heavyweight cotton with precision anime & Japanese typography.</p>
          </div>
          <a href="#/shop" class="btn btn-secondary">
            View All Catalog (${featured.length}+ Drops)
          </a>
        </div>

        <div class="product-grid">
          ${featuredHtml}
        </div>
      </div>
    </section>

    <!-- CUSTOM ATELIER TEASER -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="atelier-teaser">
          <div class="atelier-grid">
            <div class="atelier-media">
              <img src="assets/images/custom/workshop_print.jpg" alt="GHOST LAB Atelier Custom Workshop">
            </div>
            <div class="atelier-content">
              <span class="section-kicker">CUSTOM ATELIER</span>
              <h2 style="font-size: clamp(1.8rem, 3vw, 2.5rem); line-height: 1.15;">
                Embroidery & Custom Printing
              </h2>
              <p>
                From 1-of-1 personalized anime garments to complete streetwear brand drops, GHOST LAB delivers industrial-grade high-density embroidery and vibrant DTF textile prints on our custom boxy blanks.
              </p>

              <div class="atelier-features">
                <div class="feature-box">
                  <h4>Broderie Haute Densité</h4>
                  <p>Up to 80,000 stitches using premium satin thread on French Terry fleece.</p>
                </div>
                <div class="feature-box">
                  <h4>Impression DTF HD</h4>
                  <p>Vibrant, stretchable, razor-sharp prints that never crack or peel off.</p>
                </div>
              </div>

              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="#/custom" class="btn btn-primary">
                  Explore Custom Atelier
                </a>
                <a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB,%20I%20want%20to%20order%20a%20custom%20piece" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                  WhatsApp Direct Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BRAND STORY / MANIFESTO -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="manifesto-box">
          <span class="section-kicker" style="color: var(--accent-white);">THE MANIFESTO</span>
          <div class="manifesto-quote">
            "INVISIBLE BUT PRESENT. WE DO NOT DESIGN FOR THE MASSES. WE CRAFT FOR THOSE WHO RECOGNIZE RAW TEXTURE, PRECISE STITCHES, AND UNCOMPROMISING SUBSTANCE."
          </div>
          <p style="max-width: 680px; color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">
            Rooted in Algeria and inspired by cyberpunk subcultures and Japanese graphic identity, GHOST LAB exists at the intersection of raw heavyweight blanks and custom garment craftsmanship. Every piece is built to outlast seasons and trends.
          </p>
          <div style="margin-top: 24px;">
            <a href="#/about" class="btn btn-secondary btn-sm">Read Full Brand Story</a>
          </div>
        </div>
      </div>
    </section>

    <!-- INSTAGRAM SOCIAL LOOKBOOK -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="featured-header">
          <div class="section-title-wrap" style="margin-bottom: 0;">
            <span class="section-kicker">COMMUNITY</span>
            <h2 class="section-title">@ghost.lab1 On Instagram</h2>
            <p class="section-desc">Tag #ghostlab to get featured in our streetwear archive.</p>
          </div>
          <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Follow @ghost.lab1
          </a>
        </div>

        <div class="insta-grid">
          <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="insta-card">
            <img src="assets/images/lookbook/lifestyle_model.jpg" alt="GHOST LAB Instagram Lookbook 1">
            <div class="insta-card-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>@ghost.lab1</span>
            </div>
          </a>

          <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="insta-card">
            <img src="assets/images/products/tee_cyber_samurai_back.jpg" alt="GHOST LAB Instagram Lookbook 2">
            <div class="insta-card-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>@ghost.lab1</span>
            </div>
          </a>

          <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="insta-card">
            <img src="assets/images/custom/embroidery_detail.jpg" alt="GHOST LAB Instagram Lookbook 3">
            <div class="insta-card-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>@ghost.lab1</span>
            </div>
          </a>

          <a href="https://instagram.com/ghost.lab1" target="_blank" rel="noopener noreferrer" class="insta-card">
            <img src="assets/images/products/hoodie_cyber_back.jpg" alt="GHOST LAB Instagram Lookbook 4">
            <div class="insta-card-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>@ghost.lab1</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- FINAL WHATSAPP CONVERSION CTA -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="whatsapp-cta-banner">
          <div class="whatsapp-cta-text">
            <span class="section-kicker" style="color: #25d366;">INSTANT CONTACT</span>
            <h3>READY TO ORDER?</h3>
            <p>Connect directly with our atelier on WhatsApp. Quick confirmation, sizing assistance, and nationwide delivery across all 58 Wilayas.</p>
          </div>
          <a href="https://wa.me/213676870535?text=Hello%20GHOST%20LAB,%20I%20am%20ready%20to%20place%20an%20order" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.777.788 2.796.788 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.587-5.774-5.768-5.774zm3.376 8.219c-.14.394-.712.723-1.002.766-.279.043-.637.086-2.029-.485-1.782-.732-2.92-2.55-3.009-2.669-.089-.118-.72-1.026-.72-1.956 0-.931.488-1.388.663-1.581.176-.192.383-.24.512-.24.129 0 .258.006.371.012.119.006.279-.044.436.333.159.382.544 1.325.592 1.423.048.098.079.213.016.339-.063.125-.095.203-.189.314-.094.111-.198.247-.282.332-.095.095-.195.198-.083.39.111.192.495.817 1.06 1.32 1.064.945 1.71 1.134 1.952 1.254.242.12.383.104.526-.06.143-.164.615-.717.779-.962.164-.245.328-.205.552-.122.224.082 1.423.67 1.668.792.245.122.408.183.468.286.06.104.06.602-.08 1.002z"/></svg>
            Chat On WhatsApp (0676870535)
          </a>
        </div>
      </div>
    </section>
  `;
}
