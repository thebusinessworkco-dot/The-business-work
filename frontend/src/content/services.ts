import type { LucideIcon } from "lucide-react";
import { Bot, Workflow, TrendingUp, MessageCircle } from "lucide-react";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  index: string;
  title: string;
  tag: string;
  icon: LucideIcon;
  summary: string;
  solves: string;
  capabilities: string[];
  depends: string;
  intro: string;
  useCases: string[];
  howItWorks: string[];
  limits: string[];
  faq: ServiceFaq[];
};

export const services: Service[] = [
  {
    id: "ai-agents-chatbots",
    index: "01",
    title: "AI Agents & Chatbots",
    tag: "Customer-facing AI",
    icon: Bot,
    summary:
      "AI agents that answer customer questions, qualify leads and handle routine enquiries, using only your approved business information.",
    solves:
      "Slow replies, missed enquiries and repetitive questions, with complex or sensitive conversations handed to a human.",
    capabilities: [
      "AI sales and customer support agents",
      "AI receptionists and appointment booking agents",
      "Lead qualification and intake agents",
      "Website AI chatbots",
      "Knowledge-base chatbots trained on your documents",
      "AI voice agents, where technically supported",
    ],
    depends:
      "Your business data, chosen AI model, integrations and budget. AI model usage carries variable third-party costs.",
    intro:
      "We build custom AI agents that interact with your customers and answer questions using only your approved documents. These agents handle repetitive enquiries day and night, freeing your team for complex work. Whenever an issue requires human judgment, the conversation is smoothly escalated.",
    useCases: [
      "Customer support agent answering product questions from your verified documentation.",
      "Appointment booking assistant collecting patient or client details and preferred times.",
      "Lead qualification agent gathering requirements before routing high-intent buyers to sales.",
      "Website AI chatbot answering visitor queries and capturing contact details.",
    ],
    howItWorks: [
      "We review your existing documents, FAQs, and common customer questions to define the knowledge base.",
      "We configure the AI agent with strict guardrails so it only answers from approved content.",
      "We test the agent against real customer scenarios and edge cases to ensure reliable responses.",
      "We connect the agent to your website or chat tool with built-in human handoff.",
    ],
    limits: [
      "AI models require clear source information and cannot invent answers accurately without documentation.",
      "AI usage fees from model providers (such as OpenAI or Google) are billed separately based on volume.",
      "Healthcare AI handles administrative scheduling only and never provides clinical or medical advice.",
    ],
    faq: [
      {
        question: "Will the AI chatbot invent false answers?",
        answer:
          "We configure agents with strict guardrails to answer solely from approved business documents and escalate unfamiliar questions to your team.",
      },
      {
        question: "What happens when a customer has a complex problem?",
        answer:
          "The agent recognizes limits and passes the enquiry to a team member along with the conversation summary.",
      },
      {
        question: "How are AI usage fees handled?",
        answer:
          "Third-party AI model usage carries variable token costs, which are billed directly by the provider according to your monthly message volume.",
      },
    ],
  },
  {
    id: "crm-sales-automation",
    index: "02",
    title: "CRM & Sales Automation",
    tag: "Pipeline & follow-ups",
    icon: TrendingUp,
    summary:
      "Organise leads, manage the sales pipeline and automate follow-ups so your sales team spends less time on admin.",
    solves:
      "Scattered lead records, delayed follow-ups and manual pipeline updates.",
    capabilities: [
      "CRM setup and customisation",
      "Lead capture, qualification and assignment",
      "Sales pipeline automation and stage tracking",
      "Automated follow-ups and lead nurturing",
      "Appointment and meeting booking integration",
      "Lost-lead reactivation and CRM AI integration",
    ],
    depends:
      "Your current sales workflow, team size and budget. We recommend suitable tools without pushing a specific vendor.",
    intro:
      "We set up and automate your CRM so every incoming lead is recorded, assigned, and followed up without delay. Your sales team spends less time on repetitive data entry and more time talking to interested buyers. We tailor the pipeline around your actual sales workflow rather than forcing a generic template.",
    useCases: [
      "Automatic capture and routing of website enquiries directly to the right salesperson.",
      "Automated follow-up emails and WhatsApp reminders for leads who requested a quotation.",
      "Pipeline stage updates when prospects book a meeting or submit a form.",
      "Re-engagement campaigns for inactive leads who showed interest in past months.",
    ],
    howItWorks: [
      "We map your current sales process from lead intake to closing.",
      "We configure your CRM pipeline stages, lead fields, and automated ownership rules.",
      "We build automated follow-up sequences and meeting booking links.",
      "We train your team on pipeline management and provide reference documentation.",
    ],
    limits: [
      "A CRM system requires consistent team adoption to keep customer records up to date.",
      "CRM software subscription costs are paid directly to your chosen software provider.",
      "We do not push any single CRM vendor; recommendations depend on your budget and requirements.",
    ],
    faq: [
      {
        question: "Do we have to buy a specific CRM software?",
        answer:
          "No. We work with your existing CRM or recommend one that fits your budget, team size, and workflow.",
      },
      {
        question: "Will automation spam our prospective leads?",
        answer:
          "No. We build sensible, respectful follow-up sequences that pause immediately when a prospect replies or books a meeting.",
      },
      {
        question: "Can you connect our website and WhatsApp leads to the CRM?",
        answer:
          "Yes. We connect your website forms and chat channels so all enquiries create centralized CRM records automatically.",
      },
    ],
  },
  {
    id: "business-workflow-automation",
    index: "03",
    title: "Business Workflow Automation",
    tag: "Connected systems",
    icon: Workflow,
    summary:
      "Connect your existing tools and automate repetitive tasks across operations, choosing the simplest and most reliable method.",
    solves:
      "Manual data entry between apps, unstructured form submissions and time-consuming routine reporting.",
    capabilities: [
      "n8n, Make and Zapier workflow automation",
      "API and webhook integrations between apps",
      "Google Sheets and Google Workspace automation",
      "Database automation and document processing",
      "Approval workflows with human review checkpoints",
      "Automated scheduled reports and notifications",
    ],
    depends:
      "Your existing tools, API access and permissions. Rule-based automation is preferred whenever it is simpler and more reliable.",
    intro:
      "We connect your everyday business software to eliminate repetitive copy-pasting, manual data entry, and slow approval handoffs. By linking your spreadsheets, databases, and communication channels, your operational workflows run smoothly in the background. We use plain rule-based automation wherever possible because it is simpler and more dependable.",
    useCases: [
      "Syncing incoming form responses to Google Sheets, CRM, and team chat channels.",
      "Automated invoice generation and dispatch upon payment confirmation.",
      "Multi-step internal approval workflows with manager sign-off checkpoints.",
      "Scheduled daily and weekly operational summary reports delivered to management.",
    ],
    howItWorks: [
      "We identify the repetitive operational bottleneck taking up your team's hours.",
      "We evaluate whether simple rules or AI are best suited for each step.",
      "We build the workflow using tools like n8n or Make with error notifications.",
      "We test edge cases thoroughly before launching and handing over system documentation.",
    ],
    limits: [
      "Automations require supported APIs or webhooks from your existing software tools.",
      "Third-party platform hosting or runner charges (such as Make or n8n cloud) are billed separately.",
      "Rule-based automations depend on consistent input data structures to operate without interruption.",
    ],
    faq: [
      {
        question: "Do we always need AI for workflow automation?",
        answer:
          "No. Plain rule-based automation is often faster, cheaper, and more predictable for routine tasks like data syncing.",
      },
      {
        question: "What happens if an API connection fails?",
        answer:
          "We build retry logic and alert notifications so your team is informed if an integrated service goes down.",
      },
      {
        question: "Do you lock us into proprietary software?",
        answer:
          "No. We build on open tools like n8n or popular platforms like Make and fully document your workflows.",
      },
    ],
  },
  {
    id: "whatsapp-social-automation",
    index: "04",
    title: "WhatsApp & Social Automation",
    tag: "Messaging channels",
    icon: MessageCircle,
    summary:
      "Handle customer enquiries and routine chats on WhatsApp, Instagram and Facebook, with human handoff when needed.",
    solves:
      "Backlogs of repetitive messages, delayed responses during peak hours and manual booking over chat.",
    capabilities: [
      "WhatsApp Business automation and AI chatbots",
      "Automated replies and approved template follow-ups",
      "Instagram and Facebook chatbots",
      "Lead capture and qualification over chat",
      "Appointment booking over messaging channels",
      "Human handoff for complex or sensitive enquiries",
    ],
    depends:
      "Official platform APIs, account verification, template approval and provider charges. Messaging features require platform approval.",
    intro:
      "We automate your customer conversations on WhatsApp, Instagram, and Facebook using official platform APIs. Your business can answer routine questions, book appointments, and capture qualified leads around the clock. Sensitive conversations always include clear handoff triggers to your human team.",
    useCases: [
      "Automated greeting and FAQ responses for customers messaging your official WhatsApp Business number.",
      "Interactive appointment booking and slot confirmation directly inside the WhatsApp chat.",
      "Lead qualification sequences asking key customer questions before routing to sales staff.",
      "Automated direct message replies and comment routing on Instagram and Facebook.",
    ],
    howItWorks: [
      "We verify your Meta Business account eligibility and guide you through official API access.",
      "We design conversational flows for common customer questions and booking requests.",
      "We submit official message templates to Meta for approval before launching outgoing messages.",
      "We connect the messaging assistant to your calendar, CRM, or team notification channel.",
    ],
    limits: [
      "All business accounts and outgoing broadcast templates require approval by Meta platform policies.",
      "Meta charges per-conversation fees for business-initiated and user-initiated chats via the WhatsApp Cloud API.",
      "Messaging automations must comply with customer opt-in and consent regulations; unlimited unsolicited messaging is not permitted.",
    ],
    faq: [
      {
        question: "Can we message anyone without prior approval?",
        answer:
          "No. Official WhatsApp rules strictly require user opt-in, and outgoing notifications must use Meta-approved message templates.",
      },
      {
        question: "Are WhatsApp conversation charges included in your setup fee?",
        answer:
          "No. Official Meta conversation charges and provider fees are paid directly to your WhatsApp Business solution provider.",
      },
      {
        question: "Can staff take over an ongoing chat?",
        answer:
          "Yes. Every chat flow includes human handover triggers so your team can step in whenever a customer needs personal assistance.",
      },
    ],
  },
];
