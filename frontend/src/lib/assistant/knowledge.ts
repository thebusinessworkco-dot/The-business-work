import { site, isPlaceholder } from "../site";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { industries } from "@/content/industries";
import { demos } from "@/content/work";
import { principles } from "@/content/principles";

export interface AssistantEntry {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  followUps?: string[];
}

/**
 * Builds the curated rule-based knowledge base dynamically from site content files.
 * Adheres strictly to:
 * - <= 70 words per answer
 * - Plain simple Indian English
 * - No pricing figures
 * - No guarantees or 100% claims
 * - Real demo statuses ("In development", "Proof of concept")
 * - Medical boundaries
 * - No placeholder contact information
 */
export function buildAssistantKnowledge(): AssistantEntry[] {
  const s1 = services.find((s) => s.id === "ai-agents-chatbots") || services[0];
  const s2 = services.find((s) => s.id === "crm-sales-automation") || services[1];
  const s3 = services.find((s) => s.id === "business-workflow-automation") || services[2];
  const s4 = services.find((s) => s.id === "whatsapp-social-automation") || services[3];

  const clinicDemo = demos.find((d) => d.id === "hospital-appointments") || demos[0];
  const botDemo = demos.find((d) => d.id === "website-chatbot") || demos[1];

  const p1 = principles[0];
  const p2 = principles[1];
  const p3 = principles[2];

  const whatsappAvailable = !isPlaceholder("whatsapp");

  const entries: AssistantEntry[] = [
    // 1. Identity & Nature of Assistant
    {
      id: "assistant-identity",
      title: "About this assistant",
      keywords: [
        "who are you",
        "are you human",
        "are you ai",
        "who made you",
        "robot",
        "bot",
        "koun ho",
        "kya ho",
        "human ho ya bot",
        "ai model",
      ],
      answer:
        "I am an automated assistant for The Business Work. I am not an AI language model and not a person. I provide answers directly from this website's published content to help you learn about our services.",
      followUps: ["Our services", "How a project works", "Pricing"],
    },

    // 2. Organization Overview
    {
      id: "about-agency",
      title: "What The Business Work does",
      keywords: [
        "what do you do",
        "about",
        "agency",
        "the business work",
        "company",
        "overview",
        "what you offer",
        "kya karte ho",
        "services kya hai",
        "kaam kya hai",
      ],
      answer:
        `${site.name} is an AI automation and digital systems agency based in India. ` +
        `We build practical AI agents, WhatsApp automation, and CRM workflows around your business operations to reduce repetitive tasks.`,
      followUps: ["Our services", "How a project works", "Contact us"],
    },

    // 3. Four Core Services
    {
      id: "services-overview",
      title: "Our 4 services",
      keywords: [
        "services",
        "all services",
        "core services",
        "offerings",
        "kya services hai",
        "char services",
        "kya provide karte ho",
      ],
      answer:
        `We offer exactly 4 core services: ` +
        `1. ${s1.title}, ` +
        `2. ${s2.title}, ` +
        `3. ${s3.title}, and ` +
        `4. ${s4.title}. Each system is tailored around your workflow.`,
      followUps: [s1.title, s2.title, s3.title, s4.title],
    },
    {
      id: "service-ai-agents",
      title: s1.title,
      keywords: [
        "ai agent",
        "ai agents",
        "chatbot",
        "chatbots",
        "support bot",
        "ai support",
        "knowledge bot",
        "sales agent",
        "ai bot",
        "customer support",
      ],
      answer:
        `${s1.title}: ${s1.summary} It solves ${s1.solves.toLowerCase()} ` +
        `Scope depends on your business data and model choice. Model usage carries variable third-party fees.`,
      followUps: ["Custom solutions", "Pricing", "How a project works"],
    },
    {
      id: "service-crm-sales",
      title: s2.title,
      keywords: [
        "crm",
        "sales automation",
        "pipeline",
        "lead follow up",
        "lead management",
        "lead tracking",
        "nurturing",
        "sales pipeline",
        "leads",
      ],
      answer:
        `${s2.title}: ${s2.summary} It solves ${s2.solves.toLowerCase()} ` +
        `We work with your existing CRM or suggest one fitting your team without pushing any single vendor.`,
      followUps: ["Our services", "Pricing", "How a project works"],
    },
    {
      id: "service-workflow",
      title: s3.title,
      keywords: [
        "workflow automation",
        "business workflow",
        "n8n",
        "make",
        "zapier",
        "google sheets",
        "webhook",
        "api integration",
        "data entry",
        "system integration",
      ],
      answer:
        `${s3.title}: ${s3.summary} It solves ${s3.solves.toLowerCase()} ` +
        `We prefer simple rule-based automations over AI wherever simpler and more reliable.`,
      followUps: ["Our services", "Pricing", "How a project works"],
    },
    {
      id: "service-whatsapp-social",
      title: s4.title,
      keywords: [
        "whatsapp",
        "whatsapp automation",
        "instagram",
        "facebook",
        "meta",
        "messaging",
        "whatsapp bot",
        "social automation",
        "whatsapp bot chahiye",
      ],
      answer:
        `${s4.title}: ${s4.summary} It solves ${s4.solves.toLowerCase()} ` +
        `All messaging features require official Meta approval, approved templates, and customer opt-in.`,
      followUps: ["WhatsApp limits", "Pricing", "How a project works"],
    },

    // 4. Custom Solutions
    {
      id: "custom-solutions",
      title: "Custom solutions",
      keywords: [
        "custom",
        "custom solution",
        "tailored",
        "bespoke",
        "specific problem",
        "alooda requirement",
        "kuch alag chahiye",
      ],
      answer:
        "If your operations don't fit into a standard package, we design custom automations linking your specific tools, forms, and databases. We start by mapping your bottleneck.",
      followUps: ["How a project works", "Pricing", "Contact us"],
    },

    // 5. How a Project Works (6 steps)
    {
      id: "process-steps",
      title: "How a project works",
      keywords: [
        "process",
        "how it works",
        "steps",
        "methodology",
        "delivery",
        "kaise kaam karta hai",
        "project steps",
        "phases",
        "timeline",
      ],
      answer:
        `Our delivery follows 6 clear steps: ` +
        processSteps.map((s, i) => `${i + 1}. ${s.phase} (${s.title})`).join(", ") +
        `. We build a proof of concept first where helpful, and deploy only after your sign-off.`,
      followUps: ["Pricing", "Contact us", "Operating principles"],
    },

    // 6. Project Timeline
    {
      id: "timeline",
      title: "Project timeline",
      keywords: [
        "timeline",
        "how long",
        "duration",
        "kitna time lagega",
        "kitne din",
        "delivery time",
        "launch time",
        "schedule",
      ],
      answer:
        "Project timelines depend on the scope and complexity of your integrations. We define and agree on a written schedule during the planning phase before any development begins.",
      followUps: ["How a project works", "Pricing", "Contact us"],
    },

    // 7. Pricing & Costs (Hard Rule 2)
    {
      id: "pricing",
      title: "Pricing and costs",
      keywords: [
        "price",
        "pricing",
        "cost",
        "fees",
        "charges",
        "rate",
        "kitna kharcha",
        "kharcha",
        "price kya hai",
        "budget",
        "expensive",
        "quotation",
        "package",
      ],
      answer:
        "Project pricing depends on the scope and systems involved. Third-party costs (such as AI model tokens, WhatsApp provider conversation charges, and hosting) are billed separately. Please send an enquiry for a tailored written estimate.",
      followUps: ["Contact us", "How a project works"],
    },

    // 8. Industries
    {
      id: "industries-overview",
      title: "Industries we serve",
      keywords: [
        "industries",
        "sectors",
        "who do you work with",
        "clients",
        "konsi industry",
        "kis type ke business",
      ],
      answer:
        `We work across 6 key sectors: ` +
        industries.map((ind) => ind.name).join(", ") +
        `. Each workflow is tailored to that sector's operational constraints.`,
      followUps: ["Healthcare & clinics", "Local businesses", "Sales teams & agencies"],
    },
    {
      id: "industry-healthcare",
      title: "Healthcare & clinics",
      keywords: [
        "healthcare",
        "clinic",
        "hospital",
        "doctor",
        "patient",
        "medical",
        "appointments",
        "clinic bot",
      ],
      answer:
        "For clinics and healthcare practices, we build administrative appointment booking and enquiry workflows. Our automations never provide medical, diagnostic, or clinical advice.",
      followUps: ["Healthcare boundaries", "Clinic appointment demo", "Pricing"],
    },
    {
      id: "industry-local",
      title: "Local businesses",
      keywords: ["local business", "salons", "repair", "retail", "shop", "local shops"],
      answer:
        "For salons, repair services, and local retail, we automate booking requests, customer FAQs, and reminder notifications so you never miss an incoming customer.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },
    {
      id: "industry-sales",
      title: "Sales teams & agencies",
      keywords: ["sales teams", "agencies", "lead capture", "b2b", "sales reps", "pipeline tracking"],
      answer:
        "For sales teams and agencies, we automate lead qualification, CRM ownership assignment, follow-up reminders, and meeting scheduling to reduce repetitive admin.",
      followUps: ["CRM & Sales Automation", "Pricing", "Contact us"],
    },
    {
      id: "industry-ecommerce",
      title: "E-commerce",
      keywords: ["ecommerce", "e-commerce", "online store", "shopify", "orders", "order tracking"],
      answer:
        "For e-commerce stores, we automate routine product questions, order status lookups, and customer feedback collection across web and messaging channels.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },
    {
      id: "industry-realestate",
      title: "Real estate",
      keywords: ["real estate", "property", "site visit", "builders", "brokers", "realtors"],
      answer:
        "For real estate agencies, we qualify buyer requirements, schedule property site visits, and instantly notify sales agents with lead summaries.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },
    {
      id: "industry-education",
      title: "Education & coaching",
      keywords: ["education", "coaching", "institutes", "students", "admissions", "courses"],
      answer:
        "For educational institutions and coaching centers, we automate course enquiries, student intake forms, counseling appointments, and follow-ups.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },

    // 9. Demos & True Statuses (Hard Rule 1)
    {
      id: "demos-overview",
      title: "Demos & prototypes",
      keywords: ["demos", "work", "examples", "portfolio", "show me demo", "working demo", "prototype"],
      answer:
        `We have 2 documented demos on the website: ` +
        `1. "${clinicDemo.title}" (Status: ${clinicDemo.status}), and ` +
        `2. "${botDemo.title}" (Status: ${botDemo.status}).`,
      followUps: ["Clinic appointment demo", "Website chatbot demo", "Clients & case studies"],
    },
    {
      id: "demo-clinic-appointments",
      title: "Clinic appointment demo",
      keywords: [
        "clinic demo",
        "hospital appointment demo",
        "hospital appointments demo",
        "hospital appointment",
        "appointments demo",
        "demo-01",
        "clinic status",
        "appointment assistant demo",
      ],
      answer:
        `"${clinicDemo.title}" [${clinicDemo.code}] status: ${clinicDemo.status}. ` +
        `It demonstrates patient booking intake, calendar checking, and notifications. ${clinicDemo.note}`,
      followUps: ["Website chatbot demo", "Healthcare boundaries", "Contact us"],
    },
    {
      id: "demo-website-chatbot",
      title: "Website chatbot demo",
      keywords: [
        "website chatbot demo",
        "chatbot demo",
        "demo-02",
        "poc demo",
        "website ai demo",
      ],
      answer:
        `"${botDemo.title}" [${botDemo.code}] status: ${botDemo.status}. ` +
        `It is an experimental prototype exploring server-side knowledge retrieval. ${botDemo.note}`,
      followUps: ["Clinic appointment demo", "Clients & case studies", "Contact us"],
    },

    // 10. Clients & Case Studies (Honest disclosure)
    {
      id: "clients-case-studies",
      title: "Clients & case studies",
      keywords: [
        "past clients",
        "case studies",
        "client list",
        "testimonials",
        "reviews",
        "past work",
        "kisko kaam diya hai",
      ],
      answer:
        "We do not claim completed client deployments or invented case studies on this site. We demonstrate capabilities transparently through documented proofs of concept and in-development demos.",
      followUps: ["Demos & prototypes", "How a project works", "Contact us"],
    },

    // 11. WhatsApp Platform Limits (Hard Rule 3)
    {
      id: "whatsapp-limits",
      title: "WhatsApp rules and limits",
      keywords: [
        "whatsapp limits",
        "whatsapp rules",
        "meta approval",
        "bulk message",
        "unlimited whatsapp",
        "spam",
        "template approval",
        "broadcast",
      ],
      answer:
        "All WhatsApp automation uses official Meta Cloud APIs. Outgoing business messages strictly require Meta template approval and recipient consent. Unlimited unsolicited messaging is not permitted.",
      followUps: ["WhatsApp & Social Automation", "Pricing", "Contact us"],
    },

    // 12. Healthcare Boundary (Hard Rule 4)
    {
      id: "healthcare-boundary",
      title: "Healthcare boundaries",
      keywords: [
        "medical advice",
        "symptoms",
        "treatment",
        "diagnosis",
        "clinical advice",
        "medicine",
        "doctor advice",
        "illness",
      ],
      answer:
        "We cannot provide medical, clinical, or diagnostic advice. The Business Work builds administrative appointment and intake workflows for clinics, not diagnostic or clinical software.",
      followUps: ["Healthcare & clinics", "Clinic appointment demo", "Contact us"],
    },

    // 13. Principles & Human Oversight
    {
      id: "principles-overview",
      title: "Operating principles",
      keywords: ["principles", "values", "philosophy", "human in the loop", "oversight"],
      answer:
        `We follow 3 principles: ` +
        `1. ${p1.title}, ` +
        `2. ${p2.title}, and ` +
        `3. ${p3.title}. We use AI only where valuable, keep humans in the loop for sensitive actions, and define all costs upfront.`,
      followUps: ["Human oversight", "Our services", "How a project works"],
    },
    {
      id: "human-oversight",
      title: "Human oversight",
      keywords: [
        "human oversight",
        "human in the loop",
        "human handoff",
        "escalation",
        "replace humans",
        "staff",
      ],
      answer:
        "Our systems do not replace your team. Routine queries are automated, while sensitive, high-intent, or complex conversations are smoothly escalated to a designated team member.",
      followUps: ["Operating principles", "Our services", "Contact us"],
    },

    // 14. Data Privacy
    {
      id: "data-privacy",
      title: "Data and privacy",
      keywords: ["privacy", "data", "security", "store messages", "dpdp", "safe"],
      answer:
        "This assistant operates completely inside your web browser and stores nothing. When you send an enquiry through our Contact form, your details are handled under our Privacy Policy.",
      followUps: ["Contact us", "Operating principles"],
    },

    // 15. Contact & Next Steps
    {
      id: "contact-steps",
      title: "How to contact us",
      keywords: [
        "contact",
        "talk to human",
        "reach out",
        "discuss project",
        "start",
        "sampark",
        "phone",
        "email",
        "whatsapp link",
        "call",
        "kaise baat karein",
      ],
      answer:
        "You can discuss a project by clicking 'Send an enquiry' to open our project form" +
        (whatsappAvailable ? " or messaging us directly on WhatsApp." : ".") +
        " Share what you'd like to automate and we'll reply with next steps.",
      followUps: ["Our services", "Pricing", "How a project works"],
    },

    // 16. Conversational Openers & Closers
    {
      id: "greeting",
      title: "Greetings",
      keywords: [
        "hello",
        "hi",
        "hey",
        "namaste",
        "good morning",
        "good evening",
        "kya hal hai",
        "kaise ho",
        "start",
      ],
      answer:
        "Hello! I can answer questions about our services, process, industries, and demos. How can I help you today?",
      followUps: ["Our services", "How a project works", "Pricing", "Contact us"],
    },
    {
      id: "thanks",
      title: "Thank you",
      keywords: ["thanks", "thank you", "dhanyawad", "shukriya", "great", "helpful"],
      answer:
        "You're welcome! Let us know if you'd like to discuss a project, or feel free to send an enquiry anytime.",
      followUps: ["Contact us", "Our services"],
    },
    {
      id: "goodbye",
      title: "Goodbye",
      keywords: ["bye", "goodbye", "alvida", "see you", "exit"],
      answer:
        "Goodbye! Have a productive day ahead. Reach out whenever you're ready to automate your business operations.",
      followUps: ["Contact us"],
    },
  ];

  return entries;
}
