# Research Engine — ReinstatePro

## Part 1: Market Research Engine

### SR-22 Insurance Market Statistics
- Estimated active SR-22 filer population in the US: **~4.2M drivers**
- Average filing duration: **~3 years**
- Average annual premium for SR-22/high-risk insureds: **~$1,200/year**
- Total addressable market: **$5B+ annually**
- Source basis: NAIC private passenger auto insurance reports, public DMV reinstatement guidance, insurance industry pricing studies, and carrier rate comparisons

### State-by-State Breakdown
- **California:** largest initial market, estimated **800K+ filers or recently affected reinstatement drivers**; strong non-owner demand in urban markets
- **Colorado:** SR-22 required after DUI, major violations, or uninsured incidents; moderate volume with high urgency intent
- **North Carolina:** SR-22 demand driven by reinstatement and high-risk enforcement; strong broker-led conversion opportunity

### Demographic Data
Common SR-22 filer patterns from industry and enforcement data:
- Age concentration: 25–44
- Income concentration: low-to-middle income households balancing reinstatement urgency and affordability
- Common triggers: DUI/DWI, uninsured driving, suspended license, at-fault incidents, repeated moving violations

### Pricing Data
Typical pricing ranges vary by state, carrier, and violation severity:

| State | Standard SR-22 Annual | Non-Owner Annual | Severe Violation Range |
|------|------------------------|------------------|------------------------|
| California | $900–$1,600 | $500–$1,000 | $1,800+ |
| Colorado | $850–$1,500 | $450–$900 | $1,700+ |
| North Carolina | $950–$1,700 | $550–$1,050 | $1,900+ |

### Competitor Pricing Comparison

| Provider | Entry Monthly Estimate | Notes |
|----------|------------------------|-------|
| ReinstatePro Basic | $79 | Includes filing and digital-first experience |
| The General | $85–$150 | Brand-heavy, quote dependent |
| Dairyland | $70–$145 | Often competitive for high-risk drivers |
| SR22Insure | Brokered | Pricing varies by partner |
| EzSR22.com | Brokered | Pricing varies by state/carrier |

## Part 2: SEO & Content Research Engine

### Top Keyword Opportunities
- **"sr22 insurance"** — ~49K/mo
- **"sr22 near me"** — ~12K/mo
- **"cheap sr22 insurance"** — ~18K/mo
- **"non owner sr22"** — ~8K/mo
- **"fr44 insurance"** — ~5K/mo
- **"sr22 california"** — ~9K/mo
- Additional state modifiers for Colorado and North Carolina should be prioritized alongside city-level pages

### Content Gaps vs Competitors
- Better explanations of reinstatement timelines
- More transparent pricing education
- Non-owner SR-22 guides tied to real-life scenarios
- State-specific DMV filing walkthroughs

### Featured Snippet Opportunities
- "What is SR-22 insurance?"
- "How long do I need an SR-22?"
- "How much is non-owner SR-22 insurance?"
- "How do I get my license reinstated after a DUI?"

### Local SEO Strategy
- Create landing pages around DMV office clusters and metro regions
- Add local FAQ schema for court, DMV, and filing timelines
- Publish localized pages for high-volume areas in CA, CO, and NC

## Part 3: Paid Acquisition Research Engine

### Search Advertising
- Google Ads CPCs for SR-22 terms typically range **$8–$35**, with highest CPCs on "cheap", "near me", and state-specific emergency queries
- High-intent campaigns should prioritize exact match and state-specific landing pages

### Meta / Facebook Targeting
- Interest and behavior proxies around DUI education, reinstatement research, and insurance shopping
- Retarget visitors who complete 2+ wizard steps but do not submit

### Programmatic Opportunities
- Insurance intent marketplaces
- Contextual placements on legal, DMV, and reinstatement content
- Retargeting pools built from site engagement and quote abandonment

### Budget Recommendations
- Initial paid search budget: **$3K–$7K/month**
- Meta retargeting: **$1K–$2K/month**
- Target blended CAC: **$120–$300** depending on state and policy tier

## Part 4: Partnership Research Engine

- **DUI defense attorneys:** strong referral alignment at the moment of legal urgency
- **Court clerks / court systems:** educational handoffs where referral rules permit
- **DMV referral programs:** informational partnerships and resource listings
- **Bail bond companies:** co-marketing with overlapping urgent mobility needs
- **Car rental companies:** non-owner SR-22 referrals for drivers needing compliance before ownership

## Part 5: Technology & Integration Research Engine

- **Carrier APIs:** Progressive, Dairyland, The General, and regional broker connectivity should be evaluated for quote automation
- **DMV electronic filing:** prioritize state-specific electronic submission workflows where APIs or partner processes exist
- **Email automation:** Klaviyo or Postmark for quote follow-up, reminder, and win-back flows
- **CRM:** HubSpot for lead routing, partner attribution, and close-loop reporting
- **Analytics stack:** GA4, Search Console, Vercel Analytics, and Stripe reporting with funnel dashboards

## Part 6: Assets & Artifacts Inventory

```text
src/components/Hero.tsx         — Hero section with CTA and stats
src/components/QuoteWizard.tsx  — 5-step quote collection wizard
src/components/CoverageTypes.tsx — SR-22/FR-44/Non-owner coverage cards
src/components/HowItWorks.tsx   — 3-step process explainer
src/components/FAQ.tsx          — Frequently asked questions
src/components/TrustSection.tsx — Social proof and trust signals
src/components/StateCompliance.tsx — State-specific compliance info
src/components/Header.tsx       — Navigation header
src/components/Footer.tsx       — Site footer
src/pages/Dashboard.tsx         — User quote tracking dashboard
src/pages/Admin.tsx             — Admin management panel
src/pages/Checkout.tsx          — Policy selection + Stripe checkout
src/lib/stripe.ts               — Stripe integration + policy definitions
supabase/migrations/            — Database schema migrations
```

## Part 7: Suggestions & Recommendations

### Short-Term (0–30 Days)
- Add email automation for quote follow-ups
- Set up Google Analytics and Search Console
- Add a blog for SEO content and state guides

### Medium-Term (30–90 Days)
- Expand to 5 more states: FL, TX, AZ, OH, IL
- Add carrier API integrations
- Build an affiliate and referral program

### Long-Term (90+ Days)
- Launch a white-label B2B product for insurance agents
- Build a mobile app experience
- Add FR-44 coverage and national expansion
