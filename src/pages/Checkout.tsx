import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Shield, ArrowLeft, CreditCard, Lock, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SR22_POLICIES, PolicyOption } from "@/lib/stripe";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const state = searchParams.get("state") || "CA";
  const coverageType = searchParams.get("type") || "owner";

  const handleCheckout = async () => {
    if (!selectedPolicy) {
      toast.error("Please select a policy to continue.");
      return;
    }

    setIsProcessing(true);

    try {
      // Redirect to Stripe Checkout via Supabase Edge Function
      // In production: call your edge function to create a Stripe Checkout session
      // For now, show a demo confirmation
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

      if (!stripeKey || stripeKey.startsWith("pk_test_your")) {
        // Demo mode — show confirmation flow
        toast.success("Demo mode: Stripe not yet configured. Policy selected: " + selectedPolicy.name);
        navigate("/dashboard");
        return;
      }

      const userId = user?.id ?? "guest";
      toast.info("Redirecting to secure payment...");
      console.info("Create checkout session", { priceId: selectedPolicy.priceId, userId });
      // In production this would call: supabase.functions.invoke('create-checkout-session', { body: { priceId: selectedPolicy.priceId, userId: user?.id } })
      // Then: stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-primary-foreground">ReinstatePro</span>
          </Link>
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
            <Lock className="w-4 h-4 text-success" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to quotes
          </button>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-3">Select Your SR-22 Policy</h1>
            <p className="text-muted-foreground">
              {coverageType === "non-owner" ? "Non-owner" : "Standard"} SR-22 filing for{" "}
              <strong>{state === "CA" ? "California" : state === "CO" ? "Colorado" : "North Carolina"}</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {SR22_POLICIES.map((policy, index) => (
              <div
                key={policy.id}
                onClick={() => setSelectedPolicy(policy)}
                className={`relative bg-card rounded-2xl p-8 border-2 cursor-pointer transition-all duration-200 ${
                  selectedPolicy?.id === policy.id
                    ? "border-accent ring-2 ring-accent/20 shadow-card"
                    : "border-border hover:border-accent/40"
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full accent-gradient text-accent-foreground text-sm font-semibold shadow-glow">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-5 h-5 rounded-full border-2 mb-4 flex items-center justify-center transition-all ${
                  selectedPolicy?.id === policy.id ? "border-accent bg-accent" : "border-muted-foreground"
                }`}>
                  {selectedPolicy?.id === policy.id && (
                    <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{policy.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-accent">
                    ${(policy.price / 100).toFixed(0)}
                  </span>
                  <span className="text-muted-foreground">/{policy.interval}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{policy.description}</p>

                <ul className="space-y-2">
                  {policy.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {selectedPolicy && (
            <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{selectedPolicy.name}</span>
                  <span className="text-foreground">${(selectedPolicy.price / 100).toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SR-22 Filing Fee</span>
                  <span className="text-success font-medium">Included</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">State Processing</span>
                  <span className="text-success font-medium">Included</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span className="text-foreground">Total Today</span>
                  <span className="text-accent text-lg">${(selectedPolicy.price / 100).toFixed(2)}</span>
                </div>
              </div>

              {user?.email && (
                <p className="mb-4 text-center text-xs text-muted-foreground">
                  Checking out as {user.email}
                </p>
              )}

              <Button
                variant="hero"
                className="w-full"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Secure Checkout
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  256-bit SSL
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Powered by Stripe
                </div>
              </div>
            </div>
          )}

          {!selectedPolicy && (
            <p className="text-center text-muted-foreground">
              ↑ Select a policy above to continue
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
