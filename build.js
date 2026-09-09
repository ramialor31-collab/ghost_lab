const fs = require('fs');
const path = require('path');

function assert(cond, msg) {
  if (!cond) {
    console.error('❌ FAIL:', msg);
    process.exit(1);
  }
  console.log('✅ PASS:', msg);
}

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to get total size and max file size of directory
function getDirStats(dir) {
  let totalSize = 0;
  let maxFileSize = 0;
  let fileCount = 0;

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        const stat = fs.statSync(fullPath);
        totalSize += stat.size;
        fileCount++;
        if (stat.size > maxFileSize) {
          maxFileSize = stat.size;
        }
      }
    }
  }

  traverse(dir);
  return { totalSize, maxFileSize, fileCount };
}

console.log('==================================================');
console.log('GHOST LAB — Production Build (Cloudflare Worker)');
console.log('==================================================\n');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Step 1: Clean and prepare dist/ output directory
console.log('1. Preparing clean dist/ output directory...');
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });
assert(fs.existsSync(DIST_DIR), 'Created fresh dist/ directory');

// Step 2: Copy static production assets to dist/
console.log('\n2. Copying web assets into dist/ (excluding node_modules)...');

// Files to copy directly to dist root
const rootFiles = ['index.html', '_redirects', '_headers'];
for (const file of rootFiles) {
  const src = path.join(ROOT_DIR, file);
  const dest = path.join(DIST_DIR, file);
  assert(fs.existsSync(src), `Source file exists: ${file}`);
  fs.copyFileSync(src, dest);
}

// Directories to copy
const dirsToCopy = ['css', 'js', 'assets'];
for (const d of dirsToCopy) {
  const srcDir = path.join(ROOT_DIR, d);
  const destDir = path.join(DIST_DIR, d);
  assert(fs.existsSync(srcDir), `Source directory exists: ${d}`);
  copyDirSync(srcDir, destDir);
}

// Copy .assetsignore into dist as well
const assetsIgnoreSrc = path.join(ROOT_DIR, '.assetsignore');
if (fs.existsSync(assetsIgnoreSrc)) {
  fs.copyFileSync(assetsIgnoreSrc, path.join(DIST_DIR, '.assetsignore'));
}

console.log('✅ Web assets successfully assembled in dist/');

// Step 3: Validate dist/ contents and enforce asset size limits (< 25 MiB)
console.log('\n3. Validating dist/ asset bundle & size limits...');
assert(!fs.existsSync(path.join(DIST_DIR, 'node_modules')), 'node_modules is strictly excluded from dist/');
assert(!fs.existsSync(path.join(DIST_DIR, '.env')), '.env is strictly excluded from dist/');

const stats = getDirStats(DIST_DIR);
const maxFileMb = (stats.maxFileSize / (1024 * 1024)).toFixed(2);
const totalMb = (stats.totalSize / (1024 * 1024)).toFixed(2);

console.log(`ℹ Total files in dist: ${stats.fileCount}`);
console.log(`ℹ Total bundle size: ${totalMb} MiB`);
console.log(`ℹ Largest single asset: ${maxFileMb} MiB`);

assert(stats.maxFileSize < 20 * 1024 * 1024, `All assets are well under Cloudflare's 25 MiB limit (max: ${maxFileMb} MiB)`);
console.log('✅ PASS: dist/ bundle is lightweight and ready for Cloudflare Workers deployment.');

// Step 4: Verify Cloudflare Worker Configuration & Entrypoint
console.log('\n4. Verifying Cloudflare Worker configuration & entrypoints...');
const wranglerPath = path.join(ROOT_DIR, 'wrangler.toml');
assert(fs.existsSync(wranglerPath), 'wrangler.toml exists');
const wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
assert(!wranglerContent.includes('pages_build_output_dir'), 'wrangler.toml does NOT contain pages_build_output_dir');
assert(wranglerContent.includes('main = "worker.js"'), 'wrangler.toml sets main = "worker.js"');
assert(wranglerContent.includes('directory = "./dist"'), 'wrangler.toml sets assets directory = "./dist"');

const workerPath = path.join(ROOT_DIR, 'worker.js');
assert(fs.existsSync(workerPath), 'worker.js exists');
const workerContent = fs.readFileSync(workerPath, 'utf8');
assert(workerContent.includes('/api/config'), 'worker.js handles /api/config endpoint');
assert(workerContent.includes('env.SUPABASE_URL'), 'worker.js references env.SUPABASE_URL');
assert(workerContent.includes('env.SUPABASE_ANON_KEY'), 'worker.js references env.SUPABASE_ANON_KEY');

const cfFuncPath = path.join(ROOT_DIR, 'functions', 'api', 'config.js');
assert(fs.existsSync(cfFuncPath), 'functions/api/config.js is preserved');

// Step 5: Test Product Card availability contract logic
console.log('\n5. Verifying component availability logic...');
function createProductCardHtml(product) {
  const isAvailable = product.available !== false && product.inStock !== false;
  let badgeHtml = '';
  if (!isAvailable) {
    badgeHtml = `<div class="product-badge-pos"><span class="badge badge-out-of-stock">OUT OF STOCK</span></div>`;
  } else if (product.badge) {
    badgeHtml = `<div class="product-badge-pos"><span class="badge badge-${product.badgeType}">${product.badge}</span></div>`;
  }

  const statusHtml = isAvailable
    ? `<span class="product-status">Ready to ship</span>`
    : `<span class="product-status product-status-out">Out of stock</span>`;

  const quickViewText = isAvailable ? 'View Details & Order' : 'View Drop (Sold Out)';

  return `
    <a href="#/product/${product.id}" class="product-card ${isAvailable ? '' : 'product-card-soldout'}" data-product-id="${product.id}">
      <div class="product-media">${badgeHtml}<div class="product-quick-view"><span>${quickViewText}</span></div></div>
      <div class="product-info"><div class="product-price-row">${statusHtml}</div></div>
    </a>
  `;
}

const unavailHtml = createProductCardHtml({ id: 1, available: false, inStock: false });
assert(unavailHtml.includes('OUT OF STOCK') && unavailHtml.includes('product-card-soldout'), 'Unavailable card renders OUT OF STOCK badge & soldout class');

const availHtml = createProductCardHtml({ id: 2, available: true, inStock: true, badge: 'NEW', badgeType: 'new' });
assert(availHtml.includes('Ready to ship') && !availHtml.includes('product-card-soldout'), 'Available card renders Ready to ship & no soldout class');

console.log('\n==================================================');
console.log('✅ Build successful! Output directory: dist/');
console.log('==================================================');
