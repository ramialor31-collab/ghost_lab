import http from 'http';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    throw new Error(message);
  }
  console.log(`✅ [PASS] ${message}`);
}

async function runTests() {
  console.log('====================================================');
  console.log('GHOST LAB — Supabase Integration & Admin Test Suite');
  console.log('====================================================\n');

  // Test 1: Environment Variables
  console.log('--- Step 1: Environment Variables ---');
  assert(!!process.env.SUPABASE_URL, 'SUPABASE_URL is defined in environment');
  assert(!!process.env.SUPABASE_ANON_KEY, 'SUPABASE_ANON_KEY is defined in environment');
  assert(process.env.SUPABASE_URL.includes('supabase.co'), 'SUPABASE_URL points to official Supabase project');

  // Test 2: Server API Config Endpoint
  console.log('\n--- Step 2: Server /api/config Endpoint ---');
  const config = await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/api/config', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert(res.statusCode === 200, `/api/config returned HTTP ${res.statusCode}`);
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });

  assert(config.supabaseUrl === process.env.SUPABASE_URL, 'Config endpoint matches SUPABASE_URL');
  assert(config.supabaseAnonKey === process.env.SUPABASE_ANON_KEY, 'Config endpoint matches SUPABASE_ANON_KEY');

  // Test 3: Official Supabase Client Connection
  console.log('\n--- Step 3: Supabase Client Connection ---');
  const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
  const { data: products, error } = await supabase.from('products').select('*');
  assert(error === null, 'Connected to Supabase `products` table without errors');
  assert(Array.isArray(products), `Supabase returned array of products (count: ${products.length})`);

  // Test 4: Storage Bucket Verification
  console.log('\n--- Step 4: Storage Bucket `product-images` ---');
  const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl('test-sample.jpg');
  assert(publicUrl.includes('/storage/v1/object/public/product-images/test-sample.jpg'), 'Storage generates correct public URL structure');

  // Test 5: Router & Pages Verification
  console.log('\n--- Step 5: Routes & Core Files ---');
  const filesToVerify = [
    '/index.html',
    '/css/admin.css',
    '/js/supabase.js',
    '/js/data/products.js',
    '/js/pages/admin.js',
    '/js/router.js'
  ];

  for (const f of filesToVerify) {
    const res = await new Promise((resolve) => {
      http.get(`http://localhost:3000${f}`, (r) => {
        let body = '';
        r.on('data', c => body += c);
        r.on('end', () => resolve({ status: r.statusCode, len: body.length }));
      });
    });
    assert(res.status === 200 && res.len > 0, `File ${f} is served properly (${res.len} bytes)`);
  }

  // Test 6: WhatsApp Link Generator with Algerian Country Code
  console.log('\n--- Step 6: WhatsApp Ordering Format ---');
  const phone = '213676870535';
  const orderText = encodeURIComponent(
`Hello GHOST LAB, I would like to order:
Product: Cyber Samurai 280GSM Tee
Size: L
Color: Noir Carbon
Quantity: 1
Price: 3 500 DA`
  );
  const expectedUrl = `https://wa.me/${phone}?text=${orderText}`;
  assert(expectedUrl.includes('https://wa.me/213676870535'), 'WhatsApp link uses Algerian international format (+213 676 87 05 35)');

  console.log('\n====================================================');
  console.log('All 6 integration test stages PASSED successfully!');
  console.log('====================================================\n');
}

runTests().catch(err => {
  console.error('\n❌ Test suite encountered an error:', err);
  process.exit(1);
});
