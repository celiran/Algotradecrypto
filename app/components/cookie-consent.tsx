"use client";

import { useEffect, useRef, useState } from "react";

type ConsentChoice = { version: 2; analytics: boolean; decidedAt: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "atc-cookie-consent";
const CONSENT_VERSION = 2;
const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const OPEN_SETTINGS_EVENT = "atc:open-cookie-settings";

function readStoredChoice(): ConsentChoice | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as ConsentChoice | null;
    if (!parsed || parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return null;
    if (!parsed.decidedAt || Date.now() - new Date(parsed.decidedAt).getTime() > CONSENT_MAX_AGE) return null;
    return parsed;
  } catch {
    return null;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
}

function setGoogleConsent(analytics: boolean) {
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function loadGoogleAnalytics(measurementId: string) {
  if (!measurementId || document.querySelector("script[data-atc-google-analytics]")) return;
  ensureGtag();
  window.gtag?.("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag?.("js", new Date());
  window.gtag?.("config", measurementId, { anonymize_ip: true });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.atcGoogleAnalytics = "true";
  document.head.appendChild(script);
}

function clearAnalyticsCookies() {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || (name !== "_ga" && !name.startsWith("_ga_"))) return;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    const hostname = location.hostname.replace(/^www\./, "");
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}; SameSite=Lax`;
  });
}

export default function CookieConsent({ measurementId = "" }: { measurementId?: string }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialogTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const stored = readStoredChoice();
    setChoice(stored);
    setAnalytics(stored?.analytics ?? false);
    if (stored?.analytics && measurementId) loadGoogleAnalytics(measurementId);
    if (stored && !stored.analytics) setGoogleConsent(false);
    setReady(true);
    const openSettings = () => {
      const current = readStoredChoice();
      setAnalytics(current?.analytics ?? false);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, [measurementId]);

  useEffect(() => {
    document.documentElement.dataset.cookieBannerOpen = String(ready && (!choice || settingsOpen));
    if (settingsOpen) window.setTimeout(() => dialogTitleRef.current?.focus(), 0);
    return () => { delete document.documentElement.dataset.cookieBannerOpen; };
  }, [choice, ready, settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape" && choice) setSettingsOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [choice, settingsOpen]);

  const save = (allowAnalytics: boolean) => {
    const next: ConsentChoice = { version: CONSENT_VERSION, analytics: allowAnalytics, decidedAt: new Date().toISOString() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Applies for this page view. */ }
    setChoice(next);
    setAnalytics(allowAnalytics);
    setSettingsOpen(false);
    if (allowAnalytics && measurementId) loadGoogleAnalytics(measurementId);
    else { setGoogleConsent(false); clearAnalyticsCookies(); }
  };

  if (!ready) return null;

  return <>
    {!choice && !settingsOpen && <section className="cookie-banner" aria-labelledby="cookie-banner-title" role="region">
      <div className="cookie-banner-mark" aria-hidden="true">COOKIES / PRIVACY</div>
      <div className="cookie-banner-copy">
        <h2 id="cookie-banner-title">הפרטיות שלכם. הבחירה שלכם.</h2>
        <p>האתר משתמש באחסון חיוני להפעלה, אבטחה ושמירת העדפות. Google Analytics יופעל רק אם תאשרו, כדי להבין באופן מצטבר כיצד משתמשים באתר.</p>
        <a href="/תקנון-תנאי-שימוש-ומדיניות-פרטיות/">למדיניות הפרטיות ←</a>
      </div>
      <div className="cookie-banner-actions" aria-label="בחירת העדפות קוקיז">
        <button className="cookie-action primary" type="button" onClick={() => save(true)}>אישור Analytics</button>
        <button className="cookie-action secondary" type="button" onClick={() => save(false)}>חיוניים בלבד</button>
        <button className="cookie-action settings" type="button" onClick={() => setSettingsOpen(true)}>הגדרות</button>
      </div>
    </section>}

    {settingsOpen && <div className="cookie-dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget && choice) setSettingsOpen(false); }}>
      <section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title">
        <div className="cookie-dialog-head">
          <div><span>PRIVACY CONTROL</span><h2 id="cookie-dialog-title" ref={dialogTitleRef} tabIndex={-1}>הגדרות פרטיות וקוקיז</h2></div>
          {choice && <button type="button" aria-label="סגירת הגדרות פרטיות" onClick={() => setSettingsOpen(false)}>×</button>}
        </div>
        <p className="cookie-dialog-intro">אפשר לשנות את הבחירה בכל עת. קוקיז חיוניים אינם משמשים לפרסום ואינם ניתנים לכיבוי דרך הבאנר, משום שהם נחוצים לאבטחה ולשמירת ההעדפות שבחרתם.</p>
        <div className="cookie-preference essential"><div><b>אחסון חיוני</b><small>שמירת הסכמה, העדפות נגישות ואבטחת טפסים.</small></div><span>פעיל תמיד</span></div>
        <label className="cookie-preference optional">
          <div><b>מדידה ו־Analytics</b><small>Google Analytics למדידה מצטברת ושיפור האתר. לא ייטען ללא אישור.</small></div>
          <input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} aria-label="אישור Google Analytics"/><span className="cookie-switch" aria-hidden="true"/>
        </label>
        <div className="cookie-dialog-actions"><button className="cookie-action primary" type="button" onClick={() => save(analytics)}>שמירת הבחירה</button><button className="cookie-action secondary" type="button" onClick={() => save(false)}>דחיית Analytics</button></div>
        <a className="cookie-policy-link" href="/תקנון-תנאי-שימוש-ומדיניות-פרטיות/">למדיניות הפרטיות המלאה ←</a>
      </section>
    </div>}
  </>;
}

export function CookiePrivacyDisclosure() {
  return <section className="cookie-policy-disclosure" aria-labelledby="cookie-policy-heading">
    <p>PRIVACY / COOKIES</p>
    <h2 id="cookie-policy-heading">קוקיז והעדפות מדידה</h2>
    <p>האתר שומר במכשיר מידע חיוני לצורך שמירת בחירת הפרטיות והעדפות הנגישות. Google Analytics, ככל שיוגדר באתר, ייטען רק לאחר אישור מפורש בפופאפ. בחירה ב״חיוניים בלבד״ אינה מגבילה את הגלישה באתר.</p>
    <p>בחירת ההסכמה נשמרת למשך עד שישה חודשים. ניתן לפתוח מחדש את הפופאפ ולשנות את הבחירה באמצעות הכפתור הבא.</p>
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>פתיחת הגדרות הפרטיות</button>
  </section>;
}
