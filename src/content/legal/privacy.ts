import type { LegalSection } from "./types";

export const lastUpdated = "2026-10-12";

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "1. Who We Are and How to Contact Us",
    paragraphs: [
      "The Business Work is an AI automation and digital systems agency based in India. We design and build practical AI agents, WhatsApp workflows, CRM pipelines, and custom software integrations for businesses.",
      "If you have questions about this Privacy Policy or wish to exercise your rights regarding your personal data, you can contact us at:",
    ],
    list: [
      "Official Name: The Business Work",
      "Legal Entity Details: [[TO CONFIRM: registered business entity type, registration number, and GSTIN if applicable]]",
      "Registered Address: [[TO CONFIRM: complete registered office address, city, state, PIN code, India]]",
      "Email: [[TO CONFIRM: official contact and privacy email address, e.g. privacy@thebusinesswork.com]]",
      "Phone / WhatsApp: [[TO CONFIRM: official business contact phone number]]",
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
      "Consent Record: When submitting the form, you must explicitly check an agreement box. We record your affirmative consent together with a server-generated UTC timestamp.",
      "Technical & Security Data: To protect our service from automated spam and abuse, our servers temporarily inspect your IP address for rate limiting (limiting submissions to 5 per 10 minutes), evaluate submission timing, and discard honeypot submissions. Server access logs record standard technical metadata such as HTTP method, URL, and user agent.",
      "Analytics Data: If and only if analytics is enabled by the site operator, Google Analytics 4 collects pseudonymous pageview data. If analytics is not configured, no analytics scripts or trackers run.",
      "Direct Communications: If you reach out to us directly through WhatsApp or email, we receive the phone number, email address, message body, and attachments you choose to send.",
    ],
  },
  {
    id: "purpose-and-basis",
    heading: "3. Why We Use Your Data and Lawful Basis",
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
    id: "dpdp-alignment",
    heading: "4. Alignment with Indian Data Protection Laws",
    paragraphs: [
      "We handle personal data in accordance with applicable laws in India, including the Digital Personal Data Protection Act, 2023 (DPDP Act 2023). Under these principles, we provide prior notice of the data collected, process data strictly for the specified purpose, obtain verifiable consent before processing your contact submission, and respect your right to withdraw consent.",
      "[[TO CONFIRM: lawyer to confirm applicable statutory notices and rules under the DPDP Act 2023]].",
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
      "Hosting & Infrastructure: Providers who host our website application and API endpoints under standard cloud service terms.",
      "Enquiry Processing & Storage: Secure automation and spreadsheet tools (such as our configured lead webhook endpoint, Google Workspace, or automation platforms) used to store enquiries and alert our team.",
      "Abuse Prevention: Cloud infrastructure providers (such as optional Redis cache services) used strictly for temporary IP rate limiting.",
      "Analytics: Google Analytics (only if enabled via configuration), used for aggregated traffic measurement.",
      "Legal & Regulatory Authorities: We may disclose information only if required by a valid court order, subpoena, or applicable Indian law.",
    ],
  },
  {
    id: "international-transfers",
    heading: "6. International Data Transfers",
    paragraphs: [
      "Our website hosting providers and enterprise cloud services may operate data centers located both in India and internationally. When personal data is stored or processed on servers outside India, it is handled in compliance with contractual safeguards and applicable cross-border transfer requirements.",
      "[[TO CONFIRM: lawyer to confirm international data transfer safeguards and restrictions under Indian law]].",
    ],
  },
  {
    id: "data-retention",
    heading: "7. Data Retention",
    paragraphs: [
      "We retain contact form enquiries and correspondence only as long as necessary to address your project request, conduct business negotiations, and fulfill legal or accounting obligations.",
      "Enquiry records are retained for [[TO CONFIRM: retention period, e.g. 12 months after last contact or until consent is withdrawn]], after which they are securely deleted or anonymized.",
    ],
  },
  {
    id: "security-measures",
    heading: "8. Security Measures",
    paragraphs: [
      "We implement appropriate technical and organizational safeguards to protect your personal information against unauthorized access, loss, alteration, or disclosure. These measures include:",
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
      "How to Request: To exercise any of these rights, email us at [[TO CONFIRM: official privacy email address]]. We will review and respond within [[TO CONFIRM: response timeline, e.g. within 30 days of receiving a verified request]].",
    ],
  },
  {
    id: "cookies-and-analytics",
    heading: "10. Cookies and Analytics",
    paragraphs: [
      "We do not use advertising cookies, marketing trackers, or cross-site fingerprinting scripts.",
      "Essential Cookies: Our hosting platform may use temporary, strictly necessary session tokens for routing and security.",
      "Analytics Cookies: If Google Analytics is enabled by the site owner, it sets first-party analytics cookies (_ga) to measure aggregated visitor counts and navigation patterns. If Google Analytics is not enabled, zero analytics cookies are placed on your browser.",
      "[[TO CONFIRM: lawyer to confirm cookie notice, consent banner, or opt-out requirements if analytics is deployed in production]].",
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
      "Our website and automation systems are not designed, certified, or intended for collecting, storing, or processing sensitive personal health information, medical histories, or patient records. Please do not submit medical or clinical details in our contact forms or chat messages.",
    ],
  },
  {
    id: "policy-changes-and-grievance",
    heading: "13. Changes to this Policy and Grievance Redressal",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect operational, technical, or legal changes. Any updates will be posted on this page with an updated 'Last Updated' date.",
      "If you have any grievance or concern regarding the processing of your personal data, you may reach our designated Grievance Officer:",
    ],
    list: [
      "Grievance Officer: [[TO CONFIRM: Grievance Officer Name]]",
      "Designation: [[TO CONFIRM: Grievance Officer Designation]]",
      "Email: [[TO CONFIRM: Grievance Officer Email Address]]",
      "Postal Address: [[TO CONFIRM: Grievance Officer Postal Address, India]]",
      "Resolution Timeline: [[TO CONFIRM: statutory grievance resolution timeline, e.g. within 30 days]]",
    ],
  },
];
