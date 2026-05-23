import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;

export const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

export interface PolicyOption {
  id: string;
  name: string;
  price: number; // in cents
  interval: "month" | "year";
  description: string;
  features: string[];
  priceId: string; // Stripe Price ID
}

export const SR22_POLICIES: PolicyOption[] = [
  {
    id: "sr22-basic",
    name: "SR-22 Basic",
    price: 7900,
    interval: "month",
    description: "State minimum liability coverage with SR-22 filing",
    features: [
      "State minimum liability",
      "Electronic SR-22 filing included",
      "Same-day processing",
      "Online proof of insurance",
    ],
    priceId: "price_sr22_basic_monthly",
  },
  {
    id: "sr22-standard",
    name: "SR-22 Standard",
    price: 11900,
    interval: "month",
    description: "Enhanced coverage with comprehensive options",
    features: [
      "Higher liability limits",
      "Electronic SR-22 filing included",
      "Roadside assistance",
      "Rental car coverage",
      "24/7 claims support",
    ],
    priceId: "price_sr22_standard_monthly",
  },
  {
    id: "sr22-premium",
    name: "SR-22 Premium",
    price: 15900,
    interval: "month",
    description: "Full coverage for complete peace of mind",
    features: [
      "Full coverage (comp + collision)",
      "Electronic SR-22 filing included",
      "Accident forgiveness",
      "Gap coverage",
      "Priority claims processing",
      "Dedicated agent",
    ],
    priceId: "price_sr22_premium_monthly",
  },
];
