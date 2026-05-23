# Deployment Guide — ReinstatePro

Complete step-by-step guide to deploying ReinstatePro to production on Vercel with Supabase backend.

---

## Architecture Overview

```text
Browser → Vercel (React SPA) → Supabase (Postgres + Auth + Edge Functions)
                                       ↕
                              Stripe Checkout (payments)
```

---

## Prerequisites

- [x] Node.js 18+
- [x] Supabase account + project — [supabase.com](https://supabase.com)
- [x] Stripe account — [stripe.com](https://stripe.com)
- [x] Vercel account — [vercel.com](https://vercel.com)
- [x] GitHub repo access

---

## Step 1 — Supabase Setup

### 1.1 Create Project
1. Log in to [app.supabase.com](https://app.supabase.com)
2. Click **New Project**
3. Set database password (save it securely)
4. Choose region closest to your users

### 1.2 Run Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Push migrations
supabase db push
```

### 1.3 Get API Keys
Go to **Settings → API** in your Supabase dashboard:
- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`
- Copy **Project Reference ID** → `VITE_SUPABASE_PROJECT_ID`

### 1.4 Configure Auth
Go to **Authentication → URL Configuration**:
- Site URL: `https://your-vercel-domain.vercel.app`
- Redirect URLs: `https://your-vercel-domain.vercel.app/**`

---

## Step 2 — Stripe Setup

### 2.1 Create Products & Prices
In your [Stripe Dashboard](https://dashboard.stripe.com):

1. Go to **Products → Add product**
2. Create three products:
   - **SR-22 Basic** — $79/month recurring
   - **SR-22 Standard** — $119/month recurring  
   - **SR-22 Premium** — $159/month recurring

3. Copy each **Price ID** (format: `price_xxxxx`)

4. Update `src/lib/stripe.ts` with your actual Price IDs:
```typescript
priceId: "price_YOUR_ACTUAL_PRICE_ID"
```

### 2.2 Get API Keys
- **Publishable key** (safe for browser): `pk_live_xxxxx` → `VITE_STRIPE_PUBLISHABLE_KEY`
- **Secret key** (server-side only, never commit): `sk_live_xxxxx` → Supabase Edge Function env var

### 2.3 Deploy Stripe Checkout Edge Function
```bash
# In supabase/functions/create-checkout-session/index.ts, create:
supabase functions new create-checkout-session
# Set Stripe secret key:
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx
supabase functions deploy create-checkout-session
```

### 2.4 Configure Webhooks
In Stripe Dashboard → **Webhooks → Add endpoint**:
- URL: `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

---

## Step 3 — Vercel Deployment

### 3.1 Connect Repository
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `midnghtsapphire/drive-easy-insure`
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### 3.2 Set Environment Variables
In Vercel → **Settings → Environment Variables**, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase URL | All |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon key | All |
| `VITE_SUPABASE_PROJECT_ID` | Your project ID | All |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key | All |

### 3.3 Deploy
```bash
# Or via CLI:
npm install -g vercel
vercel --prod
```

### 3.4 Set Custom Domain (Optional)
In Vercel → **Settings → Domains**:
- Add your custom domain (e.g., `reinstatepro.com`)
- Update DNS records at your registrar

---

## Step 4 — Post-Deployment Validation

```bash
# Run local validation checks
npm test

# Verify production build
npm run build
```

### Smoke Test Checklist
- [ ] Landing page loads at your Vercel URL
- [ ] Quote wizard completes all 5 steps
- [ ] Sign Up creates a new user in Supabase Auth
- [ ] Login redirects to `/dashboard`
- [ ] Dashboard shows quote history
- [ ] Admin login at `/admin` (requires admin role in `user_roles` table)
- [ ] Checkout page loads at `/checkout`
- [ ] Stripe checkout button responds

### Make Yourself Admin
```sql
-- Run in Supabase SQL editor
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-uuid-here', 'admin');
```

---

## Step 5 — Monitoring & Maintenance

### Recommended Tools
- **Vercel Analytics** — page views, performance
- **Supabase Dashboard** — database usage, auth users
- **Stripe Dashboard** — revenue, subscriptions, disputes
- **Sentry** (optional) — error monitoring

### Backup Strategy
- Supabase auto-backups daily (Pro plan)
- Export quote submissions monthly via Supabase CSV export

---

## Rollback

```bash
# Vercel rollback via dashboard: Deployments → select previous → Promote
# Or via CLI:
vercel rollback
```

---

## Environment Checklist

| Item | Dev | Staging | Production |
|------|-----|---------|------------|
| Supabase project | local/test | staging project | prod project |
| Stripe keys | `pk_test_` / `sk_test_` | `pk_test_` / `sk_test_` | `pk_live_` / `sk_live_` |
| Vercel URL | localhost:8080 | preview.vercel.app | custom domain |
| Email sending | Supabase default | Supabase default | Custom SMTP (recommended) |
