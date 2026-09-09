/**
 * Cloudflare Worker — GHOST LAB
 * Serves static assets from dist/ and handles /api/config using environment variables.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle /api/config endpoint
    if (url.pathname === '/api/config' || url.pathname === '/api/config/') {
      if (request.method === 'OPTIONS') {
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

    // 2. Delegate to static assets in dist/
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
