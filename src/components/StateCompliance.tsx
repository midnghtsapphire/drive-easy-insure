import { CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const StateCompliance = () => {
  const states = [
    {
      name: "California",
      code: "CA",
      requirements: [
        "SR-22 required for 3 years",
        "Minimum: 15/30/5 liability",
        "Electronic filing available",
        "DMV notification within 30 days",
      ],
      filingFee: "$25",
      processingTime: "Same day",
    },
    {
      name: "Colorado",
      code: "CO",
      requirements: [
        "SR-22 required for 3 years",
        "Minimum: 25/50/15 liability",
        "Electronic filing available",
        "Insurance verification required",
      ],
      filingFee: "$20",
      processingTime: "Same day",
    },
    {
      name: "North Carolina",
      code: "NC",
      requirements: [
        "SR-22 required for 3 years",
        "Minimum: 30/60/25 liability",
        "Physical or electronic filing",
        "DMV Form DL-123 required",
      ],
      filingFee: "$15",
      processingTime: "1-2 business days",
    },
  ];

  return (
    <section id="states" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
            State Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            State-Specific Requirements
          </h2>
          <p className="text-lg text-muted-foreground">
            Each state has unique SR-22 requirements. We handle all compliance details for you.
          </p>
        </div>

        {/* State Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {states.map((state, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="hero-gradient p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-foreground">
                      {state.name}
                    </h3>
                    <span className="text-sm text-primary-foreground/70">
                      {state.code} Requirements
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-lg font-bold text-foreground">{state.filingFee}</div>
                    <div className="text-xs text-muted-foreground">Filing Fee</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-lg font-bold text-accent">{state.processingTime}</div>
                    <div className="text-xs text-muted-foreground">Processing</div>
                  </div>
                </div>

                {/* Requirements */}
                <ul className="space-y-3 mb-6">
                  {state.requirements.map((req, rIndex) => (
                    <li key={rIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="subtle" className="w-full">
                  Get {state.code} Quote
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StateCompliance;
