import type { LegalSection } from "@/content/legal/types";
import { privacySections } from "@/content/legal/privacy";
import { termsSections } from "@/content/legal/terms";
import { isIndexingAllowed } from "@/lib/site";

export function hasUnresolvedPlaceholders(
  content: string | readonly LegalSection[] | LegalSection[]
): boolean {
  if (typeof content === "string") {
    return content.includes("[[TO CONFIRM");
  }

  return content.some((section) => {
    if (section.heading.includes("[[TO CONFIRM")) return true;
    if (section.paragraphs.some((p) => p.includes("[[TO CONFIRM"))) return true;
    if (section.list?.some((item) => item.includes("[[TO CONFIRM"))) return true;
    return false;
  });
}

export function isLegalIndexable(page: "privacy" | "terms"): boolean {
  const sections = page === "privacy" ? privacySections : termsSections;
  const hasPlaceholders = hasUnresolvedPlaceholders(sections);
  if (hasPlaceholders) return false;
  return isIndexingAllowed();
}

export function getLegalRobots(page: "privacy" | "terms") {
  if (isLegalIndexable(page)) {
    return {
      index: true,
      follow: true,
    };
  }
  return {
    index: false,
    follow: false,
  };
}
