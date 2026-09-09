const http = require('http');

function testUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, contentType: res.headers['content-type'], length: data.length });
      });
    }).on('error', reject);
  });
}

async function run() {
  const paths = [
    '/',
    '/index.html',
    '/css/variables.css',
    '/css/base.css',
    '/css/components.css',
    '/css/pages.css',
    '/css/admin.css',
    '/css/responsive.css',
    '/api/config',
    '/js/app.js',
    '/js/router.js',
    '/js/supabase.js',
    '/js/data/products.js',
    '/js/components/navbar.js',
    '/js/components/footer.js',
    '/js/components/product-card.js',
    '/js/components/size-modal.js',
    '/js/components/toast.js',
    '/js/pages/home.js',
    '/js/pages/shop.js',
    '/js/pages/product-detail.js',
    '/js/pages/custom.js',
    '/js/pages/about.js',
    '/js/pages/contact.js',
    '/js/pages/admin.js',
    '/assets/images/logo.svg',
    '/assets/images/products/tee_cyber_samurai_back.jpg',
    '/assets/images/products/hoodie_core_front.jpg',
    '/assets/images/products/tee_bone_front.jpg',
    '/assets/images/custom/embroidery_detail.jpg',
    '/assets/images/custom/workshop_print.jpg',
    '/assets/images/lookbook/hero_lookbook.jpg',
    '/assets/images/lookbook/lifestyle_model.jpg'
  ];

  console.log('Testing asset endpoints...');
  let failed = 0;
  for (const p of paths) {
    try {
      const res = await testUrl(p);
      if (res.status === 200 && res.length > 0) {
        console.log(`[PASS] ${p} -> ${res.status} (${res.contentType}, ${res.length} bytes)`);
      } else {
        console.error(`[FAIL] ${p} -> ${res.status} (${res.length} bytes)`);
        failed++;
      }
    } catch (e) {
      console.error(`[ERR] ${p} -> ${e.message}`);
      failed++;
    }
  }

  if (failed === 0) {
    console.log('\nAll 29 endpoints returned HTTP 200 with valid content!');
  } else {
    console.error(`\n${failed} endpoints failed.`);
    process.exit(1);
  }
}

run();
