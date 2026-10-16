"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AssistantWidget = dynamic(
  () => import("@/components/assistant/AssistantWidget"),
  {
    ssr: false,
  }
);

export default function AssistantLauncher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load after critical paint is done using requestIdleCallback
    if ("requestIdleCallback" in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        () => setMounted(true),
        { timeout: 2500 }
      );
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    } else {
      const timer = setTimeout(() => setMounted(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === "false" || !mounted) {
    return null;
  }
  return <AssistantWidget />;
}
