import { site, isPlaceholder } from "./site";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { industries } from "@/content/industries";
import { demos } from "@/content/work";
import { principles } from "@/content/principles";

/**
 * Builds a clean, plain-text knowledge representation of The Business Work
 * directly from the website's source content files.
 *
 * Hard rules applied:
 * - Omits any placeholder contact information (email, phone, WhatsApp)
 * - Contains real demo statuses exactly as documented in work.ts
 * - Omits any [[TO CONFIRM]] text
 * - Contains no currency amounts
 */
export function buildChatKnowledge(): string {
  const sections: string[] = [];

  // 1. Organization Overview
  const orgLines: string[] = [
    `ORGANIZATION OVERVIEW:`,
    `Name: ${site.name}`,
    `Tagline: ${site.tagline}`,
    `Description: ${site.description}`,
  ];

  if (!isPlaceholder("email", site.email)) {
    orgLines.push(`Email: ${site.email}`);
  }
  if (!isPlaceholder("phone", site.phone)) {
    orgLines.push(`Phone: ${site.phone}`);
  }
  if (!isPlaceholder("whatsapp", site.whatsappNumber)) {
    orgLines.push(`WhatsApp: ${site.whatsappNumber}`);
  }
  if (!isPlaceholder("location", site.location)) {
    orgLines.push(`Location: ${site.location}`);
  }

  sections.push(orgLines.join("\n"));

  // 2. Core Principles
  const principlesLines: string[] = [
    `OPERATING PRINCIPLES:`,
    ...principles.map(
      (p) => `- ${p.title} (${p.label}): ${p.body}`
    ),
  ];
  sections.push(principlesLines.join("\n"));

  // 3. Exactly 4 Services
  const servicesLines: string[] = [
    `SERVICES OFFERED (EXACTLY 4 SERVICES):`,
    ...services.map((s) => {
      const parts = [
        `SERVICE ${s.index}: ${s.title} [Tag: ${s.tag}]`,
        `Summary: ${s.summary}`,
        `What it solves: ${s.solves}`,
        `Capabilities:`,
        ...s.capabilities.map((c) => `  * ${c}`),
        `Dependencies & Scope Notes: ${s.depends}`,
      ];

      if (s.intro) {
        parts.push(`Introduction: ${s.intro}`);
      }
      if (s.useCases && s.useCases.length > 0) {
        parts.push(`Use Cases:`);
        s.useCases.forEach((uc) => parts.push(`  * ${uc}`));
      }
      if (s.howItWorks && s.howItWorks.length > 0) {
        parts.push(`How it works:`);
        s.howItWorks.forEach((hw, i) => parts.push(`  ${i + 1}. ${hw}`));
      }
      if (s.limits && s.limits.length > 0) {
        parts.push(`Service Limitations & Boundaries:`);
        s.limits.forEach((l) => parts.push(`  * ${l}`));
      }
      if (s.faq && s.faq.length > 0) {
        parts.push(`Frequently Asked Questions:`);
        s.faq.forEach((f) => parts.push(`  Q: ${f.question}\n  A: ${f.answer}`));
      }

      return parts.join("\n");
    }),
  ];
  sections.push(servicesLines.join("\n\n"));

  // 4. Implementation Process
  const processLines: string[] = [
    `DELIVERY PROCESS & METHODOLOGY:`,
    ...processSteps.map(
      (step, idx) =>
        `${idx + 1}. Phase: ${step.phase} - ${step.title}\n   Description: ${step.body}\n   Output deliverable: ${step.output}`
    ),
  ];
  sections.push(processLines.join("\n"));

  // 5. Industries Served
  const industryLines: string[] = [
    `INDUSTRIES SERVED:`,
    ...industries.map((ind) => `- ${ind.name}: ${ind.body}`),
  ];
  sections.push(industryLines.join("\n"));

  // 6. Work & Demos (True Statuses)
  const demoLines: string[] = [
    `DEMOS & WORK IN PROGRESS:`,
    ...demos.map((d) => {
      const parts = [
        `Demo [${d.code}]: ${d.title}`,
        `Category: ${d.category}`,
        `True Status: ${d.status}`,
        `Overview: ${d.body}`,
        `Flow (${d.flowTitle}): ${d.flow.map((f) => `[${f.tag}] ${f.text}`).join(" -> ")}`,
        `Scope & Architecture:`,
        ...d.scope.map((s) => `  * ${s.label}: ${s.value}`),
        `Important Note: ${d.note}`,
      ];
      return parts.join("\n");
    }),
  ];
  sections.push(demoLines.join("\n\n"));

  return sections.join("\n\n---\n\n");
}
