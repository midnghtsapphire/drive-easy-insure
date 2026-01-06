import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">ReinstatePro</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Self-serve SR-22 insurance for court-ordered coverage. No sales calls, no hassle—just fast, compliant filings.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <MapPin className="w-4 h-4" />
              <span>Serving CA, CO & NC</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#coverage" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Coverage Options
                </a>
              </li>
              <li>
                <a href="#states" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  State Requirements
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/licenses" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Licenses & Disclosures
                </a>
              </li>
              <li>
                <a href="/accessibility" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:1-800-555-0123" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  1-800-555-0123
                </a>
              </li>
              <li>
                <a href="mailto:support@reinstatepro.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  support@reinstatepro.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
              <p className="text-xs text-primary-foreground/60">
                <strong className="text-primary-foreground/80">Hours:</strong><br />
                Mon-Fri: 8am - 8pm EST<br />
                Sat: 9am - 5pm EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} ReinstatePro. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/40 text-center md:text-right max-w-md">
              ReinstatePro is a licensed insurance agency. Coverage is subject to carrier approval and state regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
