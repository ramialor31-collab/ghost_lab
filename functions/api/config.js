/**
 * Cloudflare Pages Function — GET /api/config
 * Automatically executed at the edge by Cloudflare Pages.
 * Injects SUPABASE_URL and SUPABASE_ANON_KEY configured in Cloudflare Pages Dashboard.
 */
export async function onRequestGet(context) {
  const { env } = context;

  const supabaseUrl = env.SUPABASE_URL || '';
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || '';

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
