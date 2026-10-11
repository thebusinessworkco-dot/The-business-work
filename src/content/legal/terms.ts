import type { LegalSection } from "./types";

export const lastUpdated = "2026-10-12";

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms of Service ('Terms') govern your access to and use of the website operated by The Business Work ('we', 'us', or 'our'). By accessing, browsing, or using this website, you confirm that you have read, understood, and agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, please do not use this website.",
    ],
  },
  {
    id: "nature-of-website",
    heading: "2. Nature of this Website",
    paragraphs: [
      "This website is an informational presentation of our digital automation capabilities, workflow engineering services, and technical case concepts. The materials, descriptions, and feature lists on this website are provided for general informational purposes only and do not constitute a formal commercial offer, binding guarantee, or quotation.",
    ],
  },
  {
    id: "enquiries-not-contracts",
    heading: "3. Enquiries Are Not Binding Contracts",
    paragraphs: [
      "Submitting an enquiry through our contact form, initiating a chat on WhatsApp, or sending an email does not form a client relationship, partnership, or binding service agreement between you and The Business Work.",
      "All client engagements commence only upon mutual negotiation, finalization, and execution of a separate written Statement of Work (SOW) or commercial proposal signed or confirmed by authorized representatives of both parties.",
    ],
  },
  {
    id: "third-party-platforms",
    heading: "4. Third-Party Platform Dependencies",
    paragraphs: [
      "Our automation systems and software integrations connect with and rely upon external third-party software and cloud platforms. These third parties include, but are not limited to, Meta / WhatsApp Business API, artificial intelligence model providers (such as OpenAI and Anthropic), Google Workspace, CRM platforms, and cloud hosting infrastructure.",
      "You acknowledge and agree that:",
    ],
    list: [
      "Approvals & Policies: Account verification, template approval, phone number registration, and API access are governed entirely by the policies of the respective third-party platform.",
      "Outages & Changes: Third-party platform downtime, API deprecations, rate limiting, and service interruptions are outside our control.",
      "Platform Fees: Direct API consumption fees, message template charges, token costs, and subscription fees charged by external providers are payable directly by the client to those providers unless explicitly agreed otherwise in a written agreement.",
      "No Approval Guarantees: We do not guarantee that Meta, WhatsApp, or any other provider will approve specific business accounts, phone numbers, or message templates.",
    ],
  },
  {
    id: "no-business-guarantees",
    heading: "5. No Guaranteed Business Results",
    paragraphs: [
      "We build robust, practical digital workflows according to agreed technical specifications. However, we do not make any guarantees or promises regarding specific commercial outcomes, such as sales volume, conversion rates, customer retention, revenue growth, or search engine rankings.",
      "Business performance depends on your product, market demand, sales execution, and customer service quality, which remain under your operational control.",
    ],
  },
  {
    id: "client-responsibilities",
    heading: "6. Client Responsibilities",
    paragraphs: [
      "When evaluating our services or engaging in preliminary project scoping, you are responsible for:",
    ],
    list: [
      "Accurate Requirements: Providing accurate, complete, and current information regarding your workflows, systems, and communication volumes.",
      "Lawful Messaging & Opt-ins: Ensuring that all customer data, contact lists, and messaging activities comply with applicable consumer protection and anti-spam laws, including obtaining proper consent from your own end customers before sending automated communications.",
      "Account Security: Safeguarding your own passwords, API keys, and administrative access credentials.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "7. Acceptable Use of this Website",
    paragraphs: [
      "You agree to use this website only for lawful business purposes. You agree not to:",
    ],
    list: [
      "Use automated spiders, scrapers, or extraction scripts to harvest data or content from this website.",
      "Attempt to interfere with, disrupt, or compromise the integrity or security of our website, servers, or API endpoints.",
      "Submit false, misleading, malicious, or abusive payloads through our enquiry form or communication channels.",
      "Introduce viruses, trojans, worms, logic bombs, or other technologically harmful material.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "8. Intellectual Property",
    paragraphs: [
      "All intellectual property rights in the website, including its text, layout, graphic marks, icons, and software code, are owned by or licensed to The Business Work. You may view and print pages for your internal business evaluation, but you may not reproduce, distribute, modify, or create derivative works without our prior written consent.",
    ],
  },
  {
    id: "disclaimer-of-warranties",
    heading: "9. Disclaimer of Warranties",
    paragraphs: [
      "This website and its content are provided on an 'as is' and 'as available' basis without any warranties of any kind, whether express, statutory, or implied. To the fullest extent permitted by law, The Business Work disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not warrant that the website will operate uninterrupted, error-free, or free from harmful components.",
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "10. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, in no event shall The Business Work, its proprietors, partners, employees, or contractors be liable for any indirect, consequential, punitive, incidental, or special damages, including lost profits, loss of data, loss of goodwill, or business interruption arising out of or in connection with your use of or inability to use this website.",
      "[[TO CONFIRM: lawyer to set liability cap and exclusions, e.g. total aggregate liability limited to INR 1,000 or actual fees paid in the preceding three months]].",
    ],
  },
  {
    id: "separate-project-agreements",
    heading: "11. Separate Written Project Agreements",
    paragraphs: [
      "The terms on this page govern public website browsing and enquiries only. Commercial project parameters—including detailed scope of deliverables, milestone deadlines, development fees, maintenance terms, software ownership, and warranties—are governed exclusively by a separate, customized written contract signed by both parties.",
      "In the event of any conflict between these website Terms and an executed project agreement, the executed project agreement shall prevail.",
    ],
  },
  {
    id: "governing-law",
    heading: "12. Governing Law and Dispute Resolution",
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.",
      "Any dispute, controversy, or claim arising out of or relating to these Terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts in [[TO CONFIRM: city and state in India, e.g. Bengaluru, Karnataka, India]].",
    ],
  },
  {
    id: "changes-and-contact",
    heading: "13. Changes to Terms and Contact Information",
    paragraphs: [
      "We reserve the right to revise or modify these Terms at any time. Any changes will become effective immediately upon posting on this website with an updated 'Last Updated' date. Your continued use of the website following such changes constitutes your acceptance of the updated Terms.",
      "If you have questions regarding these Terms, please contact us at [[TO CONFIRM: official contact email address]].",
    ],
  },
];
