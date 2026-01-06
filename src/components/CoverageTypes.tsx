import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const CoverageTypes = () => {
  const coverageTypes = [
    {
      title: "SR-22 Insurance",
      subtitle: "Certificate of Financial Responsibility",
      description: "Required in most states after DUI/DWI, reckless driving, or driving without insurance. We file directly with your DMV.",
      features: [
        "Required for license reinstatement",
        "Typically required for 3 years",
        "Electronic filing available",
        "Covers liability requirements",
      ],
      states: ["California", "Colorado", "North Carolina"],
      popular: true,
    },
    {
      title: "FR-44 Insurance",
      subtitle: "Higher Coverage Requirements",
      description: "Virginia and Florida require FR-44 for DUI convictions. Higher liability limits than standard SR-22.",
      features: [
        "Higher liability limits required",
        "Required for DUI convictions",
        "State-specific requirements",
        "Comprehensive options available",
      ],
      states: ["Coming Soon"],
      popular: false,
    },
    {
      title: "Non-Owner SR-22",
      subtitle: "For Drivers Without a Vehicle",
      description: "Don't own a car but need to reinstate your license? Non-owner SR-22 provides the coverage you need.",
      features: [
        "No vehicle required",
        "Satisfies court requirements",
        "Lower premiums than owner policies",
        "Covers liability when driving any car",
      ],
      states: ["California", "Colorado", "North Carolina"],
      popular: false,
    },
  ];

  return (
    <section id="coverage" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Coverage Options
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Find Your Required Coverage
          </h2>
          <p className="text-lg text-muted-foreground">
            We specialize in court-ordered insurance. Choose the coverage type that matches your requirements.
          </p>
        </div>

        {/* Coverage Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coverageTypes.map((coverage, index) => (
            <div 
              key={index}
              className={`relative bg-card rounded-2xl p-8 shadow-soft border transition-all duration-300 hover:shadow-card ${
                coverage.popular 
                  ? 'border-accent ring-2 ring-accent/20' 
                  : 'border-border hover:border-accent/30'
              }`}
            >
              {/* Popular badge */}
              {coverage.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 rounded-full accent-gradient text-accent-foreground text-sm font-semibold shadow-glow">
                    Most Common
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6 pt-2">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {coverage.title}
                </h3>
                <p className="text-sm text-accent font-medium">
                  {coverage.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {coverage.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {coverage.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* States */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Available in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {coverage.states.map((state, sIndex) => (
                    <span 
                      key={sIndex}
                      className={`text-xs px-2 py-1 rounded-md ${
                        state === "Coming Soon" 
                          ? 'bg-muted text-muted-foreground' 
                          : 'bg-success/10 text-success'
                      }`}
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button 
                variant={coverage.popular ? "hero" : "subtle"} 
                className="w-full mt-6"
              >
                Get {coverage.title.split(" ")[0]} Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Compliance Note */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-accent/5 border border-accent/20">
            <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Important Compliance Note</h4>
              <p className="text-sm text-muted-foreground">
                SR-22 and FR-44 requirements vary by state and violation type. Our system automatically checks your specific requirements and ensures you get the correct coverage. Filing without proper coverage can result in license suspension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageTypes;
