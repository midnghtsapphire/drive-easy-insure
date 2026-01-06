import { FileText, Search, Shield, Car } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      step: "01",
      title: "Share Your Details",
      description: "Complete our simple intake form with your violation type, state, and driving history. Takes under 3 minutes.",
    },
    {
      icon: Search,
      step: "02",
      title: "We Find Your Match",
      description: "Our system instantly routes you to carriers that specialize in court-ordered coverage in your state.",
    },
    {
      icon: Shield,
      step: "03",
      title: "Review & Choose",
      description: "Compare quotes from multiple insurers. No pressure, no sales calls—you're in complete control.",
    },
    {
      icon: Car,
      step: "04",
      title: "Get Filed & Drive",
      description: "We file your SR-22/FR-44 directly with your state's DMV. You're back on the road legally.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get compliant coverage in four easy steps. No phone calls required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-accent/30">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full hero-gradient flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
