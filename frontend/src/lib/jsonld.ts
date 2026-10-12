import { site, isPlaceholder, getCleanSiteUrl } from "@/lib/site";
import { services, type Service } from "@/content/services";

/**
 * Safely serialize JSON-LD with escaped `<` characters to prevent script injection.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export type HomeJsonLd = [
  {
    "@context": "https://schema.org";
    "@type": "WebSite";
    name: string;
    url: string;
    inLanguage: string;
  },
  {
    "@context": "https://schema.org";
    "@type": "Organization";
    name: string;
    url: string;
    description: string;
    logo: string;
    areaServed: {
      "@type": "Country";
      name: string;
    };
    email?: string;
    telephone?: string;
    address?: {
      "@type": "PostalAddress";
      addressCountry: string;
      addressLocality: string;
    };
    sameAs?: string[];
  },
  {
    "@context": "https://schema.org";
    "@type": "ProfessionalService";
    name: string;
    url: string;
    description: string;
    areaServed: {
      "@type": "Country";
      name: string;
    };
    serviceType: string[];
  }
];

export type ServiceJsonLd = Array<
  | {
      "@context": "https://schema.org";
      "@type": "Service";
      name: string;
      description: string;
      url: string;
      provider: {
        "@type": "Organization";
        name: string;
        url: string;
      };
      areaServed: {
        "@type": "Country";
        name: string;
      };
    }
  | {
      "@context": "https://schema.org";
      "@type": "BreadcrumbList";
      itemListElement: Array<{
        "@type": "ListItem";
        position: number;
        name: string;
        item: string;
      }>;
    }
  | {
      "@context": "https://schema.org";
      "@type": "FAQPage";
      mainEntity: Array<{
        "@type": "Question";
        name: string;
        acceptedAnswer: {
          "@type": "Answer";
          text: string;
        };
      }>;
    }
>;

/**
 * Structured data for the Home page:
 * - WebSite (with inLanguage en-IN)
 * - Organization (areaServed India, omits placeholder email, phone, location, social)
 * - ProfessionalService (honest agency offering in India with zero fake reviews/ratings, serviceType derived from services.ts)
 */
export function getHomeJsonLd(): HomeJsonLd {
  const siteUrl = getCleanSiteUrl();

  const organization: HomeJsonLd[1] = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    description: site.description,
    logo: `${siteUrl}/icon`,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  // Only emit contact details if they are verified non-placeholder values
  if (!isPlaceholder("email", site.email)) {
    organization.email = site.email;
  }
  if (!isPlaceholder("phone", site.phone)) {
    organization.telephone = site.phone;
  }
  if (!isPlaceholder("location", site.location)) {
    organization.address = {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: site.location,
    };
  }
  if (!isPlaceholder("social") && site.social.length > 0) {
    organization.sameAs = site.social.map((s) => s.href);
  }

  const website: HomeJsonLd[0] = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    inLanguage: "en-IN",
  };

  const professionalService: HomeJsonLd[2] = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: siteUrl,
    description: site.description,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: services.map((s) => s.title),
  };

  return [website, organization, professionalService];
}


/**
 * Structured data for a Service Detail page:
 * - Service
 * - BreadcrumbList
 * - FAQPage (matches on-page visible FAQ text exactly)
 */
export function getServiceJsonLd(service: Service): ServiceJsonLd {
  const siteUrl = getCleanSiteUrl();
  const serviceUrl = `${siteUrl}/services/${service.id}`;

  const serviceSchema: ServiceJsonLd[0] = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  const breadcrumb: ServiceJsonLd[1] = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: serviceUrl,
      },
    ],
  };

  const schemas: ServiceJsonLd = [serviceSchema, breadcrumb];

  if (Array.isArray(service.faq) && service.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return schemas;
}

