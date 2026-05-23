# Changelog

All notable changes to ReinstatePro are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [1.1.0] — 2026-05-23 — S2M revvel-standards pass

### Added
- Stripe checkout integration (`@stripe/stripe-js`, `src/lib/stripe.ts`, `src/pages/Checkout.tsx`)
- Policy selection page with 3-tier SR-22 plans ($79/$119/$159/mo)
- `/checkout` route wired into App.tsx and QuoteWizard step 5
- revvel-standards documentation suite: README, CHANGELOG, DEPLOYMENT_GUIDE, GO_TO_MARKET, BRAND_GUIDELINES, SECURITY, RESEARCH_ENGINE
- `.env.example` with all required environment variables
- `scripts/validate.js` — baseline validation script (runs via `npm test`)
- `npm test` / `npm run validate` scripts in package.json
- `.env` added to `.gitignore` to prevent secret leaks

### Changed
- README.md — comprehensive rewrite with revenue projections, tech stack table, route map
- QuoteWizard step 5 now includes "Purchase Policy Now" CTA linking to checkout

---

## [1.0.0] — 2026-01-31 — Initial release

### Added
- Landing page with hero, how it works, coverage types, quote wizard, state compliance, trust section, FAQ
- User authentication (Supabase Auth — sign up, log in, sign out)
- User dashboard — track quote requests and policy status
- Admin dashboard — manage all submissions, update status, contact leads
- SR-22 quote wizard — 5-step flow (state → violation → vehicle → contact info → confirmation)
- Supabase database schema: profiles, quote_submissions, user_roles
- California, Colorado, and North Carolina state support
- React/TypeScript/Vite/Tailwind/shadcn-ui stack
