export type DemoCategory = "Restaurant" | "AI Agents" | "CRM" | "Automation";

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
      "An all-in-one digital solution for cafés and restaurants, bringing QR ordering, kitchen operations, billing, customer management and loyalty together.",
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
    routingMode: "direct",
    image: "/demos/cafe-preview.webp",
    imageAlt: "Café & Restaurant Management System — Table ordering and live operations preview",
    featured: true,
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

