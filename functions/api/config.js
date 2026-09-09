/**
 * Cloudflare Pages Function — /api/config
 * Automatically executed at the edge by Cloudflare Pages.
 * Injects SUPABASE_URL and SUPABASE_ANON_KEY configured in Cloudflare Pages Dashboard.
 */
export async function onRequest(context) {
  const { env, request } = context;

  // Handle CORS preflight options
  if (request && request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  const supabaseUrl = (env && env.SUPABASE_URL) || '';
  const supabaseAnonKey = (env && env.SUPABASE_ANON_KEY) || '';

  return new Response(
    JSON.stringify({
      supabaseUrl,
      supabaseAnonKey
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}

export async function onRequestGet(context) {
  return onRequest(context);
}
