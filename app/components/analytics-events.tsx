"use client";

import { useEffect } from "react";

type AnalyticsValue = string | number | boolean;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(name: string, parameters: Record<string, AnalyticsValue> = {}) {
  window.gtag?.("event", name, parameters);
}

export default function AnalyticsEvents() {
  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href") || "";
      const sourcePath = window.location.pathname;

      if (/^(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(rawHref)) {
        trackAnalyticsEvent("contact_click", { method: "whatsapp", source_path: sourcePath });
        return;
      }

      if (rawHref.startsWith("mailto:")) {
        trackAnalyticsEvent("contact_click", { method: "email", source_path: sourcePath });
        return;
      }

      try {
        const destination = new URL(rawHref, window.location.origin);
        if (destination.origin === window.location.origin && decodeURIComponent(destination.pathname) === "/צור-קשר/") {
          trackAnalyticsEvent("contact_navigation", { source_path: sourcePath });
        }
      } catch {
        // Ignore malformed or non-navigation href values.
      }
    };

    document.addEventListener("click", trackContactClick, true);
    return () => document.removeEventListener("click", trackContactClick, true);
  }, []);

  return null;
}
