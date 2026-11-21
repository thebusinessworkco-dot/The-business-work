"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Enable browser's natural scroll restoration for back/forward navigation
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }

    const scrollToTarget = (id: string, behavior: ScrollBehavior = "smooth") => {
      const el = document.getElementById(id);
      if (el) {
        // Offset for floating/sticky navigation pill
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior });
        return true;
      }
      return false;
    };

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        scrollToTarget(id, "smooth");
      }
    };

    if (pathname === "/") {
      // Check if user clicked from a service card and wants to return to the services section
      const returnSection = sessionStorage.getItem("tbw_return_section");
      if (returnSection) {
        sessionStorage.removeItem("tbw_return_section");
        // Try immediately, then after initial layout and font loading
        scrollToTarget(returnSection, "auto");
        const t1 = setTimeout(() => scrollToTarget(returnSection, "smooth"), 60);
        const t2 = setTimeout(() => scrollToTarget(returnSection, "smooth"), 200);
        const t3 = setTimeout(() => scrollToTarget(returnSection, "smooth"), 450);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }

      if (window.location.hash) {
        const t1 = setTimeout(handleHash, 60);
        const t2 = setTimeout(handleHash, 250);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    } else {
      // When navigating forward to a new page (e.g. /services/...) without anchor, start at top
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }

    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, [pathname]);

  return null;
}
