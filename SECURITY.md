# Security Policy — ReinstatePro

## Vulnerability Disclosure
If you discover a security issue, please report it responsibly and privately before any public disclosure.

### Contact
- **Email:** security@reinstatepro.com

Please include:
- A clear description of the issue
- Reproduction steps
- Affected URLs, routes, or components
- Potential impact
- Suggested remediation if known

## Security Features Implemented
- Supabase authentication and Row Level Security (RLS)
- HTTPS-first deployment expectations via Vercel and Supabase
- Input validation across form flows and backend constraints
- Segregation of payment processing through Stripe so card data is never stored directly by ReinstatePro

## Data Handled
ReinstatePro may process:
- Personally identifiable information (name, email, phone, ZIP code)
- Insurance quote and policy request data
- Driving and violation-related information used for underwriting context
- Payment information via Stripe-hosted checkout only

## Incident Response Process
1. Acknowledge receipt of the report
2. Triage severity and scope
3. Contain and remediate the issue
4. Validate the fix and monitor for recurrence
5. Notify affected users or partners when legally or operationally required

## GDPR / CCPA Considerations
- Minimize stored personal data to what is operationally necessary
- Use third-party processors with appropriate security controls
- Support deletion and access workflows as required by applicable law
- Avoid storing raw payment card data directly in the application

## Bug Bounty / Responsible Disclosure
ReinstatePro supports responsible disclosure. Do not access, modify, or exfiltrate data beyond what is necessary to demonstrate the issue. Do not run destructive tests, denial-of-service activity, or social engineering campaigns. Good-faith reports will be reviewed and prioritized.
