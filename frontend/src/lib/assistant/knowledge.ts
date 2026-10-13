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
        "I am an automated assistant for The Business Work. I am not an AI model and not a person. I give answers directly from this website to help you learn about our services.",
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
        `${site.name} is an agency based in India. We build simple tools for your business. They answer customers on WhatsApp, track leads, and send reminders for you.`,
      followUps: ["Our services", "How a project works", "Contact us"],
    },

    // 2b. Founder Information
    {
      id: "about-founder",
      title: "Who's behind The Business Work",
      keywords: [
        "founder",
        "who founded",
        "who is aman",
        "aman rajbhar",
        "who runs",
        "owner",
        "team",
        "founder kaun hai",
        "kiska business hai",
      ],
      answer:
        `The Business Work was founded by ${site.founder}. He builds simple tools for businesses in India and beyond. He learns how your work runs and builds a fix with clear scope.`,
      followUps: ["What The Business Work does", "Our services", "Contact us"],
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
        `We offer 4 services: 1. ${s1.title}, 2. ${s2.title}, 3. ${s3.title}, and 4. ${s4.title}. Each tool is built around how your business works.`,
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
        `${s1.title}: ${s1.summary} It solves ${s1.solves.toLowerCase()} AI providers charge their own fees. Who pays is agreed in your written proposal.`,
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
        `${s2.title}: ${s2.summary} It solves ${s2.solves.toLowerCase()} We work with your CRM or suggest one that fits your team and budget.`,
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
        `${s3.title}: ${s3.summary} It solves ${s3.solves.toLowerCase()} We prefer simple rule-based tools over AI whenever they are simpler and more reliable.`,
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
        `${s4.title}: ${s4.summary} It solves ${s4.solves.toLowerCase()} All messaging features require Meta approval, approved templates, and customer consent.`,
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
        "If your business does not fit a standard setup, we design custom tools for you. We connect your specific apps, forms, and sheets. We start by finding what slows you down.",
      followUps: ["How a project works", "Pricing", "Contact us"],
    },

    // 5. How a Project Works (6 steps)
    {
      id: "process-steps",
      title: "How a project works",
      keywords: [
        "process",
        "how it works",
        "how a project works",
        "how does a project work",
        "start to finish",
        "steps",
        "methodology",
        "delivery",
        "kaise kaam karta hai",
        "project steps",
        "phases",
        "timeline",
      ],
      answer:
        `Our work follows 6 simple steps: ` +
        processSteps.map((s, i) => `${i + 1}. ${s.phase} (${s.title})`).join(", ") +
        `. We show you a demo first, and go live only when you approve it.`,
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
        "Project timelines depend on the tools and steps you need. We agree on a written schedule during planning before any build work starts.",
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
        "Project costs depend on what you need. AI and WhatsApp providers charge their own fees. Who pays is agreed in your written proposal. Send an enquiry for a clear written estimate.",
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
        `We work across 6 key areas: ` +
        industries.map((ind) => ind.name).join(", ") +
        `. Each system fits the daily needs of that industry.`,
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
        "For clinics, we build tools for booking visits and answering questions. Patient privacy is protected. AI helps with booking only and never gives medical advice.",
      followUps: ["Healthcare boundaries", "Clinic appointment demo", "Pricing"],
    },
    {
      id: "industry-local",
      title: "Local businesses",
      keywords: ["local business", "salons", "repair", "retail", "shop", "local shops"],
      answer:
        "For salons, repair shops, and stores, we automate booking requests and customer questions. You can answer enquiries and follow up on time.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },
    {
      id: "industry-sales",
      title: "Sales teams & agencies",
      keywords: ["sales teams", "agencies", "lead capture", "b2b", "sales reps", "pipeline tracking"],
      answer:
        "For sales teams, we log new leads, check who is ready to buy, and send follow-up reminders. A person can step in at any time.",
      followUps: ["CRM & Sales Automation", "Pricing", "Contact us"],
    },
    {
      id: "industry-ecommerce",
      title: "E-commerce",
      keywords: ["ecommerce", "e-commerce", "online store", "shopify", "orders", "order tracking"],
      answer:
        "For online stores, we answer common order questions and route customer enquiries. Staff can step in for special requests.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },
    {
      id: "industry-realestate",
      title: "Real estate",
      keywords: ["real estate", "property", "site visit", "builders", "brokers", "realtors"],
      answer:
        "For real estate firms, we find who is ready to buy. We book visits and alert your sales team with lead details.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },
    {
      id: "industry-education",
      title: "Education & coaching",
      keywords: ["education", "coaching", "institutes", "students", "admissions", "courses"],
      answer:
        "For institutes and coaching centres, we answer course questions, log student leads, and schedule counselling visits.",
      followUps: ["Our services", "Pricing", "Contact us"],
    },

    // 9. Demos & True Statuses (Hard Rule 1)
    {
      id: "demos-overview",
      title: "Demos & prototypes",
      keywords: ["demos", "work", "examples", "portfolio", "show me demo", "working demo", "prototype"],
      answer:
        `We have 2 demos on our website: ` +
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
        `It shows patient booking, calendar checks, and team alerts. ${clinicDemo.note}`,
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
        `It is an early test tool that answers questions using approved notes. ${botDemo.note}`,
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
        "We do not claim past client work on this site. We show what we can build through working demos and test projects.",
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
        "All WhatsApp tools use official Meta APIs. Messages you start require Meta template approval. People must agree before you message them. Spam is not permitted.",
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
        "We do not give medical or clinical advice. We build administrative booking tools for clinics, not medical software.",
      followUps: ["Healthcare & clinics", "Clinic appointment demo", "Contact us"],
    },

    // 13. Principles & Human Oversight
    {
      id: "principles-overview",
      title: "Operating principles",
      keywords: ["principles", "values", "philosophy", "human in the loop", "oversight"],
      answer:
        `We follow 3 principles: ` +
        `1. ${p1.title} ` +
        `2. ${p2.title} ` +
        `3. ${p3.title} ` +
        `We use AI when helpful, keep a person in loop, and share all costs upfront.`,
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
        "Our tools do not replace your team. Routine questions are answered automatically. A person can step in and take over any chat.",
      followUps: ["Operating principles", "Our services", "Contact us"],
    },

    // 14. Data Privacy
    {
      id: "data-privacy",
      title: "Data and privacy",
      keywords: ["privacy", "data", "security", "store messages", "dpdp", "safe"],
      answer:
        "This assistant runs inside your web browser and saves no data. When you send an enquiry, your details are handled under our Privacy Policy.",
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
        `You can email us at ${site.email}, message on WhatsApp at ${site.phone}, or view our Instagram @thebusinesswork.co. You can also send an enquiry on this site.`,
      followUps: ["Our services", "Pricing", "How a project works"],
    },

    {
      id: "social-media",
      title: "Social media and Instagram",
      keywords: [
        "instagram",
        "insta",
        "social media",
        "instagram page",
        "socials",
        "follow",
      ],
      answer:
        `Follow The Business Work on Instagram at ${site.instagram}. We share updates on simple business tools and digital systems.`,
      followUps: ["How to contact us", "Our services"],
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
        "Hello! I can answer questions about our services, process, and demos. How can I help you today?",
      followUps: ["Our services", "How a project works", "Pricing", "Contact us"],
    },
    {
      id: "thanks",
      title: "Thank you",
      keywords: ["thanks", "thank you", "dhanyawad", "shukriya", "great", "helpful"],
      answer:
        "You are welcome! Let us know if you want to discuss a project, or send an enquiry anytime.",
      followUps: ["Contact us", "Our services"],
    },
    {
      id: "goodbye",
      title: "Goodbye",
      keywords: ["bye", "goodbye", "alvida", "see you", "exit"],
      answer:
        "Goodbye! Reach out whenever you are ready to make your daily work easier.",
      followUps: ["Contact us"],
    },
  ];

  return entries;
}
