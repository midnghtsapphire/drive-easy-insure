import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CoverageTypes from "@/components/CoverageTypes";
import StateCompliance from "@/components/StateCompliance";
import QuoteWizard from "@/components/QuoteWizard";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <CoverageTypes />
        <QuoteWizard />
        <StateCompliance />
        <TrustSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
