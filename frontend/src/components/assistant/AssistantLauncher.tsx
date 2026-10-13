"use client";

import dynamic from "next/dynamic";

const AssistantWidget = dynamic(
  () => import("@/components/assistant/AssistantWidget"),
  {
    ssr: false,
  }
);

export default function AssistantLauncher() {
  if (process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === "false") {
    return null;
  }
  return <AssistantWidget />;
}
