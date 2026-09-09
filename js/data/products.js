/**
 * GHOST LAB — Central Product Catalog
 * Connected to Supabase `products` table with live sync & storage image support.
 * Brand: GHOST LAB (@ghost.lab1)
 * Pricing: Algerian Dinar (DA / DZD)
 */

import { fetchProductsFromSupabase } from '../supabase.js';

// Default starter catalog for offline/initial state
export const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Cyber Samurai 280GSM Tee',
    category: 't-shirts',
    price: 3500,
    badge: 'NEW DROP',
    badgeType: 'new',
    fabricWeight: '280 GSM Combed Cotton',
    fit: 'Boxy Drop-Shoulder Oversized',
    description: 'Heavyweight matte black drop-shoulder streetwear tee featuring our signature Cyber Samurai back illustration with Japanese kanji accents ("魂 | 幽霊 | 実験室"). Built with ultra-thick 280 GSM cotton and a snug ribbed neckline that holds shape wash after wash.',
    images: [
      'assets/images/products/tee_cyber_samurai_back.jpg',
      'assets/images/products/hoodie_core_front.jpg',
      'assets/images/lookbook/lifestyle_model.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir Carbon', hex: '#0a0a0c' },
      { name: 'Washed Ash', hex: '#26262b' }
    ],
    details: [
      '100% Ring-Spun Heavy Combed Cotton',
      'High-resolution DTF print on back, minimal front embroidery',
      'Pre-shrunk fabric to prevent post-wash shrinkage',
      'Designed and crafted in Algeria'
    ],
    care: [
      'Machine wash cold (30°C) inside out',
      'Do not iron directly over the graphic print',
      'Hang dry in shade to preserve deep black tone'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Ghost Core Embroidered Hoodie',
    category: 'hoodies',
    price: 6200,
    badge: 'HEAVYWEIGHT',
    badgeType: 'oversized',
    fabricWeight: '450 GSM French Terry',
    fit: 'Boxy Streetwear Oversized Cut',
    description: 'Our staple heavyweight 450 GSM French Terry hoodie. Features high-density white satin embroidery of "GHOST LAB 幽霊" centered on the chest and custom cuff embroidery on the left sleeve. Deep double-layered hood without cheap drawstrings for a structured silhouette.',
    images: [
      'assets/images/products/hoodie_core_front.jpg',
      'assets/images/products/hoodie_cyber_back.jpg',
      'assets/images/custom/embroidery_detail.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#08080a' },
      { name: 'Charcoal Noir', hex: '#1c1c22' }
    ],
    details: [
      '450 GSM Heavy French Terry Fleece',
      'High-Density Tatami & Satin Needlework Embroidery',
      'Heavy ribbed cuffs and waistband',
      'Zero synthetic piling'
    ],
    care: [
      'Wash inside out on gentle cold cycle',
      'Do not bleach',
      'Lay flat to dry'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Manga Spirit Bone Tee',
    category: 't-shirts',
    price: 3400,
    badge: 'ANIME DROP',
    badgeType: 'new',
    fabricWeight: '260 GSM Combed Cotton',
    fit: 'Relaxed Streetwear Fit',
    description: 'Vintage bone off-white heavyweight tee highlighting cyber manga mecha illustration and Japanese typographic elements ("ゴースト・ラボ"). Subtle vintage wash delivers a softened hand-feel with a crisp structural drop.',
    images: [
      'assets/images/products/tee_bone_front.jpg',
      'assets/images/lookbook/lifestyle_model.jpg',
      'assets/images/products/tee_cyber_samurai_back.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone Off-White', hex: '#e4e2d8' },
      { name: 'Stone Grey', hex: '#c5c5cb' }
    ],
    details: [
      '260 GSM Pre-Washed Vintage Cotton',
      'Durable discharge ink print technique',
      'Double-stitched seams and reinforced collar'
    ],
    care: [
      'Wash cold with similar light tones',
      'Iron inside out on medium heat'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Shadow Cyber Mecha Hoodie',
    category: 'hoodies',
    price: 6500,
    badge: 'LIMITED 1/50',
    badgeType: 'limited',
    fabricWeight: '450 GSM French Terry',
    fit: 'Extended Oversized Fit',
    description: 'Limited run hoodie showcasing our "Invisible But Present" (不可視だが存在する) cyber phantom motif on the full back. Built with 450 GSM heavyweight brushed fleece for Algiers winter and cool desert evenings.',
    images: [
      'assets/images/products/hoodie_cyber_back.jpg',
      'assets/images/products/hoodie_core_front.jpg',
      'assets/images/custom/workshop_print.jpg'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Abyssal Black', hex: '#070709' }
    ],
    details: [
      'Heavyweight 450 GSM Cotton Fleece',
      'Multi-color DTF back print + metallic silver chest embroidery',
      'Custom internal woven neck label'
    ],
    care: [
      'Delicate wash inside out',
      'Do not tumble dry'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: '5',
    name: 'Custom 1-of-1 Atelier Garment',
    category: 'custom',
    price: 4800,
    badge: 'ATELIER CUSTOM',
    badgeType: 'limited',
    fabricWeight: 'Heavyweight Custom Base',
    fit: 'Tailored Streetwear Cut',
    description: 'Bring your vision to life with GHOST LAB Atelier. Choose your base garment (Hoodie, T-shirt, or Crewneck) and send us your artwork, anime reference, or logo. We digitize the stitch file and execute high-density embroidery or DTF printing.',
    images: [
      'assets/images/custom/embroidery_detail.jpg',
      'assets/images/custom/workshop_print.jpg',
      'assets/images/products/hoodie_core_front.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir Matte', hex: '#0a0a0c' },
      { name: 'Bone White', hex: '#e8e6df' }
    ],
    details: [
      'Personalized digitizing by GHOST LAB specialists',
      'Embroidery up to 80,000 stitches or vibrant DTF film',
      'Digital mockup proof provided before stitching',
      'Direct WhatsApp consultation included'
    ],
    care: [
      'Follow care instructions based on selected blank garment'
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: '6',
    name: 'Ghost Lab Algiers Urban Tee',
    category: 't-shirts',
    price: 3200,
    badge: 'ESSENTIAL',
    badgeType: 'oversized',
    fabricWeight: '260 GSM Combed Cotton',
    fit: 'Boxy Heavyweight',
    description: 'Minimalist everyday streetwear essential featuring the GHOST LAB geometric chest emblem and technical industrial coordinates. Relaxed boxy cut designed specifically to wear over hoodies or as a standalone statement.',
    images: [
      'assets/images/lookbook/lifestyle_model.jpg',
      'assets/images/products/tee_cyber_samurai_back.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Matte Black', hex: '#0d0d10' },
      { name: 'Off-White', hex: '#e0ded6' }
    ],
    details: [
      'Heavyweight 260 GSM cotton',
      'Silkscreen puff and flat hybrid print',
      'Reinforced drop shoulder construction'
    ],
    care: [
      'Cold wash inside out',
      'Line dry'
    ],
    inStock: true,
    isFeatured: false
  }
];

// In-memory active cache
let activeProducts = [...INITIAL_PRODUCTS];
let isLoadedFromSupabase = false;

/**
 * Normalizes a database row from Supabase into our frontend product structure
 */
function normalizeSupabaseProduct(row) {
  const images = Array.isArray(row.images) && row.images.length > 0 
    ? row.images 
    : ['assets/images/products/tee_cyber_samurai_back.jpg'];

  const sizes = Array.isArray(row.sizes) && row.sizes.length > 0
    ? row.sizes
    : ['S', 'M', 'L', 'XL'];

  // Normalize colors (handle array of strings or array of objects)
  let colors = [];
  if (Array.isArray(row.colors) && row.colors.length > 0) {
    colors = row.colors.map(c => {
      if (typeof c === 'string') {
        const hex = c.toLowerCase().includes('white') || c.toLowerCase().includes('bone') ? '#e4e2d8' : '#0a0a0c';
        return { name: c, hex };
      }
      return c;
    });
  } else {
    colors = [{ name: 'Noir Matte', hex: '#0a0a0c' }];
  }

  let badgeType = 'new';
  const badgeStr = (row.badge || '').toUpperCase();
  if (badgeStr.includes('LIMITED')) badgeType = 'limited';
  else if (badgeStr.includes('HEAVY') || badgeStr.includes('OVERSIZED')) badgeType = 'oversized';

  return {
    id: String(row.id),
    name: row.name || 'GHOST LAB Streetwear Piece',
    price: Number(row.price) || 0,
    category: row.category || 't-shirts',
    description: row.description || 'Authentic streetwear crafted by GHOST LAB atelier.',
    images: images,
    sizes: sizes,
    colors: colors,
    badge: row.badge || '',
    badgeType: badgeType,
    available: row.available !== false,
    inStock: row.available !== false,
    fabricWeight: row.category === 'hoodies' ? '450 GSM French Terry' : '280 GSM Combed Cotton',
    fit: 'Boxy Drop-Shoulder Oversized',
    details: [
      'Premium heavyweight cotton / French Terry fleece',
      'Crafted in GHOST LAB Atelier, Algeria',
      'Pre-shrunk fabric to retain boxy silhouette'
    ],
    care: [
      'Machine wash cold (30°C) inside out',
      'Do not iron directly over prints or embroidery',
      'Line dry in shade'
    ],
    isFeatured: true,
    created_at: row.created_at
  };
}

/**
 * Synchronize products from Supabase
 */
export async function syncProductsFromSupabase() {
  try {
    const data = await fetchProductsFromSupabase();
    if (data && data.length > 0) {
      activeProducts = data.map(normalizeSupabaseProduct);
      isLoadedFromSupabase = true;
      console.log(`[GHOST LAB] Synchronized ${activeProducts.length} live products from Supabase.`);
    } else {
      // Keep initial demo products if DB is empty
      activeProducts = [...INITIAL_PRODUCTS];
      console.log('[GHOST LAB] Supabase products table is currently empty. Serving starter collection.');
    }
  } catch (err) {
    console.warn('[GHOST LAB] Supabase fetch fallback to local collection:', err.message);
    activeProducts = [...INITIAL_PRODUCTS];
  }

  return activeProducts;
}

export function getAllProducts() {
  return activeProducts;
}

export function getProductById(id) {
  return activeProducts.find(p => String(p.id) === String(id));
}

export function getFeaturedProducts() {
  return activeProducts.slice(0, 4);
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return activeProducts;
  if (category === 'new') return activeProducts.filter(p => p.badge && p.badge.length > 0);
  return activeProducts.filter(p => p.category === category);
}

export function getRelatedProducts(currentId, limit = 3) {
  return activeProducts.filter(p => String(p.id) !== String(currentId)).slice(0, limit);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('fr-DZ').format(price) + ' DA';
}

/**
 * Builds the official WhatsApp direct order URL
 * Algerian WhatsApp format: 0676870535 -> 213676870535
 */
export function buildWhatsAppOrderUrl(productName, size, color, quantity, price) {
  const phone = '213676870535';
  const text = 
`Hello GHOST LAB, I would like to order:
Product: ${productName}
Size: ${size}
Color: ${color}
Quantity: ${quantity}
Price: ${formatPrice(price * quantity)}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds the WhatsApp custom inquiry URL
 */
export function buildWhatsAppCustomUrl(garment, technique, placement, quantity, notes) {
  const phone = '213676870535';
  const text = 
`Hello GHOST LAB, I would like to make a custom inquiry:
Garment: ${garment}
Technique: ${technique}
Placement: ${placement}
Quantity: ${quantity}
Details / Idea: ${notes || 'Standard custom piece'}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
