import type { LegalSection } from "./types";

export const lastUpdated = "2026-10-13";

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "1. Who We Are and How to Contact Us",
    paragraphs: [
      "The Business Work is a digital automation and systems practice based in India, founded by Aman Rajbhar. We design and build practical AI agents, WhatsApp workflows, CRM pipelines, and custom software integrations for small and medium businesses.",
      "If you have questions about this Privacy Policy or wish to exercise your rights regarding your personal data, you can contact us at:",
    ],
    list: [
      "Brand name: The Business Work",
      "Founder: Aman Rajbhar",
      "Email: thebusinesswork.co@gmail.com",
      "Phone / WhatsApp: +91 79720 20292",
      "Website: https://the-business-work.vercel.app",
    ],
  },
  {
    id: "data-we-collect",
    heading: "2. Personal Data We Collect",
    paragraphs: [
      "We collect only the personal information necessary to receive, evaluate, and respond to commercial project enquiries. We do not operate public user accounts, storefront checkout, or payment gateways on this website.",
      "The personal data we collect includes:",
    ],
    list: [
      "Contact Form Information: When you submit an enquiry through our website modal, we collect your full name, business or company name, email address, phone or WhatsApp number, service of interest, and your description of the problem you want to automate.",
      "Enquiry Context & Campaign Metadata: When you submit an enquiry, our system also records the page path where you opened the form, the button or call-to-action clicked, and any campaign tags (utm_source, utm_medium, utm_campaign) present in the link; no cookies or persistent browser storage are used for this tracking.",
      "Consent Record: When submitting the form, you must explicitly check an agreement box. We record your affirmative consent together with a server-generated UTC timestamp.",
      "Technical & Security Data: To protect our service from automated spam and abuse, our servers temporarily inspect your IP address for rate limiting (limiting submissions to 5 per 10 minutes), evaluate submission timing, and discard honeypot submissions. Server access logs record standard technical metadata such as HTTP method, URL, and user agent.",
      "Analytics Data: If and only if analytics is enabled by the site operator, Google Analytics 4 collects pseudonymous pageview data. If analytics is not configured, no analytics scripts or trackers run.",
      "Direct Communications: If you reach out to us directly through WhatsApp or email, we receive the phone number, email address, message body, and attachments you choose to send.",
    ],
  },
  {
    id: "purpose-and-basis",
    heading: "3. Why We Use Your Data",
    paragraphs: [
      "We process your personal information strictly for legitimate commercial and operational purposes:",
    ],
    list: [
      "Responding to your enquiry and scheduling preliminary technical discussions.",
      "Evaluating your business workflow requirements and preparing written proposals.",
      "Protecting our website, API routes, and infrastructure against malicious attacks, automated bot abuse, and denial-of-service attempts.",
      "Maintaining internal records of business inquiries.",
    ],
  },
  {
    id: "data-protection",
    heading: "4. Data Protection Practices",
    paragraphs: [
      "We handle personal data in accordance with applicable Indian laws. We provide prior notice of the data collected, process data strictly for the specified purpose, obtain verifiable consent before processing your contact submission, and respect your right to withdraw consent.",
      "We will update our practices as data protection rules in India continue to evolve. If specific compliance requirements change, we will update this policy accordingly.",
    ],
  },
  {
    id: "sharing-and-service-providers",
    heading: "5. Who We Share Your Data With",
    paragraphs: [
      "We do not sell, rent, trade, or monetize your personal information to third parties, data brokers, or advertisers under any circumstances.",
      "To operate our website and manage enquiries reliably, we share data solely with trusted third-party service providers who assist our operations:",
    ],
    list: [
      "Hosting & Infrastructure: Vercel hosts our website application and API endpoints under their standard cloud service terms.",
      "Enquiry Processing & Storage: If a webhook endpoint is configured, enquiry data is forwarded to our configured automation platform (such as an n8n or Make workflow) to store enquiries and alert our team.",
      "Abuse Prevention: Our servers use in-memory or optional Redis-based rate limiting to temporarily track submission frequency by IP address.",
      "Spam Protection: If Cloudflare Turnstile is enabled, a privacy-preserving verification widget runs when you open the contact form. Cloudflare processes interaction signals to verify human presence without invasive profiling.",
      "Analytics: Google Analytics 4 (only if enabled via configuration) is used for aggregated traffic measurement.",
      "Legal & Regulatory Authorities: We may disclose information only if required by a valid court order, subpoena, or applicable Indian law.",
    ],
  },
  {
    id: "international-transfers",
    heading: "6. International Data Transfers",
    paragraphs: [
      "Our website is hosted on Vercel, which may process data in data centres located both in India and internationally. When personal data is stored or processed on servers outside India, it is handled in compliance with the hosting provider's standard contractual safeguards.",
    ],
  },
  {
    id: "data-retention",
    heading: "7. Data Retention",
    paragraphs: [
      "We retain contact form enquiries and correspondence only as long as necessary to address your project request, conduct business discussions, and fulfil any legal or accounting obligations.",
      "If you request deletion of your data, we will remove or anonymise your enquiry records within a reasonable timeframe, subject to any applicable legal retention requirements.",
    ],
  },
  {
    id: "security-measures",
    heading: "8. Security Measures",
    paragraphs: [
      "We implement appropriate technical and organisational safeguards to protect your personal information against unauthorised access, loss, alteration, or disclosure. These measures include:",
    ],
    list: [
      "HTTPS encryption in transit across all website pages and API endpoints.",
      "Server-side environment variables and secrets management for all backend integrations.",
      "Strict request payload limits (maximum 10 KB request body) and schema validation.",
      "IP-based rate limiting to prevent automated brute-force and denial-of-service abuse.",
      "No permanent storage of sensitive credentials or payment cards on this website.",
    ],
  },
  {
    id: "your-rights",
    heading: "9. Your Rights and Choices",
    paragraphs: [
      "Under applicable data protection laws, you have specific rights regarding your personal data:",
    ],
    list: [
      "Right to Access: You may request confirmation of whether we process your personal data and obtain a summary of such data.",
      "Right to Correction: You may ask us to update, complete, or correct inaccurate personal information.",
      "Right to Erasure: You may request the deletion of your personal data, subject to any statutory retention requirements.",
      "Right to Withdraw Consent: You may withdraw your consent for future communication at any time by contacting us.",
      "How to Request: To exercise any of these rights, email us at thebusinesswork.co@gmail.com. We will review and respond within a reasonable timeframe.",
    ],
  },
  {
    id: "cookies-and-analytics",
    heading: "10. Cookies, Analytics, and Spam Protection",
    paragraphs: [
      "Default Cookie-Free Mode: By default, this website operates in a strictly cookie-free mode. We do not use advertising trackers, marketing cookies, third-party analytics pixels, or cross-site tracking scripts. No cookies, localStorage, or sessionStorage items are stored on your device when browsing the public website.",
      "Optional Google Analytics: If and only if Google Analytics 4 is enabled by the site operator, a non-modal cookie consent banner is displayed. Google Analytics scripts and cookies (_ga) load only after you explicitly click 'Accept'. If you click 'Reject' or if analytics is unset, zero analytics cookies or tracking scripts are loaded.",
      "Optional Spam Protection: If Cloudflare Turnstile is enabled by the site operator, a privacy-preserving security widget runs when you open the contact modal to verify human interaction. Turnstile does not use intrusive tracking or create advertising profiles.",
    ],
  },
  {
    id: "children-privacy",
    heading: "11. Children's Privacy",
    paragraphs: [
      "The Business Work provides digital systems and automation services exclusively to commercial enterprises and working professionals. Our website is not directed to, nor do we knowingly collect personal data from, children under 18 years of age. If we discover that personal information of a minor has been submitted, we will delete it promptly.",
    ],
  },
  {
    id: "healthcare-notice",
    heading: "12. Healthcare & Sensitive Data Notice",
    paragraphs: [
      "Our website and automation systems are not designed, certified, or intended for collecting, storing, or processing sensitive personal health information, medical histories, or patient records. Please do not submit medical or clinical details in our contact forms or chat messages. Healthcare examples on our website refer solely to administrative workflows: enquiries, scheduling, reminders, and staff handoff.",
    ],
  },
  {
    id: "website-assistant",
    heading: "13. Website Automated Assistant",
    paragraphs: [
      "Our website includes an automated assistant designed to answer routine questions from published website content. The assistant operates entirely inside your web browser using client-side rule-based matching.",
      "It does not transmit your questions to our servers or to any third-party AI provider, and does not store conversation histories. Submitting an enquiry through our Contact form is the only method by which personal data is transmitted to us.",
    ],
  },
  {
    id: "policy-changes",
    heading: "14. Changes to this Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect operational, technical, or legal changes. Any updates will be posted on this page with an updated 'Last Updated' date.",
      "If you have any questions or concerns regarding the processing of your personal data, please contact us at thebusinesswork.co@gmail.com.",
    ],
  },
];
