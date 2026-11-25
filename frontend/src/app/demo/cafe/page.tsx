import type { Metadata } from "next";
import CafeDemoViewer from "./CafeDemoViewer";

const DEMO_URL =
  process.env.CAFE_DEMO_ORIGIN || "https://cafe.thebusinesswork.com";

export const metadata: Metadata = {
  title: "Café & Restaurant OS Live Demo",
  description:
    "Interactive live demo of The Business Work Café & Restaurant Management System with QR table ordering, kitchen KDS, and billing.",
  alternates: {
    canonical: "/demo/cafe",
  },
  openGraph: {
    title: "Café & Restaurant OS Live Demo | The Business Work",
    description:
      "Interactive live demo of The Business Work Café & Restaurant Management System with QR table ordering, kitchen KDS, and billing.",
    url: "/demo/cafe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Café & Restaurant OS Live Demo | The Business Work",
    description:
      "Interactive live demo of The Business Work Café & Restaurant Management System with QR table ordering, kitchen KDS, and billing.",
  },
};

export default function CafeDemoPage() {
  return <CafeDemoViewer demoUrl={DEMO_URL} />;
}
