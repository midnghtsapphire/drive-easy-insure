import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  state: string;
  violationType: string;
  hasVehicle: boolean | null;
  coverageType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  consent: boolean;
}

const QuoteWizard = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    state: "",
    violationType: "",
    hasVehicle: null,
    coverageType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    consent: false,
  });

  const states = [
    { code: "CA", name: "California", available: true },
    { code: "CO", name: "Colorado", available: true },
    { code: "NC", name: "North Carolina", available: true },
  ];

  const violationTypes = [
    { id: "dui", label: "DUI/DWI", description: "Driving under the influence conviction" },
    { id: "reckless", label: "Reckless Driving", description: "Reckless or dangerous driving citation" },
    { id: "uninsured", label: "Driving Uninsured", description: "Caught driving without valid insurance" },
    { id: "suspended", label: "Driving on Suspended License", description: "Operating vehicle with suspended license" },
    { id: "accident", label: "At-Fault Accident", description: "Accident where you were found at fault" },
    { id: "other", label: "Other Violation", description: "Court-ordered SR-22 for other reasons" },
  ];

  const updateFormData = (field: keyof FormData, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("quote_submissions").insert({
        state: formData.state,
        violation_type: formData.violationType,
        coverage_type: formData.coverageType,
        has_vehicle: formData.hasVehicle ?? false,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        zip_code: formData.zipCode || null,
        consent: formData.consent,
        user_id: user?.id || null,
      });

      if (error) throw error;
      
      toast.success("Quote request submitted successfully!");
      nextStep();
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    "Select Your State",
    "Violation Details",
    "Coverage Type",
    "Your Information",
    "Quote Ready!",
  ];

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          Step {Math.min(currentStep, 4)} of 4
        </span>
        <span className="text-sm text-muted-foreground">
          {stepTitles[currentStep - 1]}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full accent-gradient transition-all duration-500 ease-out"
          style={{ width: `${(Math.min(currentStep, 4) / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="wizard-enter">
      <h3 className="text-2xl font-bold text-foreground mb-2">Where are you located?</h3>
      <p className="text-muted-foreground mb-8">
        Select your state to see specific SR-22 requirements and available carriers.
      </p>
      
      <div className="grid gap-4">
        {states.map((state) => (
          <button
            key={state.code}
            onClick={() => {
              updateFormData("state", state.code);
              nextStep();
            }}
            className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 text-left ${
              formData.state === state.code
                ? "border-accent bg-accent/5"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                formData.state === state.code
                  ? "accent-gradient text-accent-foreground"
                  : "bg-secondary text-foreground"
              }`}>
                {state.code}
              </div>
              <div>
                <div className="font-semibold text-foreground">{state.name}</div>
                <div className="text-sm text-muted-foreground">
                  {state.available ? "SR-22 Filing Available" : "Coming Soon"}
                </div>
              </div>
            </div>
            <ArrowRight className={`w-5 h-5 ${
              formData.state === state.code ? "text-accent" : "text-muted-foreground"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="wizard-enter">
      <h3 className="text-2xl font-bold text-foreground mb-2">What's the violation type?</h3>
      <p className="text-muted-foreground mb-8">
        This helps us match you with carriers that specialize in your specific situation.
      </p>
      
      <div className="grid gap-3">
        {violationTypes.map((violation) => (
          <button
            key={violation.id}
            onClick={() => {
              updateFormData("violationType", violation.id);
            }}
            className={`flex items-start p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              formData.violationType === violation.id
                ? "border-accent bg-accent/5"
                : "border-border hover:border-primary/30 hover:bg-secondary/50"
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 mr-4 mt-0.5 flex-shrink-0 flex items-center justify-center ${
              formData.violationType === violation.id
                ? "border-accent bg-accent"
                : "border-muted-foreground"
            }`}>
              {formData.violationType === violation.id && (
                <div className="w-2 h-2 rounded-full bg-accent-foreground" />
              )}
            </div>
            <div>
              <div className="font-semibold text-foreground">{violation.label}</div>
              <div className="text-sm text-muted-foreground">{violation.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="subtle" onClick={prevStep} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="hero" 
          onClick={nextStep} 
          disabled={!formData.violationType}
          className="flex-1"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="wizard-enter">
      <h3 className="text-2xl font-bold text-foreground mb-2">Do you own a vehicle?</h3>
      <p className="text-muted-foreground mb-8">
        This determines whether you need standard SR-22 or non-owner SR-22 coverage.
      </p>
      
      <div className="grid gap-4 mb-8">
        <button
          onClick={() => {
            updateFormData("hasVehicle", true);
            updateFormData("coverageType", "owner");
          }}
          className={`flex items-center p-5 rounded-xl border-2 transition-all duration-200 text-left ${
            formData.hasVehicle === true
              ? "border-accent bg-accent/5"
              : "border-border hover:border-primary/30 hover:bg-secondary/50"
          }`}
        >
          <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center ${
            formData.hasVehicle === true
              ? "accent-gradient text-accent-foreground"
              : "bg-secondary text-foreground"
          }`}>
            🚗
          </div>
          <div>
            <div className="font-semibold text-foreground">Yes, I own a vehicle</div>
            <div className="text-sm text-muted-foreground">
              Standard SR-22 with full coverage options
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            updateFormData("hasVehicle", false);
            updateFormData("coverageType", "non-owner");
          }}
          className={`flex items-center p-5 rounded-xl border-2 transition-all duration-200 text-left ${
            formData.hasVehicle === false
              ? "border-accent bg-accent/5"
              : "border-border hover:border-primary/30 hover:bg-secondary/50"
          }`}
        >
          <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center ${
            formData.hasVehicle === false
              ? "accent-gradient text-accent-foreground"
              : "bg-secondary text-foreground"
          }`}>
            🚶
          </div>
          <div>
            <div className="font-semibold text-foreground">No, I don't own a vehicle</div>
            <div className="text-sm text-muted-foreground">
              Non-owner SR-22 for license reinstatement
            </div>
          </div>
        </button>
      </div>

      <div className="flex gap-4">
        <Button variant="subtle" onClick={prevStep} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="hero" 
          onClick={nextStep} 
          disabled={formData.hasVehicle === null}
          className="flex-1"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="wizard-enter">
      <h3 className="text-2xl font-bold text-foreground mb-2">Almost there!</h3>
      <p className="text-muted-foreground mb-8">
        Enter your details to receive personalized quotes from our partner carriers.
      </p>
      
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => updateFormData("zipCode", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              placeholder="90210"
            />
          </div>
        </div>

        {/* Consent checkbox */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => updateFormData("consent", e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground">
              I consent to receive quotes and be contacted by ReinstatePro and its insurance partners. 
              I understand this is not a commitment to purchase.
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="subtle" onClick={prevStep} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="hero" 
          onClick={handleSubmit}
          disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.consent || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get My Quotes
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="wizard-enter text-center py-8">
      <div className="w-20 h-20 rounded-full trust-gradient mx-auto mb-6 flex items-center justify-center trust-pulse">
        <CheckCircle2 className="w-10 h-10 text-success-foreground" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-2">Your Quotes Are Ready!</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We've matched you with {Math.floor(Math.random() * 3) + 3} carriers that specialize in {formData.coverageType === "non-owner" ? "non-owner " : ""}SR-22 coverage in {formData.state}.
      </p>

      <div className="bg-secondary/50 rounded-xl p-6 mb-8 text-left">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          What happens next?
        </h4>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center flex-shrink-0">1</span>
            <span className="text-sm text-muted-foreground">Check your email for personalized quotes from our partner carriers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center flex-shrink-0">2</span>
            <span className="text-sm text-muted-foreground">Compare coverage options and pricing—no pressure to commit</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center flex-shrink-0">3</span>
            <span className="text-sm text-muted-foreground">Select your plan and we'll file your SR-22 directly with the DMV</span>
          </li>
        </ol>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <AlertCircle className="w-4 h-4" />
        Quotes sent to: {formData.email}
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-secondary/30" id="quote-wizard">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-card rounded-2xl shadow-card border border-border p-8 md:p-10">
            {currentStep < 5 && renderProgressBar()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>256-bit encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>No spam, ever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteWizard;
