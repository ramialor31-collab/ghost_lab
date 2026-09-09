/**
 * GHOST LAB — Custom Printing & Embroidery Atelier Page View
 */

import { buildWhatsAppCustomUrl } from '../data/products.js';

export function renderCustomPage() {
  return `
    <div class="container" style="margin-top: var(--nav-height); padding-top: var(--space-2xl); padding-bottom: var(--space-4xl);">
      <!-- Header -->
      <div class="custom-hero">
        <span class="section-kicker">ATELIER CRAFTSMANSHIP</span>
        <h1 class="section-title">Custom Printing & Embroidery</h1>
        <p class="section-desc">
          We bring your creative visions, anime artwork, and brand concepts to life using heavyweight streetwear blanks and precision industrial machinery.
        </p>
      </div>

      <!-- 4-STEP PROCESS -->
      <section class="section" style="padding-top: var(--space-2xl);">
        <div class="section-title-wrap">
          <span class="section-kicker">THE WORKFLOW</span>
          <h2 class="section-title">How Custom Orders Work</h2>
          <p class="section-desc">Simple, transparent, and direct communication from idea to delivery.</p>
        </div>

        <div class="custom-workflow-grid">
          <div class="workflow-step-card">
            <span class="step-number">01</span>
            <h3 style="font-size: 1.15rem; color: var(--accent-white);">Choose Your Idea</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">
              Select your base garment: 280 GSM oversized tee, 450 GSM French Terry hoodie, or crewneck in black, off-white, or custom shades.
            </p>
          </div>

          <div class="workflow-step-card">
            <span class="step-number">02</span>
            <h3 style="font-size: 1.15rem; color: var(--accent-white);">Send Your Details</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">
              Message us on WhatsApp with your artwork, sketch, anime reference, or brand logo. Tell us the sizing and placement.
            </p>
          </div>

          <div class="workflow-step-card">
            <span class="step-number">03</span>
            <h3 style="font-size: 1.15rem; color: var(--accent-white);">GHOST LAB Prepares</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">
              We convert your artwork into an embroidery stitch file or high-res DTF textile print film and send you a digital preview for confirmation.
            </p>
          </div>

          <div class="workflow-step-card">
            <span class="step-number">04</span>
            <h3 style="font-size: 1.15rem; color: var(--accent-white);">Receive Your Piece</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">
              Your finished piece is crafted in our atelier and shipped directly to your door across any of the 58 Wilayas.
            </p>
          </div>
        </div>
      </section>

      <!-- TECHNIQUES COMPARISON -->
      <section class="section" style="padding-top: 0;">
        <div class="section-title-wrap">
          <span class="section-kicker">OUR TECHNIQUES</span>
          <h2 class="section-title">Industrial Equipment & Methods</h2>
        </div>

        <div class="technique-comparison">
          <div class="technique-card">
            <div style="aspect-ratio: 16/9; border-radius: var(--radius-xs); overflow: hidden; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
              <img src="assets/images/custom/embroidery_detail.jpg" alt="Embroidery Detail" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span class="technique-tag">TECHNIQUE 01</span>
            <h3 style="font-size: 1.35rem;">High-Density Embroidery (Broderie)</h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Raised needlework using premium polyester and satin threads. Ideal for logos, Japanese typography, chest emblems, and sleeve accents that require lasting three-dimensional texture.
            </p>
            <ul style="padding-left: 20px; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              <li>High-durability (lasts hundreds of washes)</li>
              <li>Satin, tatami, and 3D puff stitch types</li>
              <li>Perfect on French Terry and heavyweight fleece</li>
            </ul>
          </div>

          <div class="technique-card">
            <div style="aspect-ratio: 16/9; border-radius: var(--radius-xs); overflow: hidden; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
              <img src="assets/images/custom/workshop_print.jpg" alt="DTF Printing Studio" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span class="technique-tag">TECHNIQUE 02</span>
            <h3 style="font-size: 1.35rem;">Direct-To-Film Printing (DTF)</h3>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Ultra-high resolution full-color textile printing. Ideal for detailed anime manga illustrations, photographic artwork, full back graphics, and multi-color gradient designs.
            </p>
            <ul style="padding-left: 20px; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              <li>Full-spectrum colors with intense saturation</li>
              <li>Smooth, flexible hand-feel that moves with fabric</li>
              <li>High opacity on dark black fabrics without cracking</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE CUSTOM INQUIRY BUILDER -->
      <section class="section" style="padding-top: 0;">
        <div class="builder-card">
          <div class="section-title-wrap" style="margin-bottom: 0;">
            <span class="section-kicker" style="color: #25d366;">CUSTOM INQUIRY BUILDER</span>
            <h2 class="section-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">Configure Your Custom Request</h2>
            <p class="section-desc">Select your desired garment and options. A customized WhatsApp order message will be generated automatically.</p>
          </div>

          <form id="custom-inquiry-form" onsubmit="return false;">
            <div class="builder-form-grid">
              <div class="builder-field">
                <label for="custom-garment-select">Base Garment Blank</label>
                <select id="custom-garment-select">
                  <option value="Oversized Streetwear T-Shirt (280 GSM)">Oversized Streetwear T-Shirt (280 GSM Heavy Cotton)</option>
                  <option value="Heavy French Terry Hoodie (450 GSM)">Heavy French Terry Hoodie (450 GSM Heavy Fleece)</option>
                  <option value="Streetwear Crewneck Sweatshirt (400 GSM)">Streetwear Crewneck Sweatshirt (400 GSM)</option>
                  <option value="Heavyweight Full-Zip Hoodie (450 GSM)">Heavyweight Full-Zip Hoodie (450 GSM)</option>
                  <option value="Custom Blank (Customer Provided Garment)">Customer Provided Garment (Stitching Only)</option>
                </select>
              </div>

              <div class="builder-field">
                <label for="custom-technique-select">Crafting Technique</label>
                <select id="custom-technique-select">
                  <option value="High-Density Embroidery">High-Density Embroidery (Broderie)</option>
                  <option value="DTF Full Color Textile Print">DTF Full Color Textile Print (Impression DTF)</option>
                  <option value="Hybrid (Embroidery Front + DTF Back)">Hybrid (Embroidery Front + DTF Back)</option>
                  <option value="Need Atelier Advice on Best Method">Need Atelier Advice on Best Method</option>
                </select>
              </div>

              <div class="builder-field">
                <label for="custom-placement-select">Artwork Placement</label>
                <select id="custom-placement-select">
                  <option value="Full Back Artwork">Full Back Artwork</option>
                  <option value="Center Chest Graphic">Center Chest Graphic</option>
                  <option value="Small Left Chest + Large Back">Small Left Chest + Large Back</option>
                  <option value="Sleeve Accent + Chest Logo">Sleeve Accent + Chest Logo</option>
                  <option value="Custom Multi-Location Placement">Custom Multi-Location Placement</option>
                </select>
              </div>

              <div class="builder-field">
                <label for="custom-quantity-input">Estimated Quantity</label>
                <select id="custom-quantity-input">
                  <option value="1 piece (Personalized 1-of-1)">1 piece (Personalized 1-of-1 Piece)</option>
                  <option value="2 to 5 pieces (Small Crew / Friends)">2 to 5 pieces (Small Crew / Friends)</option>
                  <option value="10 to 25 pieces (Brand Drop / Clan)">10 to 25 pieces (Brand Drop / Clan)</option>
                  <option value="50+ pieces (Commercial Production)">50+ pieces (Commercial Production)</option>
                </select>
              </div>

              <div class="builder-field" style="grid-column: span 2;">
                <label for="custom-notes-input">Your Idea, Concept or Anime Reference</label>
                <textarea id="custom-notes-input" rows="3" placeholder="Example: I want a black oversized hoodie with a cyber samurai embroidery on the chest and Japanese lettering on the hood..."></textarea>
              </div>

              <div class="builder-summary-box">
                <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #25d366; font-weight: 700;">
                  PREPARED WHATSAPP MESSAGE FOR 0676870535:
                </div>
                <div id="custom-summary-text" style="font-family: var(--font-mono); font-size: 0.82rem; color: #a7f3d0; white-space: pre-line;"></div>

                <a id="custom-whatsapp-submit-btn" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.777.788 2.796.788 3.182 0 5.768-2.587 5.768-5.766 0-3.181-2.587-5.774-5.768-5.774zm3.376 8.219c-.14.394-.712.723-1.002.766-.279.043-.637.086-2.029-.485-1.782-.732-2.92-2.55-3.009-2.669-.089-.118-.72-1.026-.72-1.956 0-.931.488-1.388.663-1.581.176-.192.383-.24.512-.24.129 0 .258.006.371.012.119.006.279-.044.436.333.159.382.544 1.325.592 1.423.048.098.079.213.016.339-.063.125-.095.203-.189.314-.094.111-.198.247-.282.332-.095.095-.195.198-.083.39.111.192.495.817 1.06 1.32 1.064.945 1.71 1.134 1.952 1.254.242.12.383.104.526-.06.143-.164.615-.717.779-.962.164-.245.328-.205.552-.122.224.082 1.423.67 1.668.792.245.122.408.183.468.286.06.104.06.602-.08 1.002z"/></svg>
                  Send Custom Inquiry via WhatsApp
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  `;
}

export function initCustomPageHandlers() {
  const garmentSelect = document.getElementById('custom-garment-select');
  const techniqueSelect = document.getElementById('custom-technique-select');
  const placementSelect = document.getElementById('custom-placement-select');
  const qtyInput = document.getElementById('custom-quantity-input');
  const notesInput = document.getElementById('custom-notes-input');
  const summaryText = document.getElementById('custom-summary-text');
  const submitBtn = document.getElementById('custom-whatsapp-submit-btn');

  function updateCustomUrl() {
    const garment = garmentSelect ? garmentSelect.value : 'Oversized Streetwear T-Shirt';
    const technique = techniqueSelect ? techniqueSelect.value : 'High-Density Embroidery';
    const placement = placementSelect ? placementSelect.value : 'Full Back Artwork';
    const quantity = qtyInput ? qtyInput.value : '1 piece';
    const notes = notesInput ? notesInput.value.trim() : '';

    const url = buildWhatsAppCustomUrl(garment, technique, placement, quantity, notes);

    if (submitBtn) {
      submitBtn.href = url;
    }

    if (summaryText) {
      summaryText.textContent = 
`Hello GHOST LAB, I would like to make a custom inquiry:
Garment: ${garment}
Technique: ${technique}
Placement: ${placement}
Quantity: ${quantity}
Details / Idea: ${notes || 'Personalized artwork'}`;
    }
  }

  [garmentSelect, techniqueSelect, placementSelect, qtyInput, notesInput].forEach(el => {
    if (el) el.addEventListener('input', updateCustomUrl);
  });

  updateCustomUrl();
}
