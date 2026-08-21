import type { Metadata, Viewport } from "next";
import AccessibilityTools from "./components/accessibility-tools";
import CookieConsent from "./components/cookie-consent";
import WhatsappFloatingButton from "./components/whatsapp-floating-button";
import "./globals.css";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-W25JS30BVY";
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
  const consentBootstrap = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('js', new Date());
    gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });
    var googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}';
    googleTag.setAttribute('data-atc-google-analytics', 'true');
    document.head.appendChild(googleTag);
  `;

  return <html lang="he" dir="rtl"><head><script id="google-consent-default" dangerouslySetInnerHTML={{__html:consentBootstrap}}/></head><body><div id="main-content">{children}</div><WhatsappFloatingButton/><AccessibilityTools/><CookieConsent measurementId={googleAnalyticsId}/></body></html>;
}
