import { whatsappLink } from "@/lib/site";

export type DemoCategory =
  | "Restaurant"
  | "Salon & Wellness"
  | "Real Estate"
  | "Healthcare"
  | "AI Agents"
  | "CRM"
  | "Automation";

export type DemoStatus = "LIVE DEMO" | "COMING SOON";

export interface DemoItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  category: DemoCategory;
  status: DemoStatus;
  badgeLabel?: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
  /** The live deployment URL currently running */
  targetUrl: string;
  /** The preferred canonical path for future reverse-proxy integration */
  preferredPath: string;
  /** Routing strategy: "direct" opens targetUrl; "proxy" routes to preferredPath */
  routingMode: "direct" | "proxy";
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const demos: DemoItem[] = [
  {
    id: "cafe-restaurant-os",
    slug: "cafe",
    code: "DEMO-01",
    title: "Café & Restaurant Management System",
    category: "Restaurant",
    status: "LIVE DEMO",
    badgeLabel: "Live Interactive Demo",
    eyebrow: "01 // RESTAURANT OS",
    description:
      "An all-in-one digital operating system for cafés and restaurants, bringing contactless QR table ordering, live kitchen display (KDS), split billing, automated inventory alerts, and instant loyalty rewards together.",
    capabilities: [
      "QR Table Ordering",
      "Customer Dashboard",
      "Kitchen Management",
      "Billing & Payments",
      "Loyalty Rewards",
      "Restaurant Owner Dashboard",
    ],
    targetUrl: "https://cafe-demo-lovat-sigma.vercel.app",
    preferredPath: "/demo/cafe",
    routingMode: "proxy",
    image: "/demos/cafe-preview.webp",
    imageAlt: "Café & Restaurant Management System — Table ordering and live operations preview",
    featured: true,
  },
  {
    id: "salon-spa-os",
    slug: "salon",
    code: "DEMO-02",
    title: "Salon & Luxury Spa Client & Booking Engine",
    category: "Salon & Wellness",
    status: "LIVE DEMO",
    badgeLabel: "WhatsApp Booking Demo",
    eyebrow: "02 // SALON & SPA AUTOMATION",
    description:
      "Effortless appointment booking and client management engineered for salons, barbershops, and wellness spas. Eliminates no-shows with automated WhatsApp reminders, stylist chair scheduling, and client treatment history.",
    capabilities: [
      "WhatsApp Appointment Booking",
      "Stylist & Chair Scheduling",
      "Automated Reminder Notifications",
      "Package & Membership Billing",
      "Client History & Preferences",
      "Review & Re-booking Triggers",
    ],
    targetUrl: whatsappLink("Hi! I would like to try the Salon & Spa Appointment Booking Demo for my salon business."),
    preferredPath: "/demo#salon",
    routingMode: "direct",
    image: "/demos/salon-preview.webp",
    imageAlt: "Salon & Luxury Spa Appointment and Client Management System preview",
    featured: true,
  },
  {
    id: "real-estate-crm",
    slug: "real-estate",
    code: "DEMO-03",
    title: "Real Estate Inbound Lead & Site Visit CRM",
    category: "Real Estate",
    status: "LIVE DEMO",
    badgeLabel: "Property Engine Demo",
    eyebrow: "03 // REAL ESTATE CRM",
    description:
      "High-converting lead engine built for real estate developers, agencies, and brokers. Instantly qualifies buyer budgets on WhatsApp, shares project brochures, and books scheduled site visits directly into your calendar.",
    capabilities: [
      "Instant Lead Qualification",
      "WhatsApp Site-Visit Scheduling",
      "Project Brochure Delivery",
      "Broker & Agent Pipeline CRM",
      "Unit Inventory & Price Calculator",
      "Automated Deal Follow-up Sequences",
    ],
    targetUrl: whatsappLink("Hi! I would like to experience the Real Estate Inbound Lead & Site Visit CRM Demo."),
    preferredPath: "/demo#real-estate",
    routingMode: "direct",
    image: "/demos/real-estate-preview.webp",
    imageAlt: "Real Estate Lead Qualification and Site Visit Scheduling CRM preview",
    featured: true,
  },
  {
    id: "clinic-patient-os",
    slug: "clinic",
    code: "DEMO-04",
    title: "Clinic & Healthcare Patient Flow Automation",
    category: "Healthcare",
    status: "LIVE DEMO",
    badgeLabel: "Clinic Intake Demo",
    eyebrow: "04 // CLINIC AUTOMATION",
    description:
      "Smart front-desk and patient flow system for clinics and specialized doctors. Patients book slots over WhatsApp, receive token numbers, access digital prescriptions, and get routine follow-up care reminders automatically.",
    capabilities: [
      "Doctor Token & Slot Booking",
      "Pre-Visit Intake & Triage",
      "Automated WhatsApp Reminders",
      "Digital Prescription Delivery",
      "Post-Consultation Follow-ups",
      "Multi-Doctor Clinic Dashboard",
    ],
    targetUrl: whatsappLink("Hi! I would like to try the Healthcare & Clinic Appointment Booking Demo."),
    preferredPath: "/solutions/whatsapp-appointment-booking-clinics",
    routingMode: "direct",
    image: "/demos/clinic-preview.webp",
    imageAlt: "Healthcare Clinic WhatsApp Booking and Patient Flow preview",
    featured: false,
  },
];

/**
 * Returns the actionable link for a demo based on its configured routing mode.
 * In "direct" mode, points directly to the active live deployment.
 * In "proxy" mode, points to the future canonical internal path.
 */
export function getDemoLink(demo: DemoItem): {
  href: string;
  isExternal: boolean;
} {
  if (demo.routingMode === "proxy") {
    return { href: demo.preferredPath, isExternal: false };
  }
  return { href: demo.targetUrl, isExternal: true };
}

/**
 * Dynamically derives available categories with at least one existing demo item.
 * Always includes "All" as the default view.
 */
export function getAvailableCategories(): string[] {
  const activeCategories = Array.from(new Set(demos.map((d) => d.category)));
  return ["All", ...activeCategories];
}

