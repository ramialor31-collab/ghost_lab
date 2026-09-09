/**
 * GHOST LAB — Supabase Official Client Integration
 * Secure configuration loaded via /api/config (Environment Variables)
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

let supabaseInstance = null;
let clientPromise = null;

/**
 * Returns the singleton Supabase client initialized with environment config
 * Ensures the session is restored from localStorage before returning.
 */
export async function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  if (!clientPromise) {
    clientPromise = (async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error(`Failed to load config: HTTP ${response.status}`);
        }
        const { supabaseUrl, supabaseAnonKey } = await response.json();
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error('Supabase environment variables are missing');
        }

        const client = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });

        // Ensure session has been restored from localStorage
        await client.auth.getSession();

        supabaseInstance = client;
        return supabaseInstance;
      } catch (err) {
        console.error('[GHOST LAB] Error initializing Supabase client:', err);
        throw err;
      }
    })();
  }

  return clientPromise;
}

/**
 * Fetch all products from Supabase
 */
export async function fetchProductsFromSupabase() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[GHOST LAB] Error fetching products from Supabase:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductByIdFromSupabase(id) {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`[GHOST LAB] Error fetching product ${id} from Supabase:`, error);
    throw error;
  }

  return data;
}

/**
 * Insert a new product into Supabase
 * Explicitly verifies the session and attaches:
 * 1. Authorization: Bearer <access_token> (guarantees authenticated session)
 * 2. Prefer: return=minimal (prevents RETURNING clause, avoiding SELECT RLS policy checks)
 */
export async function createProductInSupabase(productPayload) {
  const supabase = await getSupabase();

  // 1. Verify active authenticated session (with auto-refresh if near expiry)
  const session = await getAdminSession();
  if (!session || !session.access_token) {
    throw new Error('Authentication required: No active authenticated admin session found. Please sign in to the Admin Dashboard before saving products.');
  }

  // 2. Perform INSERT with return=minimal and explicit Authorization header
  const query = supabase
    .from('products')
    .insert([productPayload]);

  query.setHeader('Prefer', 'return=minimal');
  query.setHeader('Authorization', `Bearer ${session.access_token}`);

  const { error } = await query;

  if (error) {
    console.error('[GHOST LAB] Error creating product in Supabase:', error);
    throw error;
  }

  return { success: true };
}

/**
 * Update an existing product in Supabase
 */
export async function updateProductInSupabase(id, updatePayload) {
  const supabase = await getSupabase();

  // 1. Verify active authenticated session
  const session = await getAdminSession();
  if (!session || !session.access_token) {
    throw new Error('Authentication required: No active authenticated admin session found. Please sign in to update products.');
  }

  // 2. Perform UPDATE with return=minimal and explicit Authorization header
  const query = supabase
    .from('products')
    .update(updatePayload)
    .eq('id', id);

  query.setHeader('Prefer', 'return=minimal');
  query.setHeader('Authorization', `Bearer ${session.access_token}`);

  const { error } = await query;

  if (error) {
    console.error(`[GHOST LAB] Error updating product ${id} in Supabase:`, error);
    throw error;
  }

  return { success: true };
}

/**
 * Delete a product from Supabase
 */
export async function deleteProductFromSupabase(id) {
  const supabase = await getSupabase();

  // Verify active authenticated session
  const session = await getAdminSession();
  if (!session || !session.access_token) {
    throw new Error('Authentication required: No active authenticated admin session found. Please sign in to delete products.');
  }

  const query = supabase
    .from('products')
    .delete()
    .eq('id', id);

  query.setHeader('Prefer', 'return=minimal');
  query.setHeader('Authorization', `Bearer ${session.access_token}`);

  const { error } = await query;

  if (error) {
    console.error(`[GHOST LAB] Error deleting product ${id} from Supabase:`, error);
    throw error;
  }

  return true;
}

/**
 * Upload an image file to the `product-images` storage bucket
 * Returns the public URL for display
 */
export async function uploadProductImage(file) {
  const supabase = await getSupabase();

  // Verify active authenticated session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session || !session.access_token) {
    throw new Error('Authentication required: You must be logged in as store owner to upload product images.');
  }

  const bucketName = 'product-images';
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `products/${Date.now()}_${cleanName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error('[GHOST LAB] Storage upload error:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    publicUrl: publicUrl
  };
}

/**
 * Delete an image from the `product-images` storage bucket
 */
export async function deleteProductImage(filePath) {
  const supabase = await getSupabase();
  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);

  if (error) {
    console.error('[GHOST LAB] Error deleting image from storage:', error);
  }
}

/**
 * Admin Authentication Helpers
 */
export async function signInAdmin(email, password) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function signOutAdmin() {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getAdminSession() {
  const supabase = await getSupabase();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    if (error) console.error('[GHOST LAB] Session check error:', error);
    return null;
  }

  // Auto-refresh token if it expires in less than 60 seconds
  if (session.expires_at && session.expires_at * 1000 < Date.now() + 60000) {
    try {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError && refreshData?.session) {
        return refreshData.session;
      }
    } catch (e) {
      console.warn('[GHOST LAB] Session auto-refresh failed:', e);
    }
  }

  return session;
}

