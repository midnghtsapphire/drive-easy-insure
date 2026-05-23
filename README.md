# ReinstatePro — Drive Easy Insure

**The fastest way to get SR-22 & FR-44 court-ordered insurance and get your license back.**

> 🌐 **Website in Test:** https://drive-easy-insure.vercel.app  
> 📊 **Status:** Production-ready  
> 🏦 **Revenue Model:** Monthly subscription + lead generation

---

## What Is This?

ReinstatePro is an online SR-22 and FR-44 insurance marketplace for drivers who need court-ordered coverage to reinstate their suspended or revoked driver's license. We match high-risk drivers with licensed insurance carriers in their state within minutes.

### Who Needs SR-22?
- Drivers convicted of DUI/DWI
- Drivers caught driving without insurance
- Drivers with suspended or revoked licenses
- At-fault accident drivers deemed high-risk
- Anyone with a court-ordered certificate of financial responsibility

### Available States
| State | SR-22 | FR-44 | Non-Owner SR-22 |
|-------|-------|-------|-----------------|
| California | ✅ | — | ✅ |
| Colorado | ✅ | — | ✅ |
| North Carolina | ✅ | — | ✅ |
| Florida / Virginia | Coming Soon | Coming Soon | Coming Soon |

---

## Key Features

- 🔄 **5-step quote wizard** — state, violation type, vehicle ownership, personal info, instant match
- 👤 **User accounts** — track all quote requests and policy status
- 🔐 **Admin dashboard** — manage submissions, update status, contact leads
- 💳 **Stripe checkout** — policy purchase with subscription billing
- 🏦 **Supabase backend** — auth, database, row-level security
- 📱 **Mobile-first** — fully responsive Tailwind CSS design
- ⚡ **Same-day filing** — electronic SR-22 submission to DMV

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account
- Stripe account (for payments)

### Development

```bash
git clone https://github.com/midnghtsapphire/drive-easy-insure.git
cd drive-easy-insure
npm install
cp .env.example .env
# Fill in your Supabase and Stripe keys
npm run dev
```

### Validation

```bash
npm test   # runs revvel-standards baseline validation
```

### Build

```bash
npm run build   # production build to dist/
```

---

## Environment Variables

See `.env.example` for all required variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | ✅ | Supabase anon key (safe to expose in browser) |
| `VITE_SUPABASE_PROJECT_ID` | ✅ | Supabase project ID |
| `VITE_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key (safe to expose in browser) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Postgres + Auth + Edge Functions) |
| Payments | Stripe Checkout |
| Routing | React Router v6 |
| State | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Hosting | Vercel |

---

## Revenue Model & Projections

| Stream | Model | Est. Monthly (Yr 1) |
|--------|-------|---------------------|
| Policy subscriptions | $79–$159/mo per policyholder | $15,000–$50,000 |
| Lead generation fees | $8–$25 per qualified lead | $5,000–$20,000 |
| Carrier commissions | 12–18% of first-year premium | $8,000–$30,000 |
| **Total (Yr 1 est.)** | | **$28K–$100K/mo** |

**3-Year Revenue Projection (toward $10M goal):**
- Year 1: $336K–$1.2M ARR
- Year 2: $1.5M–$4M ARR (3 states → 10 states)
- Year 3: $5M–$10M ARR (national coverage + FR-44)

**Market Size:** 4.2M active SR-22 filers in the US. Average premium $1,200/year. Total addressable market: $5B+ annually.

---

## Routes

| Path | Description | Auth Required |
|------|-------------|---------------|
| `/` | Landing page + quote wizard | No |
| `/login` | User login | No |
| `/signup` | User registration | No |
| `/dashboard` | User policy dashboard | Yes (user) |
| `/admin` | Admin management panel | Yes (admin) |
| `/checkout` | Policy selection + Stripe checkout | Recommended |

---

## Database Schema

Managed via Supabase migrations in `supabase/migrations/`:

- `profiles` — user profile data
- `quote_submissions` — quote requests from the wizard
- `user_roles` — admin role management

---

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full Vercel + Supabase deployment instructions.

---

## Market Research

See [GO_TO_MARKET.md](./GO_TO_MARKET.md) for competitive analysis, target personas, and launch strategy.

See [RESEARCH_ENGINE.md](./RESEARCH_ENGINE.md) for full research engine outputs, market data, and asset inventory.

---

## Security

See [SECURITY.md](./SECURITY.md) for vulnerability disclosure and security practices.

---

## Brand

See [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) for logo, colors, typography, and voice guidelines.

---

*ReinstatePro — Getting you back on the road, legally.*
