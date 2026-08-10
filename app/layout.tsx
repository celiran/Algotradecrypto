import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://algotradecrypto.com"),
  title: { default: "AlgoTradeCrypto | הדרך למסחר אוטומטי בקריפטו", template: "%s | AlgoTradeCrypto" },
  description: "למדו לבנות מערכות מסחר אוטומטי, השוו בין כלים מוכנים או קבלו פתרון אלגו מותאם אישית לקריפטו.",
  applicationName: "AlgoTradeCrypto",
  authors: [{ name: "אלירן כהן", url: "https://autosysfx.com/" }],
  creator: "אלירן כהן",
  publisher: "AlgoTradeCrypto",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed/" } },
  openGraph: { type: "website", locale: "he_IL", url: "/", siteName: "AlgoTradeCrypto", title: "הדרך שלך למסחר אוטומטי בקריפטו", description: "ללמוד. לבחור. לבנות. המרכז הישראלי לפתרונות מסחר אוטומטי בקריפטו.", images: [{url:"/signal-glass-og.png",width:1728,height:910,alt:"AlgoTradeCrypto — הדרך למסחר אוטומטי בקריפטו"}] },
  twitter: { card: "summary_large_image", title: "AlgoTradeCrypto", description: "ללמוד. לבחור. לבנות מערכות מסחר אוטומטי בקריפטו.", images: ["/signal-glass-og.png"] },
  icons: { icon: "/favicon.svg" },
  category: "technology",
};

export const viewport: Viewport = { themeColor: "#050a0e", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body>{children}</body></html>;
}
