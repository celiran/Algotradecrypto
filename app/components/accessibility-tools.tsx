"use client";

import { useEffect, useState } from "react";

type Settings = { font: number; contrast: boolean; underline: boolean; motion: boolean };
const defaults: Settings = { font: 0, contrast: false, underline: false, motion: false };

export default function AccessibilityTools() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("atc-accessibility");
      if (saved) setSettings({ ...defaults, ...JSON.parse(saved) });
    } catch { /* Device-local preference only. */ }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.fontSize = String(settings.font);
    root.dataset.contrast = String(settings.contrast);
    root.dataset.underline = String(settings.underline);
    root.dataset.reduceMotion = String(settings.motion);
    root.style.setProperty("--a11y-zoom", ["1", "1.1", "1.2"][settings.font] ?? "1");
    try { localStorage.setItem("atc-accessibility", JSON.stringify(settings)); } catch { /* Preference storage is optional. */ }
  }, [settings]);

  const update = (next: Partial<Settings>) => setSettings(current => ({ ...current, ...next }));

  return <>
    <a className="skip-link" href="#main-content">דלג לתוכן המרכזי</a>
    <button className="accessibility-toggle" type="button" aria-label={`${open ? "סגירת" : "פתיחת"} תפריט נגישות`} aria-expanded={open} aria-controls="accessibility-panel" onClick={() => setOpen(value => !value)}>
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="10.5"/><circle className="accessibility-icon-head" cx="12" cy="7" r="1.65"/><path d="M6.6 10.4h10.8M12 9.8v5M12 14.1l-4 4.3M12 14.1l4 4.3"/></svg>
      <span>נגישות</span>
    </button>
    {open && <aside className="accessibility-panel" id="accessibility-panel" aria-label="אפשרויות נגישות">
      <div className="accessibility-head"><b>התאמת תצוגה</b><button type="button" aria-label="סגירת תפריט נגישות" onClick={() => setOpen(false)}>×</button></div>
      <button type="button" onClick={() => update({ font: Math.min(2, settings.font + 1) })}>הגדלת טקסט <span>א+</span></button>
      <button type="button" onClick={() => update({ font: Math.max(0, settings.font - 1) })}>הקטנת טקסט <span>א−</span></button>
      <button type="button" aria-pressed={settings.contrast} onClick={() => update({ contrast: !settings.contrast })}>ניגודיות גבוהה <span>◐</span></button>
      <button type="button" aria-pressed={settings.underline} onClick={() => update({ underline: !settings.underline })}>הדגשת קישורים <span>__</span></button>
      <button type="button" aria-pressed={settings.motion} onClick={() => update({ motion: !settings.motion })}>עצירת אנימציות <span>Ⅱ</span></button>
      <button className="accessibility-reset" type="button" onClick={() => setSettings(defaults)}>איפוס התאמות</button>
      <a href="/הצהרת-נגישות/">להצהרת הנגישות ←</a>
    </aside>}
    <div className="risk-bar" role="note"><strong>אזהרת סיכון:</strong> מסחר והשקעה בנכסים דיגיטליים כרוכים בסיכון משמעותי ואפשרות לאובדן כספים. <a href="/אזהרת-סיכון/">למידע המלא</a></div>
  </>;
}
