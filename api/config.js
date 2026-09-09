/**
 * Vercel Serverless Function — GET /api/config
 * Automatically executed as a serverless route by Vercel.
 * Injects SUPABASE_URL and SUPABASE_ANON_KEY from Vercel Environment Variables.
 */
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
  });
}
