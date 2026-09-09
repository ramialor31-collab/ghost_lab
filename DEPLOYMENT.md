# GHOST LAB — Production Public Deployment Guide

This guide provides step-by-step instructions for deploying the **GHOST LAB** (`@ghost.lab1`) website publicly to **Cloudflare Pages** (recommended) or **Vercel** for free.

---

## ⚡ Quick Architecture Overview

* **Frontend**: Pure Vanilla HTML, CSS, and ES Modules. No heavy bundle or transpilation needed.
* **Routing**: Client-side hash routing (`#/`, `#/shop`, `#/product/:id`, `#/admin`).
* **Database & Auth**: Supabase (`products` table, `product-images` bucket, Supabase Auth).
* **API Configuration (`/api/config`)**:
  * **Cloudflare Pages**: Automatically handled at the edge by `functions/api/config.js`.
  * **Vercel**: Automatically handled by `api/config.js`.
  * **Local Development**: Handled by `server.js` (`npm run dev`).
* **Security**: `.env` is ignored by Git and never committed. Your Supabase anon key is safely supplied via your hosting dashboard environment variables.

---

## Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages provides unlimited free bandwidth, high-speed worldwide CDN caching, and built-in edge functions.

### Step 1: Push Project to GitHub

If you haven't initialized a Git repository yet, run in your terminal:

```bash
git init
git add .
git commit -m "feat: production ready GHOST LAB streetwear website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

*(Note: `.env` is in `.gitignore` and will NOT be pushed to GitHub, keeping your local configuration private).*

---

### Step 2: Create a Cloudflare Pages Project

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, click **Workers & Pages**.
3. Click **Create Application** → select the **Pages** tab → click **Connect to Git**.
4. Authorize GitHub and select your `ghost_lab` repository.
5. Click **Begin setup**.

---

### Step 3: Configure Build Settings

In the build configuration screen:

| Setting | Value |
|---|---|
| **Project name** | `ghost-lab` (or your preferred name) |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | `npm run build` |
| **Build output directory** | `.` (a single dot for the root directory) |

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
