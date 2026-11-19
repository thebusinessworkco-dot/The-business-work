import type { Metadata } from "next";
import CafeDemoViewer from "./CafeDemoViewer";

const DEMO_URL =
  process.env.CAFE_DEMO_ORIGIN || "https://cafe-demo-lovat-sigma.vercel.app";

export const metadata: Metadata = {
  title: "Café & Restaurant OS Live Demo | The Business Work",
  description:
    "Interactive live demo of The Business Work Café & Restaurant Management System with QR table ordering, kitchen KDS, and billing.",
  alternates: {
    canonical: "/demo/cafe",
  },
};

export default function CafeDemoPage() {
  return <CafeDemoViewer demoUrl={DEMO_URL} />;
}
