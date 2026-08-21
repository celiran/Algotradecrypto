"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "./analytics-events";

type ContactConfig = {
  configured: boolean;
  turnstileSiteKey: string | null;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type TurnstileApi = {
  render(container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: "auto";
    size: "flexible";
    language: "he";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const supportEmail = "support@algotradecrypto.com";
const defaultError = `לא הצלחנו לשלוח את הפנייה כרגע. אפשר לנסות שוב או לכתוב ל־${supportEmail}.`;

export default function ContactForm() {
  const [config, setConfig] = useState<ContactConfig | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact", { method: "GET", headers: { Accept: "application/json" }, signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Contact configuration is unavailable");
        return (await response.json()) as ContactConfig;
      })
      .then(setConfig)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setConfig({ configured: false, turnstileSiteKey: null });
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const siteKey = config?.turnstileSiteKey;
    if (!siteKey || !turnstileContainer.current) return;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !window.turnstile || !turnstileContainer.current || turnstileWidgetId.current) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: siteKey,
        action: "contact_form",
        theme: "auto",
        size: "flexible",
        language: "he",
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => {
          setTurnstileToken("");
          setStatus("error");
          setStatusMessage("אימות האבטחה לא נטען. רעננו את העמוד ונסו שוב.");
        },
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-atc-turnstile="true"]');
    if (existingScript) {
      if (window.turnstile) renderWidget();
      else existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.atcTurnstile = "true";
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [config?.turnstileSiteKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!config?.configured) {
      setStatus("error");
      setStatusMessage("הטופס מוכן, אך שליחת הפניות תחובר לחשבון Cloudflare בזמן העלאת האתר.");
      return;
    }
    if (config.turnstileSiteKey && !turnstileToken) {
      setStatus("error");
      setStatusMessage("יש להשלים את אימות האבטחה לפני השליחה.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          interest: formData.get("interest"),
          message: formData.get("message"),
          website: formData.get("website"),
          privacy: formData.get("privacy") === "on",
          turnstileToken,
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (!response.ok || !result?.success) throw new Error(result?.message || defaultError);
      trackAnalyticsEvent("generate_lead", {
        method: "contact_form",
        lead_type: String(formData.get("interest") || "unknown"),
      });
      form.reset();
      setStatus("success");
      setStatusMessage("הפנייה נשלחה. נחזור אליכם לאחר שנעבור על הפרטים.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : defaultError);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken("");
      }
    }
  }

  if (status === "success") {
    return <div className="crypto-contact-success" role="status" aria-live="polite"><span aria-hidden="true">✓</span><p>MESSAGE RECEIVED / 01</p><h2>תודה, קיבלנו.</h2><div>{statusMessage}</div><button type="button" onClick={() => { setStatus("idle"); setStatusMessage(""); }}>שליחת פנייה נוספת</button></div>;
  }

  const isSubmitting = status === "submitting";
  return <form className="crypto-contact-form" onSubmit={handleSubmit}>
    <div className="crypto-contact-fields">
      <div className="crypto-contact-field"><label htmlFor="fullName">שם מלא <span aria-hidden="true">*</span></label><input id="fullName" name="fullName" type="text" autoComplete="name" minLength={2} maxLength={80} placeholder="איך לפנות אליכם?" required/></div>
      <div className="crypto-contact-field"><label htmlFor="email">כתובת מייל <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} placeholder="name@example.com" dir="ltr" required/></div>
      <div className="crypto-contact-field"><label htmlFor="phone">טלפון</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="לא חובה" dir="ltr"/></div>
      <div className="crypto-contact-field"><label htmlFor="interest">במה תרצו להתמקד? <span aria-hidden="true">*</span></label><select id="interest" name="interest" defaultValue="" required><option value="" disabled>בחרו את המסלול המתאים</option><option value="learning">לימוד ופיתוח עצמאי</option><option value="ready-system">בחירת מערכת קריפטו מוכנה</option><option value="custom-development">פיתוח רובוט קריפטו מותאם</option><option value="partnership">שיתוף פעולה</option><option value="other">נושא אחר</option></select></div>
      <div className="crypto-contact-field crypto-contact-message"><label htmlFor="message">ספרו לנו בקצרה <span aria-hidden="true">*</span></label><textarea id="message" name="message" minLength={10} maxLength={3000} rows={7} placeholder="מה המטרה, באיזו בורסה או מערכת אתם עובדים, והאם כבר קיימת אסטרטגיה?" required/></div>
    </div>

    <div className="crypto-contact-honeypot" aria-hidden="true"><label htmlFor="website">אתר</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"/></div>

    {config?.turnstileSiteKey ? <section className="crypto-contact-security" aria-label="אימות אבטחה"><div><span aria-hidden="true">◇</span><p><b>אימות אבטחה</b><small>Cloudflare Turnstile מונע שליחה אוטומטית מבוטים</small></p></div><div ref={turnstileContainer} className="crypto-contact-turnstile"/><small className="crypto-contact-cloudflare-note">השימוש באימות כפוף ל<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">מדיניות הפרטיות</a> ול<a href="https://www.cloudflare.com/website-terms/" target="_blank" rel="noreferrer">תנאי השימוש</a> של Cloudflare.</small></section> : <section className="crypto-contact-security is-standby" aria-label="אימות אבטחה מוכן לחיבור"><div><span aria-hidden="true">◇</span><p><b>Cloudflare Turnstile מוכן לחיבור</b><small>האימות יופעל עם הגדרת המפתחות בזמן העלאת האתר</small></p></div></section>}

    <div className="crypto-contact-form-footer"><label className="crypto-contact-privacy"><input name="privacy" type="checkbox" required/><span>אני מאשר/ת שימוש בפרטים לצורך מענה לפנייה בהתאם ל<a href="/תקנון-תנאי-שימוש-ומדיניות-פרטיות/">מדיניות הפרטיות</a>.</span></label><button className="crypto-contact-submit" type="submit" disabled={isSubmitting || config === null}><span>{isSubmitting ? "שולח..." : config === null ? "בודק חיבור..." : "שליחת פנייה"}</span><span aria-hidden="true">←</span></button></div>

    {status === "error" ? <p className="crypto-contact-status is-error" role="alert">{statusMessage}</p> : <p className="crypto-contact-status" aria-live="polite">הפרטים משמשים רק לבדיקת הפנייה וליצירת קשר. אין לשלוח סיסמאות, מפתחות API או פרטי גישה.</p>}
  </form>;
}
