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
    id: "proposals-and-scope",
    heading: "4. Proposals, Quotes, and Scope Changes",
    paragraphs: [
      "Every client engagement is preceded by a written proposal or Statement of Work (SOW) that outlines the agreed project scope, technical deliverables, milestones, and implementation fees.",
      "Any project features, integrations, workflow modifications, or additional tasks requested outside the agreed written scope are considered extra work and will be quoted separately before commencement.",
    ],
  },
  {
    id: "payments-and-taxes",
    heading: "5. Quotes, Payments, and Taxes",
    paragraphs: [
      "Project work commences upon payment of an agreed advance fee, with remaining balances linked to defined project milestone completions ([[TO CONFIRM: advance % and milestone schedule]]).",
      "Invoices are issued upon milestone completion and must be settled within [[TO CONFIRM: invoice due date window, e.g. 7 or 14 calendar days]].",
      "Late payments may lead to project suspension until outstanding balances are cleared ([[TO CONFIRM: late payment terms and interest if applicable]]).",
      "Applicable taxes, including Goods and Services Tax (GST), will be charged on all professional fees as required under Indian law ([[TO CONFIRM: GST registration and rate]]).",
      "All payments must be made through approved banking channels ([[TO CONFIRM: accepted payment methods, e.g. NEFT, RTGS, UPI, bank transfer]]).",
    ],
  },
  {
    id: "third-party-costs",
    heading: "6. Third-Party Platform Costs and Dependencies",
    paragraphs: [
      "Our automation systems and software integrations connect with and rely upon external third-party software and cloud platforms, including Meta / WhatsApp Cloud API, AI model providers (such as OpenAI and Anthropic), Google Workspace, CRM platforms, and cloud hosting infrastructure.",
      "Usage fees charged by external providers—including WhatsApp conversation charges, AI token consumption, hosting tiers, and CRM software subscriptions—are separate from our engineering fees and are payable directly by the client unless explicitly stated otherwise in the project proposal.",
      "The client retains direct ownership and administrative control of their third-party accounts, API credentials, and billing profiles as detailed in the commercial proposal.",
      "Approvals & Policies: Account verification, business manager verification, phone number onboarding, and template approvals are governed entirely by the external platform providers. We build to official standards but do not guarantee third-party platform approvals or approval timelines.",
    ],
  },
  {
    id: "client-responsibilities",
    heading: "7. Client Responsibilities and Delays",
    paragraphs: [
      "Timely and successful delivery of automation workflows depends on prompt collaboration. You are responsible for:",
    ],
    list: [
      "Timely Access: Providing required access credentials, API keys, software permissions, and technical documentation without delay.",
      "Accurate Information: Supplying accurate requirements, business process flows, and timely review feedback on deliverables.",
      "Impact of Delays: Delays in providing credentials, approvals, or answers on the client side may proportionately extend project timelines.",
      "Lawful Messaging & Opt-ins: Ensuring that all customer contact lists, messaging campaigns, and user data comply with applicable Indian and international consumer protection and anti-spam laws, including obtaining prior verifiable consent from recipients.",
      "Account Security: Safeguarding your own administrative logins, passwords, and API credentials.",
    ],
  },
  {
    id: "handover-and-ownership",
    heading: "8. Handover, Documentation, and Deliverables Ownership",
    paragraphs: [
      "Upon completion of agreed milestones and receipt of full payment, we provide system handover, operational documentation, and transition guidance as detailed in the project proposal.",
      "Ownership of custom workflow configurations, accounts, client data, and deliverables is governed strictly by the executed written agreement between the parties.",
    ],
  },
  {
    id: "cancellation-and-refunds",
    heading: "9. Cancellation and Refunds",
    paragraphs: [
      "Either party may terminate an ongoing project agreement by giving written notice to the other party ([[TO CONFIRM: notice period, e.g. 14 days written notice]]).",
      "In the event of cancellation, the client is liable for payment of all work completed, milestones delivered, and non-recoverable direct expenses incurred up to the date of cancellation.",
      "Advance payments, initial setup deposits, and fees for completed milestones are non-refundable ([[TO CONFIRM: refund rules and non-refundable deposit terms]]).",
    ],
  },
  {
    id: "ongoing-support",
    heading: "10. Ongoing Support and Maintenance",
    paragraphs: [
      "Standard implementation engagements include post-delivery bug-fix support for a limited period specified in the project proposal.",
      "Ongoing maintenance, platform API version upgrades, workflow modifications, and continuous operational monitoring require a separate written support agreement with its own scope, response SLAs, and retainer fees.",
    ],
  },
  {
    id: "no-business-guarantees",
    heading: "11. No Guaranteed Business Outcomes",
    paragraphs: [
      "We design and build robust digital automation workflows according to agreed technical specifications. However, we do not guarantee specific commercial results, such as sales volume, conversion rates, customer retention, revenue growth, or search engine rankings.",
      "Commercial performance depends on product demand, sales execution, market conditions, and customer service quality, which remain solely under your operational control.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "12. Acceptable Use of this Website",
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
    heading: "13. Intellectual Property",
    paragraphs: [
      "All intellectual property rights in the website, including its text, layout, graphic marks, icons, and software code, are owned by or licensed to The Business Work. You may view and print pages for your internal business evaluation, but you may not reproduce, distribute, modify, or create derivative works without our prior written consent.",
    ],
  },
  {
    id: "disclaimer-of-warranties",
    heading: "14. Disclaimer of Warranties",
    paragraphs: [
      "This website and its content are provided on an 'as is' and 'as available' basis without any warranties of any kind, whether express, statutory, or implied. To the fullest extent permitted by law, The Business Work disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not warrant that the website will operate uninterrupted, error-free, or free from harmful components.",
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "15. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, in no event shall The Business Work, its proprietors, partners, employees, or contractors be liable for any indirect, consequential, punitive, incidental, or special damages, including lost profits, loss of data, loss of goodwill, or business interruption arising out of or in connection with your use of or inability to use this website.",
      "[[TO CONFIRM: lawyer to set liability cap and exclusions, e.g. total aggregate liability limited to INR 1,000 or actual fees paid in the preceding three months]].",
    ],
  },
  {
    id: "separate-project-agreements",
    heading: "16. Separate Written Project Agreements",
    paragraphs: [
      "The terms on this page govern public website browsing and enquiries only. Commercial project parameters—including detailed scope of deliverables, milestone deadlines, development fees, maintenance terms, software ownership, and warranties—are governed exclusively by a separate, customized written contract signed by both parties.",
      "In the event of any conflict between these website Terms and an executed project agreement, the executed project agreement shall prevail.",
    ],
  },
  {
    id: "governing-law",
    heading: "17. Governing Law and Dispute Resolution",
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.",
      "Any dispute, controversy, or claim arising out of or relating to these Terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts in [[TO CONFIRM: city and state in India, e.g. Bengaluru, Karnataka, India]].",
    ],
  },
  {
    id: "changes-and-contact",
    heading: "18. Changes to Terms and Contact Information",
    paragraphs: [
      "We reserve the right to revise or modify these Terms at any time. Any changes will become effective immediately upon posting on this website with an updated 'Last Updated' date. Your continued use of the website following such changes constitutes your acceptance of the updated Terms.",
      "If you have questions regarding these Terms, please contact us at [[TO CONFIRM: official contact email address]].",
    ],
  },
];
