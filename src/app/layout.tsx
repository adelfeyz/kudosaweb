import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ConditionalHeader from "../components/navigation/ConditionalHeader";
import { config } from "@/lib/config";
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker";

const siteUrl = config.siteUrl;

const pointerSiteTitle =
  "نرم افزار مدیریت استراتژیک پوینتر - جاری سازی استراتژی مدیریت اهداف";

const baseMetadata: Metadata = {
  title: {
    default: pointerSiteTitle,
    template: "%s | پوینتر",
  },
  description:
    "نرم‌افزار مدیریت استراتژیک و ارزیابی عملکرد پوینتر — ابزار برنامه‌ریزی چابک به روش OKR برای جاری‌سازی استراتژی، مدیریت اهداف و ارزیابی عملکرد.",
  keywords: [
    "پوینتر",
    "OKR",
    "مدیریت استراتژیک",
    "مدیریت اهداف",
    "ارزیابی عملکرد",
    "جاری‌سازی استراتژی",
    "برنامه‌ریزی چابک",
  ],
  authors: [{ name: "پوینتر" }],
  creator: "پوینتر",
  publisher: "پوینتر",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "پوینتر",
    title: pointerSiteTitle,
    description:
      "نرم‌افزار مدیریت استراتژیک و ارزیابی عملکرد پوینتر — ابزار برنامه‌ریزی چابک به روش OKR.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: pointerSiteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pointerSiteTitle,
    description:
      "نرم‌افزار مدیریت استراتژیک و ارزیابی عملکرد پوینتر — ابزار برنامه‌ریزی چابک به روش OKR.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const metadata: Metadata = config.googleSearchConsoleVerification
  ? {
      ...baseMetadata,
      verification: {
        google: config.googleSearchConsoleVerification,
      },
    }
  : baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ga4MeasurementId = config.ga4MeasurementId;

  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Carattere&family=Staatliches&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Carattere&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Staatliches&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
        {/* Google Analytics 4 */}
        {ga4MeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4MeasurementId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased font-iran-sans">
        {ga4MeasurementId && <GoogleAnalyticsTracker />}
        <ErrorReporter />
        <ConditionalHeader />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}