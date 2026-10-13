import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { site, isIndexingAllowed, getCleanSiteUrl } from "@/lib/site";
import { ContactModalProvider } from "@/components/ContactModal";
import CookieConsent from "@/components/CookieConsent";

const AssistantWidget = dynamic(() => import("@/components/assistant/AssistantWidget"), {
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
    default: "The Business Work | AI Automation & Digital Systems",
    template: "%s | The Business Work",
  },
  description:
    "We help small and medium businesses in India and worldwide automate customer enquiries, bookings, lead follow-ups and repetitive admin — using WhatsApp, AI and connected business tools.",
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

export const viewport: Viewport = { themeColor: "#F7F4EE" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              function syncThemeIcon(){
                try {
                  var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var target = isDark ? '/tbw-icon-dark.svg' : '/tbw-icon-light.svg';
                  var links = document.querySelectorAll("link[rel*='icon']");
                  links.forEach(function(l){
                    if (l.getAttribute('type') === 'image/svg+xml' || l.getAttribute('rel') === 'shortcut icon') {
                      if (!l.hasAttribute('media')) {
                        l.href = target;
                      }
                    }
                  });
                } catch(e) {}
              }
              syncThemeIcon();
              if (window.matchMedia) {
                var mq = window.matchMedia('(prefers-color-scheme: dark)');
                if (mq.addEventListener) {
                  mq.addEventListener('change', syncThemeIcon);
                } else if (mq.addListener) {
                  mq.addListener(syncThemeIcon);
                }
              }
            })();`,
          }}
        />
      </head>
      <body className="bg-background font-body text-ink antialiased selection:bg-[#EAE4D7] selection:text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:border focus:border-ink focus:bg-surface-card focus:px-4 focus:py-2 focus:font-headline focus:text-xs focus:uppercase focus:text-ink focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ContactModalProvider>
          {children}
          {process.env.NEXT_PUBLIC_ASSISTANT_ENABLED !== "false" && <AssistantWidget />}
        </ContactModalProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
