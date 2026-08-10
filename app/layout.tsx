import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: "AlgoTradeCrypto — שני כיוונים עיצוביים חדשים",
    description: "Signal Glass מול Algorithm Blueprint — השוואת עיצוב אינטראקטיבית.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "שתי דרכים להפוך אסטרטגיה למערכת",
      description: "Signal Glass מול Algorithm Blueprint",
      images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630 }],
      locale: "he_IL",
      type: "website",
    },
    twitter: { card: "summary_large_image", images: [new URL("/og.png", base).toString()] },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="he" dir="rtl"><body>{children}</body></html>;
}
