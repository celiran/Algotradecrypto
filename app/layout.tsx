import type { Metadata, Viewport } from "next";
import AccessibilityTools from "./components/accessibility-tools";
import CookieConsent from "./components/cookie-consent";
import WhatsappFloatingButton from "./components/whatsapp-floating-button";
import "./globals.css";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-NQV6NBMXV2";
const publicSiteUrl = "https://algotradecrypto.com";
const socialImage = "/signal-glass-og.png";

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: { default: "AlgoTradeCrypto | הדרך למסחר אוטומטי בקריפטו", template: "%s | AlgoTradeCrypto" },
  description: "למדו לבנות רובוט מסחר בקריפטו, השוו בין רובוטי קריפטו מוכנים או קבלו מערכת מסחר מותאמת אישית.",
  applicationName: "AlgoTradeCrypto",
  authors: [{ name: "אלירן כהן", url: "/אודות/" }],
  creator: "אלירן כהן",
  publisher: "AlgoTradeCrypto",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed/" } },
  openGraph: { type: "website", locale: "he_IL", url: "/", siteName: "AlgoTradeCrypto", title: "הדרך שלך למסחר אוטומטי בקריפטו", description: "ללמוד. לבחור. לבנות. המרכז הישראלי לפתרונות מסחר אוטומטי בקריפטו.", images: [{url:socialImage,secureUrl:socialImage,width:1728,height:910,type:"image/png",alt:"AlgoTradeCrypto — הדרך למסחר אוטומטי בקריפטו"}] },
  twitter: { card: "summary_large_image", title: "AlgoTradeCrypto", description: "ללמוד. לבחור. לבנות מערכות מסחר אוטומטי בקריפטו.", images: [{url:socialImage,alt:"AlgoTradeCrypto — הדרך למסחר אוטומטי בקריפטו"}] },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = { themeColor: "#050a0e", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body><div id="main-content">{children}</div><WhatsappFloatingButton/><AccessibilityTools/><CookieConsent measurementId={googleAnalyticsId}/></body></html>;
}
