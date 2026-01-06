import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is an SR-22 and why do I need one?",
      answer: "An SR-22 is a certificate of financial responsibility that proves you carry the minimum required auto insurance. Courts typically require SR-22 filing after violations like DUI/DWI, reckless driving, driving without insurance, or at-fault accidents. It's not insurance itself—it's proof that you have insurance.",
    },
    {
      question: "How long do I need to maintain SR-22 coverage?",
      answer: "Most states require SR-22 filing for 3 years, though this can vary based on your violation and state. California, Colorado, and North Carolina all typically require 3 years. Your filing period starts from the date of reinstatement, not the violation date.",
    },
    {
      question: "What happens if my SR-22 lapses?",
      answer: "If your SR-22 insurance lapses for any reason (non-payment, cancellation, etc.), your insurance company is legally required to notify the DMV. This can result in immediate license suspension and potentially restart your filing period. We send multiple reminders to help prevent lapses.",
    },
    {
      question: "How much does SR-22 insurance cost?",
      answer: "SR-22 filing itself typically costs $15-$25 as a one-time fee. However, your overall insurance premiums will likely increase due to the underlying violation. Rates vary significantly by state, violation type, driving history, and other factors. Our quote comparison helps you find the most competitive rates.",
    },
    {
      question: "Can I get SR-22 without owning a car?",
      answer: "Yes! Non-owner SR-22 coverage is available for drivers who need to reinstate their license but don't own a vehicle. This provides liability coverage when you drive someone else's car and satisfies court/DMV requirements. It's typically less expensive than standard SR-22.",
    },
    {
      question: "How quickly can you file my SR-22?",
      answer: "Most filings are processed same-day. California and Colorado allow electronic filing, which is nearly instant. North Carolina may take 1-2 business days for processing. You'll receive confirmation once your SR-22 is on file with the DMV.",
    },
    {
      question: "Do you make sales calls?",
      answer: "No. ReinstatePro is a self-serve platform. We match you with carriers and send quotes to your email. You compare and choose on your own terms. No sales pressure, no cold calls—just the coverage you need.",
    },
    {
      question: "Is my information secure?",
      answer: "Absolutely. We use 256-bit SSL encryption for all data transmission. Your personal information is only shared with the insurance carriers you choose to work with. We never sell your data to third parties.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about SR-22 insurance and our process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-soft data-[state=open]:border-accent/30 transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
