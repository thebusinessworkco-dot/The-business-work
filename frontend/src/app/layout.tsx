import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import dynamic from "next/dynamic";
import { site, isIndexingAllowed, getCleanSiteUrl } from "@/lib/site";
import { ContactModalProvider } from "@/components/ContactModal";

const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
});

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

const siteUrl = getCleanSiteUrl();
const allowIndexing = isIndexingAllowed();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Business Work | AI Automation & Systems Agency India",
    template: "%s | The Business Work",
  },
  description:
    "Practical AI agents, WhatsApp automation, and CRM workflows custom-built for businesses in India. Reduce repetitive tasks and automate operations.",
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

export const viewport: Viewport = { themeColor: "#F7F4EE" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="bg-background font-body text-ink antialiased selection:bg-[#EAE4D7] selection:text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:border focus:border-ink focus:bg-surface-card focus:px-4 focus:py-2 focus:font-headline focus:text-xs focus:uppercase focus:text-ink focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ContactModalProvider>
          {children}
          {process.env.NEXT_PUBLIC_CHAT_ENABLED === "true" && <ChatWidget />}
        </ContactModalProvider>

        {/* Optional Google Analytics 4 (only loaded if NEXT_PUBLIC_GA_ID is set) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
