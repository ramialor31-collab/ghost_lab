/**
 * GHOST LAB — About Page View (Brand Ethos & Manifesto)
 */

export function renderAboutPage() {
  return `
    <div class="container" style="margin-top: var(--nav-height); padding-top: var(--space-2xl); padding-bottom: var(--space-4xl);">
      <div class="about-hero">
        <span class="section-kicker">ABOUT THE BRAND</span>
        <h1 class="section-title">Invisible But Present.</h1>
        <p class="section-desc">
          GHOST LAB (幽霊実験室) is an independent streetwear project and custom apparel atelier founded in Algeria.
        </p>
      </div>

      <div class="about-editorial-grid">
        <div class="about-media-frame">
          <img src="assets/images/lookbook/lifestyle_model.jpg" alt="GHOST LAB Streetwear Identity">
        </div>

        <div class="about-text-content">
          <span class="section-kicker">THE IDENTITY</span>
          <h3>Form Follows Weight. Concept Follows Substance.</h3>
          <p>
            GHOST LAB was built around a singular premise: streetwear should carry physical presence. In an era where mass market fast fashion relies on paper-thin polyester blends and throwaway graphics, we focus strictly on high-density weight, drop-shoulder silhouettes, and tactile craftsmanship.
          </p>
          <p>
            The moniker <strong>"Invisible but present"</strong> draws inspiration from phantom aesthetics, cyberpunk lore, and underground culture — pieces that don't need excessive neon logos to command authority. The cut speaks first, the fabric weight speaks second, and the intricate needlework speaks last.
          </p>
          <div style="padding: 16px 20px; background-color: var(--bg-card); border-left: 3px solid var(--accent-white); border-radius: var(--radius-xs);">
            <p style="color: var(--accent-white); font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; margin-bottom: 4px;">
              "Streetwear is not a marketing label. It is how you inhabit your city."
            </p>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">
              — GHOST LAB Atelier, Algiers
            </span>
          </div>
        </div>
      </div>

      <!-- BRAND PILLARS -->
      <section class="section" style="padding-bottom: 0;">
        <div class="section-title-wrap">
          <span class="section-kicker">CORE COMMITMENTS</span>
          <h2 class="section-title">What Defines GHOST LAB</h2>
        </div>

        <div class="about-values-grid">
          <div class="value-item">
            <span style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: rgba(255,255,255,0.2);">01</span>
            <h4 style="font-size: 1.15rem; color: var(--accent-white);">Heavyweight Blanks Only</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
              We refuse to print on lightweight promotional blanks. Our tees run from 260 to 280 GSM ring-spun cotton, and our hoodies are 450 GSM French Terry fleece with double-layered hoods.
            </p>
          </div>

          <div class="value-item">
            <span style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: rgba(255,255,255,0.2);">02</span>
            <h4 style="font-size: 1.15rem; color: var(--accent-white);">Authentic Japanese Influence</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
              Our visual language is informed by cyberpunk manga, mecha anatomy, and traditional Japanese calligraphy stitched with high-precision multi-needle industrial embroidery.
            </p>
          </div>

          <div class="value-item">
            <span style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800; color: rgba(255,255,255,0.2);">03</span>
            <h4 style="font-size: 1.15rem; color: var(--accent-white);">Nationwide Algerian Access</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
              Whether you are in Algiers, Oran, Constantine, Annaba, or the southern wilayas, we deliver reliably across all 58 Wilayas with cash on delivery payment.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div style="margin-top: var(--space-4xl); text-align: center; padding: 48px 24px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
        <h3 style="font-size: 1.8rem; margin-bottom: 8px;">Explore The Archive</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
          Check out our latest drops or get in touch with our atelier for custom 1-of-1 creations.
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="#/shop" class="btn btn-primary">Browse Shop</a>
          <a href="#/custom" class="btn btn-secondary">Custom Atelier</a>
        </div>
      </div>
    </div>
  `;
}
