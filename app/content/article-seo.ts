export type ArticleSeoEntry = {
  image: string;
  imageAlt: string;
  related: string[];
};

export const articleSeoBySlug: Record<string, ArticleSeoEntry> = {
  "מבוא-לקריפטו-מדריך-מקיף-למתחילים": {
    image: "/images/articles/crypto-intro-signal-glass.webp",
    imageAlt: "רשת בלוקצ'יין ומטבעות קריפטו בסגנון Signal Glass",
    related: ["למה-לסחור-בקריפטו", "יתרונות-המסחר-האוטומטי", "באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח"],
  },
  "היתרונות-של-השקעות-קריפטו-חודשיות-ואי": {
    image: "/images/articles/monthly-crypto-dca-signal-glass.webp",
    imageAlt: "המחשה של השקעת קריפטו חודשית מצטברת לאורך זמן",
    related: ["מבוא-לקריפטו-מדריך-מקיף-למתחילים", "למה-לסחור-בקריפטו", "יתרונות-המסחר-האוטומטי"],
  },
  "למה-לסחור-בקריפטו": {
    image: "/images/articles/why-trade-crypto-signal-glass.webp",
    imageAlt: "שוק קריפטו גלובלי פעיל מסביב לשעון",
    related: ["מבוא-לקריפטו-מדריך-מקיף-למתחילים", "יתרונות-המסחר-האוטומטי", "איך-לפתח-אסטרטגיית-מסחר"],
  },
  "באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח": {
    image: "/images/articles/crypto-exchanges-api-signal-glass.webp",
    imageAlt: "חיבור מאובטח בין רובוט מסחר למספר בורסות קריפטו",
    related: ["פיתוח-רובוטים-בקריפטו-באיזו-שפת-תכנות", "למה-כדאי-לפתח-אלגו-בתחום-הקריפטו", "יתרונות-המסחר-האוטומטי"],
  },
  "פיתוח-רובוטים-בקריפטו-באיזו-שפת-תכנות": {
    image: "/images/articles/crypto-bot-programming-signal-glass.webp",
    imageAlt: "מודולי קוד המתחברים למנוע של רובוט מסחר בקריפטו",
    related: ["למה-כדאי-לפתח-אלגו-בתחום-הקריפטו", "איך-לפתח-אסטרטגיית-מסחר", "באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח"],
  },
  "איך-לפתח-אסטרטגיית-מסחר": {
    image: "/images/articles/trading-strategy-signal-glass.webp",
    imageAlt: "תרשים החלטות ובדיקות לפיתוח אסטרטגיית מסחר בקריפטו",
    related: ["יתרונות-המסחר-האוטומטי", "פיתוח-רובוטים-בקריפטו-באיזו-שפת-תכנות", "למה-כדאי-לפתח-אלגו-בתחום-הקריפטו"],
  },
  "יתרונות-המסחר-האוטומטי": {
    image: "/images/articles/automated-trading-benefits-signal-glass.webp",
    imageAlt: "מנוע מסחר אוטומטי בקריפטו עם בקרה וניהול סיכונים",
    related: ["איך-לפתח-אסטרטגיית-מסחר", "באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח", "למה-כדאי-לפתח-אלגו-בתחום-הקריפטו"],
  },
  "למה-כדאי-לפתח-אלגו-בתחום-הקריפטו": {
    image: "/images/articles/build-crypto-algo-signal-glass.webp",
    imageAlt: "בניית מערכת אלגוריתמית סביב רשת מסחר בקריפטו",
    related: ["פיתוח-רובוטים-בקריפטו-באיזו-שפת-תכנות", "איך-לפתח-אסטרטגיית-מסחר", "באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח"],
  },
};

export function getArticleSeo(slug: string): ArticleSeoEntry {
  return articleSeoBySlug[slug] ?? {
    image: "/signal-glass-og.png",
    imageAlt: "AlgoTradeCrypto — מסחר אוטומטי בקריפטו",
    related: [],
  };
}

export function getArticleImageVariants(image: string) {
  const base = image.replace(/\.webp$/, "");
  return {
    wide: `${base}-16x9.webp`,
    standard: `${base}-4x3.webp`,
    square: `${base}-1x1.webp`,
  };
}

export function excerptForMetadata(excerpt: string, maxLength = 155): string {
  const normalized = excerpt.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  const shortened = normalized.slice(0, maxLength + 1).replace(/\s+\S*$/, "").trim();
  return `${shortened || normalized.slice(0, maxLength).trim()}…`;
}

export function normalizeLegacyArticleHtml(content: string): string {
  return content
    .replace(/<p>\s*(?:&nbsp;|\u00a0)\s*<\/p>/gi, "")
    .replace(/<p>\s*<strong>([^<]+)<\/strong>\s*<\/p>/gi, "<h2>$1</h2>");
}
