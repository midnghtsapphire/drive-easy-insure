import { Shield, Lock, Award, Users } from "lucide-react";

const TrustSection = () => {
  const trustItems = [
    {
      icon: Shield,
      title: "Licensed & Compliant",
      description: "Fully licensed insurance agency operating in all service states.",
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protects all your personal information.",
    },
    {
      icon: Award,
      title: "A+ Rated Carriers",
      description: "We partner only with financially stable, A-rated insurance companies.",
    },
    {
      icon: Users,
      title: "50,000+ Drivers Helped",
      description: "Trusted by thousands to get back on the road legally.",
    },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/20 mx-auto mb-4 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-primary-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
