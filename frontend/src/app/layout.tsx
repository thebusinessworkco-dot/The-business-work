import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { site, isIndexingAllowed, getCleanSiteUrl } from "@/lib/site";
import { ContactModalProvider } from "@/components/ContactModal";
import CookieConsent from "@/components/CookieConsent";
import AssistantLauncher from "@/components/assistant/AssistantLauncher";
import ScrollManager from "@/components/ScrollManager";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: false,
});

const siteUrl = getCleanSiteUrl();
const allowIndexing = isIndexingAllowed();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Business Work | AI & WhatsApp Tools for Business",
    template: "%s | The Business Work",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "The Business Work — AI Automation & Digital Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${siteUrl}/opengraph-image`],
  },
  icons: {
    icon: [
      { url: "/tbw-icon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/tbw-icon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/tbw-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/tbw-icon-dark.svg", media: "(prefers-color-scheme: dark)" },
      { url: "/tbw-icon-light.svg", media: "(prefers-color-scheme: light)" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = { themeColor: "#FAF7E8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${manrope.variable} ${newsreader.variable}`}>
      <body className="bg-background font-body text-ink antialiased selection:bg-[#EAE4D7] selection:text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:border focus:border-ink focus:bg-surface-card focus:px-4 focus:py-2 focus:font-headline focus:text-xs focus:uppercase focus:text-ink focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ContactModalProvider>
          <ScrollManager />
          {children}
          <AssistantLauncher />
        </ContactModalProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
