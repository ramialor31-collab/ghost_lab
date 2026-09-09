# GHOST LAB — Production Public Deployment Guide

This guide provides step-by-step instructions for deploying the **GHOST LAB** (`@ghost.lab1`) website publicly to **Cloudflare Workers** (with Static Assets) or **Vercel** for free.

---

## ⚡ Quick Architecture Overview

* **Frontend**: Pure Vanilla HTML, CSS, and ES Modules compiled into `dist/`. No heavy bundle or transpilation needed.
* **Routing**: Client-side hash routing (`#/`, `#/shop`, `#/product/:id`, `#/admin`).
* **Database & Auth**: Supabase (`products` table, `product-images` bucket, Supabase Auth).
* **API Configuration (`/api/config`)**:
  * **Cloudflare Worker**: Handled by `worker.js` with `run_worker_first = ["/api/*"]`.
  * **Cloudflare Pages**: Preserved via `functions/api/config.js`.
  * **Vercel**: Preserved via `api/config.js`.
  * **Local Development**: Handled by `server.js` (`npm run dev`).
* **Security**: `.env` is ignored by Git and never committed. Your Supabase anon key is safely supplied via your Cloudflare dashboard environment variables.

---

## Option 1: Cloudflare Workers (Configured in `wrangler.toml`)

The repository includes `wrangler.toml` configured to serve static assets from `./dist` and route `/api/*` requests to `worker.js`.

### Step 1: Push Project to GitHub

If pushing your changes, run:

```bash
git add .
git commit -m "feat: configure Cloudflare Worker deployment"
git push origin main
```

*(Note: `.env` is in `.gitignore` and will NOT be pushed to GitHub, keeping your local configuration private).*

---

### Step 2: Configure Cloudflare Worker Project

In your Cloudflare Dashboard:
1. Go to **Workers & Pages** → select your `ghost-lab` Worker project.
2. In **Settings → Variables and Secrets**, add the following environment variables:

| Variable Name | Value |
|---|---|
| `SUPABASE_URL` | `https://lqkjaflazvekmrwwiqhk.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_bmzYqGgHCjSJlyV1hiQZGw_DNonpMfd` |

3. If deploying via Git integration or `wrangler deploy`:
   * **Build command**: `npm run build`
   * The build compiles production assets into `dist/` (total size ~6 MiB, well below the 25 MiB limit).
   * Static assets are served from `dist/` and `/api/config` is handled by `worker.js`.

---

### Step 3: Configure Build Settings

In the build configuration screen:

| Setting | Value |
|---|---|
| **Project name** | `ghost-lab` (or your preferred name) |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

---

### Step 4: Add Environment Variables

Scroll down to **Environment variables (advanced)** and click **Add variable**:

| Variable Name | Value |
|---|---|
| `SUPABASE_URL` | `https://lqkjaflazvekmrwwiqhk.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_bmzYqGgHCjSJlyV1hiQZGw_DNonpMfd` |

> [!TIP]
> Make sure the variables are added under **Production** (and optionally **Preview** if deploying preview branches). Cloudflare Pages Functions (`functions/api/config.js`) will read these variables securely at runtime whenever visitors access your site or dashboard. The build step (`npm run build`) does not require database access.

Click **Save and Deploy**.

---

### Step 5: Verify Deployment

Cloudflare Pages will build and deploy your site in ~30 seconds, providing a public URL like:
`https://ghost-lab.pages.dev`

1. **Storefront**: Open `https://ghost-lab.pages.dev/`. Verify the hero banner, marquee, and live Supabase streetwear drops load.
2. **Shop Catalog**: Go to `https://ghost-lab.pages.dev/#/shop` to verify products and stock status.
3. **Out of Stock**: Any item marked unavailable displays `OUT OF STOCK` with the order button disabled.
4. **Admin Dashboard**: Visit `https://ghost-lab.pages.dev/#/admin` (or click *Atelier Admin ⚙* in the footer) and sign in to manage drops.
5. **WhatsApp Orders**: Test clicking "Order via WhatsApp" on an available product—it pre-fills the message directly to Algerian WhatsApp number `0676870535`.

---

## Option 2: Vercel (Alternative Free Option)

The project also includes `api/config.js` for zero-configuration Vercel deployments.

1. Go to [vercel.com](https://vercel.com/) and click **Add New → Project**.
2. Import your GitHub repository.
3. In **Environment Variables**, add:
   * `SUPABASE_URL` = `https://lqkjaflazvekmrwwiqhk.supabase.co`
   * `SUPABASE_ANON_KEY` = `sb_publishable_bmzYqGgHCjSJlyV1hiQZGw_DNonpMfd`
4. Click **Deploy**.

---

## Custom Domain Setup (Optional)

To connect a custom domain (e.g. `ghostlab.dz` or `ghost-lab.com`):
1. In the Cloudflare Pages project, go to **Custom domains** → **Set up a custom domain**.
2. Enter your domain name and follow the DNS CNAME instructions.
3. SSL certificates are provisioned automatically and renewed for free.

---

## Local Development Maintenance

To continue developing locally at any time:
```bash
npm run dev
```
The site runs at `http://localhost:3000` connected to your local `.env`.
