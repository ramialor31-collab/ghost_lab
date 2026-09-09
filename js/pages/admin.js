/**
 * GHOST LAB — Store Owner Admin Dashboard
 * Directly connected to Supabase `products` table and `product-images` storage bucket.
 */

import { 
  getSupabase, 
  fetchProductsFromSupabase, 
  createProductInSupabase, 
  updateProductInSupabase, 
  deleteProductFromSupabase, 
  uploadProductImage, 
  signInAdmin, 
  signOutAdmin, 
  getAdminSession 
} from '../supabase.js';

import { syncProductsFromSupabase, formatPrice, INITIAL_PRODUCTS } from '../data/products.js';
import { showToast } from '../components/toast.js';

let cachedAdminProducts = [];
let editingProductId = null;
let currentUploadedImages = [];

export function renderAdminPage() {
  return `
    <div class="container admin-wrapper">
      <div id="admin-auth-container">
        <!-- Renders Login Form or Full Dashboard via initAdminPageHandlers -->
        <div style="padding: 60px 20px; text-align: center; color: var(--text-muted); font-family: var(--font-mono);">
          Connecting to Supabase...
        </div>
      </div>

      <!-- Add/Edit Product Modal -->
      <div class="admin-modal-overlay" id="admin-product-modal">
        <div class="admin-modal-card">
          <div class="admin-modal-header">
            <h3 style="font-size: 1.25rem;" id="admin-modal-title">Add Streetwear Product Drop</h3>
            <button class="modal-close-btn" id="admin-modal-close-btn" aria-label="Close modal">✕</button>
          </div>

          <form id="admin-product-form">
            <div class="admin-modal-body">
              <div class="admin-form-row-2">
                <div class="admin-form-group">
                  <label for="prod-name">Product Name *</label>
                  <input type="text" id="prod-name" placeholder="e.g. Cyber Samurai 280GSM Tee" required>
                </div>

                <div class="admin-form-group">
                  <label for="prod-category">Category *</label>
                  <select id="prod-category" required>
                    <option value="t-shirts">T-Shirts (280 GSM)</option>
                    <option value="hoodies">Hoodies (450 GSM)</option>
                    <option value="custom">Custom Atelier</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div class="admin-form-row-2">
                <div class="admin-form-group">
                  <label for="prod-price">Price (DA / DZD) *</label>
                  <input type="number" id="prod-price" placeholder="3500" min="0" required>
                  <span class="hint">Prices are listed in Algerian Dinar (Cash on delivery)</span>
                </div>

                <div class="admin-form-group">
                  <label for="prod-badge">Badge (Optional)</label>
                  <input type="text" id="prod-badge" placeholder="e.g. NEW DROP, HEAVYWEIGHT, LIMITED 1/50">
                </div>
              </div>

              <div class="admin-form-group">
                <label for="prod-description">Streetwear Description</label>
                <textarea id="prod-description" rows="3" placeholder="Describe fabric weight, fit, embroidery details..."></textarea>
              </div>

              <!-- Available Sizes -->
              <div class="admin-form-group">
                <label>Available Sizes</label>
                <div class="size-tag-group" id="admin-sizes-picker">
                  <label>
                    <input type="checkbox" class="size-tag-checkbox" value="S" checked>
                    <span class="size-tag-label">S</span>
                  </label>
                  <label>
                    <input type="checkbox" class="size-tag-checkbox" value="M" checked>
                    <span class="size-tag-label">M</span>
                  </label>
                  <label>
                    <input type="checkbox" class="size-tag-checkbox" value="L" checked>
                    <span class="size-tag-label">L</span>
                  </label>
                  <label>
                    <input type="checkbox" class="size-tag-checkbox" value="XL" checked>
                    <span class="size-tag-label">XL</span>
                  </label>
                  <label>
                    <input type="checkbox" class="size-tag-checkbox" value="XXL">
                    <span class="size-tag-label">XXL</span>
                  </label>
                </div>
              </div>

              <!-- Colors -->
              <div class="admin-form-group">
                <label for="prod-colors">Available Colors</label>
                <input type="text" id="prod-colors" placeholder="Noir Carbon, Bone White, Washed Ash (comma separated)">
                <span class="hint">Separate color names with commas</span>
              </div>

              <!-- Image Uploader to Supabase Storage -->
              <div class="admin-form-group">
                <label>Product Images (Supabase Storage: product-images)</label>
                <div class="admin-dropzone" id="admin-image-dropzone">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <div style="font-weight: 700; color: var(--text-primary);">Click or drag images to upload</div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary);">Direct upload to "product-images" Supabase bucket</div>
                  <input type="file" id="admin-file-input" accept="image/*" multiple style="display: none;">
                </div>

                <div id="admin-upload-status" style="font-family: var(--font-mono); font-size: 0.8rem; color: #25d366; display: none;"></div>

                <div class="admin-uploaded-previews" id="admin-previews-container">
                  <!-- Image thumbnail previews rendered via JS -->
                </div>
              </div>

              <!-- Available Toggle -->
              <div class="admin-form-group" style="flex-direction: row; align-items: center; gap: 12px; margin-top: 8px;">
                <input type="checkbox" id="prod-available" checked style="width: 20px; height: 20px; cursor: pointer;">
                <label for="prod-available" style="margin: 0; cursor: pointer;">Available for Order (In Stock across 58 Wilayas)</label>
              </div>
            </div>

            <div class="admin-modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" id="admin-modal-cancel-btn">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm" id="admin-save-prod-btn">Save Product to Supabase</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export async function initAdminPageHandlers() {
  const container = document.getElementById('admin-auth-container');
  if (!container) return;

  const session = await getAdminSession();

  if (!session) {
    renderAuthForm(container);
  } else {
    renderDashboard(container, session.user);
  }

  setupModalHandlers();
}

/**
 * Render Store Owner Sign-in Form
 */
function renderAuthForm(container) {
  container.innerHTML = `
    <div class="admin-auth-card">
      <div class="admin-auth-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>

      <span class="admin-badge">ATELIER ACCESS</span>
      <h2 style="font-size: 1.8rem; margin: 12px 0 4px;">Store Owner Login</h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary);">Sign in with your Supabase credentials to manage the GHOST LAB product drops and storage images.</p>

      <div class="admin-auth-error" id="admin-login-error"></div>

      <form class="admin-auth-form" id="admin-login-form">
        <div class="admin-form-group">
          <label for="admin-email">Admin Email</label>
          <input type="email" id="admin-email" placeholder="owner@ghostlab.dz" required>
        </div>

        <div class="admin-form-group">
          <label for="admin-password">Password</label>
          <input type="password" id="admin-password" placeholder="••••••••" required>
        </div>

        <button type="submit" class="btn btn-primary btn-full" id="admin-login-submit" style="margin-top: 8px;">
          Sign In to Dashboard
        </button>
      </form>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-muted);">
        <a href="#/" style="color: var(--text-secondary); text-decoration: underline;">← Return to Public Storefront</a>
      </div>
    </div>
  `;

  const form = document.getElementById('admin-login-form');
  const errorEl = document.getElementById('admin-login-error');
  const submitBtn = document.getElementById('admin-login-submit');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;

    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying Credentials...';
    }

    try {
      const data = await signInAdmin(email, password);
      showToast('Welcome back, Store Owner!');
      const user = data?.user || data?.session?.user;
      renderDashboard(container, user);
    } catch (err) {
      console.error('[GHOST LAB] Admin login error:', err);
      if (errorEl) {
        errorEl.textContent = err.message || 'Invalid email or password. Please check your Supabase Auth credentials.';
        errorEl.classList.add('show');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In to Dashboard';
      }
    }
  });
}

/**
 * Render the Main Admin Dashboard
 */
async function renderDashboard(container, user) {
  const session = await getAdminSession();
  const emailDisplay = user?.email || session?.user?.email || 'Store Owner';

  container.innerHTML = `
    <div class="admin-bar">
      <div class="admin-title-area">
        <span class="admin-badge">ATELIER ADMIN</span>
        <h1 style="font-size: 1.85rem; letter-spacing: -0.01em;">Product Catalog Management</h1>
      </div>

      <div class="admin-actions">
        <div class="admin-user-pill" title="Active Authenticated Session">
          <span class="dot"></span>
          <span>${emailDisplay}</span>
          <span style="font-size: 0.68rem; background: rgba(37,211,102,0.15); color: #25d366; padding: 2px 6px; border-radius: 2px; font-weight: 700;">AUTHENTICATED</span>
        </div>
        <a href="#/" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">View Live Store</a>
        <button class="btn btn-secondary btn-sm" id="admin-signout-btn">Sign Out</button>
      </div>
    </div>

    <!-- Stats and Actions Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md);">
      <div>
        <h2 style="font-size: 1.3rem;">Supabase Products Table</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Changes made here immediately update the live public website.</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-secondary btn-sm" id="admin-seed-btn" title="Seed default streetwear drops into empty database">
          Seed Starter Catalog
        </button>
        <button class="btn btn-primary btn-sm" id="admin-add-product-btn">
          + Add New Product Drop
        </button>
      </div>
    </div>

    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <span class="admin-stat-num" id="admin-total-stat">0</span>
        <span class="admin-stat-label">Total Drops in Supabase</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-num" id="admin-stock-stat">0</span>
        <span class="admin-stat-label">Active & In Stock</span>
      </div>
      <div class="admin-stat-card">
        <span class="admin-stat-num" style="color: #25d366;">58</span>
        <span class="admin-stat-label">Wilayas Covered</span>
      </div>
    </div>

    <!-- Products Table -->
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name & Badge</th>
            <th>Category</th>
            <th>Price</th>
            <th>Sizes</th>
            <th>Colors</th>
            <th>Status</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody id="admin-products-table-body">
          <tr>
            <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
              Loading products from Supabase...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // Sign out handler
  document.getElementById('admin-signout-btn')?.addEventListener('click', async () => {
    await signOutAdmin();
    showToast('Signed out of admin dashboard');
    renderAuthForm(container);
  });

  // Add Product button handler
  document.getElementById('admin-add-product-btn')?.addEventListener('click', () => {
    openProductModal();
  });

  // Seed Catalog handler
  document.getElementById('admin-seed-btn')?.addEventListener('click', async () => {
    await seedDemoProducts();
  });

  // Load table data
  await loadAndRenderProductsTable();
}

/**
 * Fetch and render products in the admin table
 */
async function loadAndRenderProductsTable() {
  const tbody = document.getElementById('admin-products-table-body');
  const totalStat = document.getElementById('admin-total-stat');
  const stockStat = document.getElementById('admin-stock-stat');

  try {
    const products = await fetchProductsFromSupabase();
    cachedAdminProducts = products;

    if (totalStat) totalStat.textContent = products.length;
    if (stockStat) stockStat.textContent = products.filter(p => p.available !== false).length;

    if (!tbody) return;

    if (products.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 50px 20px;">
            <div style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 6px;">No products stored in Supabase yet</div>
            <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.88rem;">Add your first streetwear drop or click "Seed Starter Catalog" above to populate.</p>
            <button class="btn btn-primary btn-sm" id="admin-empty-add-btn">+ Add Product Drop</button>
            <div style="margin-top: 24px; padding: 14px 18px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-medium); border-radius: var(--radius-xs); font-size: 0.8rem; color: var(--text-muted); text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
              <span style="color: var(--accent-white); font-weight: 700;">💡 RLS Setup Note:</span> Ensure your Supabase <code>products</code> table has both:
              <br>1. <strong>INSERT policy:</strong> <code>Target role: authenticated, WITH CHECK: true</code>
              <br>2. <strong>SELECT policy:</strong> <code>Target role: public, USING: true</code> (required so storefront visitors and admin can view products).
            </div>
          </td>
        </tr>
      `;
      document.getElementById('admin-empty-add-btn')?.addEventListener('click', () => openProductModal());
      return;
    }

    tbody.innerHTML = products.map(prod => {
      const primaryImg = (Array.isArray(prod.images) && prod.images[0]) || 'assets/images/products/tee_cyber_samurai_back.jpg';
      const sizesList = Array.isArray(prod.sizes) ? prod.sizes : [];
      const colorsList = Array.isArray(prod.colors) ? prod.colors : [];

      const sizesHtml = sizesList.map(s => `<span class="admin-mini-pill">${s}</span>`).join('');
      const colorsHtml = colorsList.map(c => `<span class="admin-mini-pill">${typeof c === 'string' ? c : c.name}</span>`).join('');

      return `
        <tr data-id="${prod.id}">
          <td>
            <img src="${primaryImg}" alt="${prod.name}" class="admin-prod-thumb" loading="lazy">
          </td>
          <td>
            <div style="font-weight: 700; color: var(--text-primary);">${prod.name}</div>
            ${prod.badge ? `<span class="badge badge-new" style="margin-top: 4px; font-size: 0.65rem;">${prod.badge}</span>` : ''}
          </td>
          <td style="text-transform: capitalize; font-family: var(--font-mono); font-size: 0.8rem;">
            ${(prod.category || 'streetwear').replace('-', ' ')}
          </td>
          <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-white);">
            ${formatPrice(prod.price)}
          </td>
          <td>
            <div class="admin-pill-group">${sizesHtml || '—'}</div>
          </td>
          <td>
            <div class="admin-pill-group">${colorsHtml || '—'}</div>
          </td>
          <td>
            <span style="display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.75rem; color: ${prod.available !== false ? '#25d366' : '#fb7185'};">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: ${prod.available !== false ? '#25d366' : '#fb7185'};"></span>
              ${prod.available !== false ? 'In Stock' : 'Out of Stock'}
            </span>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button class="admin-action-btn admin-action-edit" data-edit-id="${prod.id}">Edit</button>
            <button class="admin-action-btn admin-action-delete" data-delete-id="${prod.id}">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Edit / Delete listeners
    tbody.querySelectorAll('[data-edit-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-id');
        const prod = cachedAdminProducts.find(p => String(p.id) === String(id));
        if (prod) openProductModal(prod);
      });
    });

    tbody.querySelectorAll('[data-delete-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-delete-id');
        if (confirm(`Are you sure you want to delete product #${id}? This will remove it from the live website.`)) {
          try {
            await deleteProductFromSupabase(id);
            await syncProductsFromSupabase();
            showToast('Product drop deleted from Supabase');
            await loadAndRenderProductsTable();
          } catch (err) {
            alert('Failed to delete product: ' + err.message);
          }
        }
      });
    });

  } catch (err) {
    console.error('[GHOST LAB] Error loading products table:', err);
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 40px; color: #fb7185;">
            Failed to load products from Supabase: ${err.message}
          </td>
        </tr>
      `;
    }
  }
}

/**
 * Open Modal for Adding or Editing
 */
async function openProductModal(product = null) {
  const session = await getAdminSession();
  if (!session) {
    alert('Authentication required: Your session has expired. Please sign in to the Admin Dashboard.');
    const container = document.getElementById('admin-auth-container');
    if (container) renderAuthForm(container);
    return;
  }

  const modal = document.getElementById('admin-product-modal');
  const title = document.getElementById('admin-modal-title');
  const nameInput = document.getElementById('prod-name');
  const categoryInput = document.getElementById('prod-category');
  const priceInput = document.getElementById('prod-price');
  const badgeInput = document.getElementById('prod-badge');
  const descInput = document.getElementById('prod-description');
  const colorsInput = document.getElementById('prod-colors');
  const availableInput = document.getElementById('prod-available');

  editingProductId = product ? product.id : null;
  currentUploadedImages = product && Array.isArray(product.images) ? [...product.images] : [];

  if (title) {
    title.textContent = product ? `Edit Drop #${product.id}: ${product.name}` : 'Add Streetwear Product Drop';
  }

  if (nameInput) nameInput.value = product?.name || '';
  if (categoryInput) categoryInput.value = product?.category || 't-shirts';
  if (priceInput) priceInput.value = product?.price || '';
  if (badgeInput) badgeInput.value = product?.badge || '';
  if (descInput) descInput.value = product?.description || '';
  if (availableInput) availableInput.checked = product ? product.available !== false : true;

  // Colors
  if (colorsInput) {
    if (product && Array.isArray(product.colors)) {
      colorsInput.value = product.colors.map(c => typeof c === 'string' ? c : c.name).join(', ');
    } else {
      colorsInput.value = 'Noir Carbon, Bone White';
    }
  }

  // Sizes checkboxes
  const sizesList = product && Array.isArray(product.sizes) ? product.sizes : ['S', 'M', 'L', 'XL'];
  document.querySelectorAll('.size-tag-checkbox').forEach(cb => {
    cb.checked = sizesList.includes(cb.value);
  });

  renderImagePreviews();

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeProductModal() {
  const modal = document.getElementById('admin-product-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  editingProductId = null;
  currentUploadedImages = [];
}

function renderImagePreviews() {
  const container = document.getElementById('admin-previews-container');
  if (!container) return;

  if (currentUploadedImages.length === 0) {
    container.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">No images attached yet. Upload below.</span>';
    return;
  }

  container.innerHTML = currentUploadedImages.map((url, idx) => `
    <div class="admin-preview-item">
      <img src="${url}" alt="Preview ${idx + 1}">
      <button type="button" class="admin-preview-remove" data-remove-idx="${idx}" title="Remove image">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('[data-remove-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-remove-idx'), 10);
      currentUploadedImages.splice(idx, 1);
      renderImagePreviews();
    });
  });
}

function setupModalHandlers() {
  const modal = document.getElementById('admin-product-modal');
  if (!modal || modal.dataset.initialized === 'true') return;
  modal.dataset.initialized = 'true';

  const closeBtn = document.getElementById('admin-modal-close-btn');
  const cancelBtn = document.getElementById('admin-modal-cancel-btn');
  const form = document.getElementById('admin-product-form');
  const dropzone = document.getElementById('admin-image-dropzone');
  const fileInput = document.getElementById('admin-file-input');
  const uploadStatus = document.getElementById('admin-upload-status');
  const saveBtn = document.getElementById('admin-save-prod-btn');

  closeBtn?.addEventListener('click', closeProductModal);
  cancelBtn?.addEventListener('click', closeProductModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProductModal();
  });

  // Dropzone click
  dropzone?.addEventListener('click', () => {
    fileInput?.click();
  });

  // Dropzone drag & drop
  dropzone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone?.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFiles(e.dataTransfer.files);
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageFiles(e.target.files);
    }
  });

  async function handleImageFiles(files) {
    if (uploadStatus) {
      uploadStatus.style.display = 'block';
      uploadStatus.textContent = `Uploading ${files.length} image(s) to Supabase Storage...`;
    }

    try {
      for (const file of files) {
        const { publicUrl } = await uploadProductImage(file);
        currentUploadedImages.push(publicUrl);
      }
      if (uploadStatus) {
        uploadStatus.textContent = 'Upload complete! Image saved to "product-images" bucket.';
        setTimeout(() => { uploadStatus.style.display = 'none'; }, 2500);
      }
      renderImagePreviews();
    } catch (err) {
      console.error('[GHOST LAB] Upload failed:', err);
      alert('Failed to upload image: ' + err.message);
      if (uploadStatus) {
        uploadStatus.textContent = 'Upload error: ' + err.message;
      }
    }
  }

  // Form submit: Create or Update in Supabase
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Verify session before attempting mutation
    const session = await getAdminSession();
    if (!session) {
      alert('Authentication required: You are not currently logged in as an authenticated store owner. Please sign in.');
      closeProductModal();
      const container = document.getElementById('admin-auth-container');
      if (container) renderAuthForm(container);
      return;
    }

    const name = document.getElementById('prod-name').value.trim();
    const category = document.getElementById('prod-category').value;
    const price = parseFloat(document.getElementById('prod-price').value);
    const badge = document.getElementById('prod-badge').value.trim();
    const description = document.getElementById('prod-description').value.trim();
    const available = document.getElementById('prod-available').checked;

    // Selected sizes
    const sizes = [];
    document.querySelectorAll('.size-tag-checkbox:checked').forEach(cb => sizes.push(cb.value));

    // Colors
    const colorsRaw = document.getElementById('prod-colors').value;
    const colors = colorsRaw.split(',').map(c => c.trim()).filter(Boolean);

    // Fallback image if none uploaded
    const images = currentUploadedImages.length > 0 
      ? currentUploadedImages 
      : ['assets/images/products/tee_cyber_samurai_back.jpg'];

    const payload = {
      name,
      category,
      price,
      badge: badge || null,
      description: description || '',
      available,
      sizes,
      colors,
      images
    };

    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving to Supabase...';
    }

    try {
      if (editingProductId) {
        await updateProductInSupabase(editingProductId, payload);
        showToast(`Updated product #${editingProductId} in Supabase!`);
      } else {
        await createProductInSupabase(payload);
        showToast('New streetwear drop created in Supabase!');
      }

      // Re-sync public cache and reload admin table
      await syncProductsFromSupabase();
      closeProductModal();
      await loadAndRenderProductsTable();

    } catch (err) {
      console.error('[GHOST LAB] Error saving product:', err);
      alert('Failed to save product to Supabase: ' + err.message);
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Product to Supabase';
      }
    }
  });
}

/**
 * Seed starter catalog into empty Supabase database
 */
async function seedDemoProducts() {
  const session = await getAdminSession();
  if (!session) {
    alert('Authentication required: You must be logged in as store owner to seed drops.');
    return;
  }

  if (!confirm('This will seed the initial 6 GHOST LAB streetwear drops into your Supabase database. Continue?')) {
    return;
  }

  showToast('Seeding initial drops to Supabase...');

  try {
    for (const p of INITIAL_PRODUCTS) {
      const payload = {
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.description,
        badge: p.badge || null,
        available: true,
        sizes: p.sizes,
        colors: p.colors.map(c => c.name),
        images: p.images
      };
      await createProductInSupabase(payload);
    }

    await syncProductsFromSupabase();
    showToast('Starter catalog successfully seeded into Supabase!');
    await loadAndRenderProductsTable();
  } catch (err) {
    console.error('[GHOST LAB] Seeding error:', err);
    alert('Failed to seed catalog: ' + err.message);
  }
}
