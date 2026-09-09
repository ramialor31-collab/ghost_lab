import { 
  getAllProducts, 
  getProductById, 
  getProductsByCategory, 
  formatPrice, 
  buildWhatsAppOrderUrl, 
  buildWhatsAppCustomUrl 
} from './js/data/products.js';

console.log('Testing Products Catalog & WhatsApp URL Generators:');

// Test 1: Products
const products = getAllProducts();
console.log(`[PASS] Total products: ${products.length}`);
if (products.length < 5) throw new Error('Expected at least 5 products');

// Test 2: Categories
const tees = getProductsByCategory('t-shirts');
const hoodies = getProductsByCategory('hoodies');
const custom = getProductsByCategory('custom');
console.log(`[PASS] Category counts: Tees=${tees.length}, Hoodies=${hoodies.length}, Custom=${custom.length}`);

// Test 3: Product by ID
const tee = getProductById('cyber-samurai-tee');
if (!tee) throw new Error('Could not find cyber-samurai-tee');
console.log(`[PASS] Product found: ${tee.name}, Price: ${formatPrice(tee.price)}`);

// Test 4: WhatsApp Order URL format
const sampleUrl = buildWhatsAppOrderUrl(tee.name, 'L', 'Noir Carbon', 2, tee.price);
console.log(`[PASS] Generated WhatsApp Order URL:\n${sampleUrl}`);

if (!sampleUrl.includes('https://wa.me/213676870535?text=')) {
  throw new Error('Invalid WhatsApp phone number or prefix in order URL');
}
if (!sampleUrl.includes(encodeURIComponent('Cyber Samurai 280GSM Tee'))) {
  throw new Error('Product name missing from encoded WhatsApp URL');
}
if (!sampleUrl.includes(encodeURIComponent('Size: L'))) {
  throw new Error('Size missing from encoded WhatsApp URL');
}
if (!sampleUrl.includes(encodeURIComponent('Color: Noir Carbon'))) {
  throw new Error('Color missing from encoded WhatsApp URL');
}
if (!sampleUrl.includes(encodeURIComponent('Quantity: 2'))) {
  throw new Error('Quantity missing from encoded WhatsApp URL');
}

// Test 5: Custom Inquiry WhatsApp URL
const customUrl = buildWhatsAppCustomUrl('Heavy French Terry Hoodie (450 GSM)', 'High-Density Embroidery', 'Full Back Artwork', '1 piece', 'Anime reference on back');
console.log(`\n[PASS] Generated Custom Inquiry WhatsApp URL:\n${customUrl}`);
if (!customUrl.includes('https://wa.me/213676870535?text=')) {
  throw new Error('Invalid WhatsApp custom URL');
}

console.log('\nAll business logic and WhatsApp URL generation unit tests PASSED!');
