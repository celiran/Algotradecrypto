"use client";

import { useEffect, useState } from "react";
import "./refined.css";

const options = [
  { id: "signal-glass", number: "01", title: "Signal Glass", subtitle: "מעבדת מסחר פרימיום" },
  { id: "algorithm-blueprint", number: "02", title: "Algorithm Blueprint", subtitle: "משרד הנדסי למסחר" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`r-logo ${light ? "r-logo-light" : ""}`} href="#signal-glass" aria-label="AlgoTradeCrypto — חזרה להתחלה">
      <span>AT</span>
      <b>AlgoTrade<em>Crypto</em></b>
    </a>
  );
}

function CompareNav({ active }: { active: string }) {
  return (
    <aside className="compare-nav" aria-label="בחירת כיוון עיצובי">
      <p>כיוון נוכחי</p>
      <div className="compare-options">
        {options.map((option) => (
          <a key={option.id} href={`#${option.id}`} className={active === option.id ? "is-active" : ""}>
            <span>{option.number}</span>
            <span><b>{option.title}</b><small>{option.subtitle}</small></span>
          </a>
        ))}
      </div>
    </aside>
  );
}

function SignalPipeline() {
  const stages = [
    { no: "01", he: "האסטרטגיה", en: "RULE SET" },
    { no: "02", he: "בדיקת עבר", en: "BACKTEST" },
    { no: "03", he: "ניהול סיכון", en: "RISK ENGINE" },
    { no: "04", he: "ביצוע", en: "EXECUTION" },
  ];
  return (
    <div className="glass-console" aria-label="המחשת תהליך הפיכת אסטרטגיה לרובוט מסחר">
      <div className="console-head">
        <div><i /><span>STRATEGY PIPELINE</span></div>
        <div><span>BTC / USDT</span><b>● LIVE</b></div>
      </div>
      <div className="console-signal">
        <div className="signal-line"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <span>ENTRY SIGNAL / 08:42:17</span>
      </div>
      <div className="pipeline-stages">
        {stages.map((stage, index) => (
          <div className={`pipeline-item ${index === 3 ? "pipeline-active" : ""}`} key={stage.no}>
            <span>{stage.no}</span>
            <b>{stage.he}</b>
            <small>{stage.en}</small>
            {index < stages.length - 1 && <i className="stage-connector">←</i>}
          </div>
        ))}
      </div>
      <div className="console-footer">
        <div><small>UPTIME</small><strong>99.98%</strong></div>
        <div><small>LATENCY</small><strong>42ms</strong></div>
        <div><small>MAX RISK</small><strong>1.20%</strong></div>
        <div><small>STATUS</small><strong className="status-ok">OPERATIONAL</strong></div>
      </div>
    </div>
  );
}

function SignalGlass() {
  return (
    <section id="signal-glass" className="preview-section signal-glass" data-preview="signal-glass">
      <div className="glass-orb glass-orb-a" /><div className="glass-orb glass-orb-b" />
      <header className="glass-header">
        <Logo light />
        <nav aria-label="ניווט לדוגמה"><a href="#glass-process">איך זה עובד</a><a href="#glass-proof">הניסיון שלנו</a><a href="#glass-solutions">פתרונות</a></nav>
        <button>שיחת אפיון <span>←</span></button>
      </header>
      <main className="glass-main">
        <div className="glass-copy">
          <p className="glass-kicker"><i /> CUSTOM ALGORITHMIC SYSTEMS</p>
          <h1>הופכים אסטרטגיית מסחר<br/><em>למערכת שעובדת בשבילך.</em></h1>
          <p className="glass-lead">אפיון, פיתוח ובדיקת רובוטים למסחר אוטומטי — בהתאמה מלאה לשיטה, לניהול הסיכונים ולבורסה שלך.</p>
          <div className="glass-actions"><button>בדיקת התאמה לאסטרטגיה שלי <span>←</span></button><a href="#glass-process">לראות את התהליך</a></div>
          <div id="glass-proof" className="glass-proof">
            <div><strong>15+</strong><span>שנות ניסיון<br/>במסחר ובפיתוח</span></div>
            <div><strong>400+</strong><span>רובוטים ומערכות<br/>שפותחו עד היום</span></div>
            <div><strong>175+</strong><span>לקוחות פרטיים<br/>וחברות מסחר</span></div>
          </div>
        </div>
        <SignalPipeline />
      </main>
      <div id="glass-process" className="glass-bottom">
        <p><span>לא מוצר מדף.</span> המערכת נבנית סביב הדרך שבה אתם סוחרים.</p>
        <div id="glass-solutions" className="glass-services"><span>רובוטי מסחר</span><span>סורקים והתראות</span><span>Backtesting</span><span>אינטגרציות לבורסות</span></div>
      </div>
      <div className="concept-label"><span>01</span><b>SIGNAL GLASS</b><small>MINIMALISM × GLASSMORPHISM</small></div>
    </section>
  );
}

function BlueprintDiagram() {
  const nodes = [
    { cls: "bp-node-a", no: "01", title: "Signal Input", sub: "תנאי כניסה" },
    { cls: "bp-node-b", no: "02", title: "Risk Rules", sub: "ניהול סיכונים" },
    { cls: "bp-node-c", no: "03", title: "Position Size", sub: "גודל פוזיציה" },
    { cls: "bp-node-d", no: "04", title: "Exchange API", sub: "ביצוע פקודה" },
    { cls: "bp-node-e", no: "05", title: "Monitoring", sub: "ניטור ובקרה" },
  ];
  return (
    <div className="blueprint-diagram" aria-label="שרטוט הנדסי של מערכת מסחר אוטומטית">
      <div className="bp-cross bp-cross-a">+</div><div className="bp-cross bp-cross-b">+</div>
      <div className="bp-center"><span>ALGO</span><b>CORE</b><small>SYSTEM / 01</small></div>
      <div className="bp-ring bp-ring-a"/><div className="bp-ring bp-ring-b"/>
      {nodes.map((node) => <div key={node.no} className={`bp-node ${node.cls}`}><span>{node.no}</span><b>{node.title}</b><small>{node.sub}</small></div>)}
      <div className="bp-line bp-line-a"/><div className="bp-line bp-line-b"/><div className="bp-line bp-line-c"/><div className="bp-line bp-line-d"/><div className="bp-line bp-line-e"/>
      <p>BLUEPRINT / CUSTOM TRADING INFRASTRUCTURE</p>
    </div>
  );
}

function AlgorithmBlueprint() {
  return (
    <section id="algorithm-blueprint" className="preview-section algorithm-blueprint" data-preview="algorithm-blueprint">
      <header className="blueprint-header">
        <Logo />
        <div className="blueprint-meta"><span>בית תוכנה לפיתוח מערכות מסחר</span><b>EST. 2010</b></div>
        <button>מתחילים באפיון <span>←</span></button>
      </header>
      <main className="blueprint-main">
        <div className="blueprint-copy">
          <p className="bp-kicker"><span>PROJECT / 001</span> פיתוח אלגו בהתאמה אישית</p>
          <h1>יש לך שיטת מסחר.<br/><em>אנחנו נהפוך אותה למערכת.</em></h1>
          <p>פיתוח אישי של רובוטים, סורקים ומערכות אלגו לסוחרים, מנהלי תיקים וחברות מסחר — משלב הגדרת החוקים ועד הפעלה בשוק.</p>
          <div className="bp-actions"><button>ספרו לנו על האסטרטגיה <span>←</span></button><a href="#bp-method">לשיטת העבודה</a></div>
        </div>
        <BlueprintDiagram />
      </main>
      <div id="bp-method" className="blueprint-method">
        <div className="method-intro"><span>THE METHOD</span><h2>לפני שכותבים קוד,<br/>מגדירים את ההיגיון.</h2></div>
        <div className="method-step"><span>01</span><b>מנסחים</b><p>כל תנאי, חריגה ותרחיש הופכים להגדרה ברורה.</p></div>
        <div className="method-step"><span>02</span><b>בודקים</b><p>מריצים את המערכת על נתוני עבר ומאתרים חולשות.</p></div>
        <div className="method-step"><span>03</span><b>מפעילים</b><p>מחברים לבורסה עם ניטור, בקרה ותמיכה שוטפת.</p></div>
      </div>
      <footer className="blueprint-footer"><blockquote>“היתרון הוא לא רק לדעת לתכנת — אלא להבין מה הסוחר באמת מנסה לעשות.”</blockquote><div><b>אלירן כהן</b><span>מפתח אלגו וסוחר · 15+ שנות ניסיון</span></div></footer>
      <div className="concept-label concept-label-dark"><span>02</span><b>ALGORITHM BLUEPRINT</b><small>MINIMALISM × TECHNICAL EDITORIAL</small></div>
    </section>
  );
}

export default function RefinedDirections() {
  const [active, setActive] = useState("signal-glass");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { threshold: [0.25, 0.5, 0.75] });
    document.querySelectorAll("[data-preview]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <main className="refined-showcase"><CompareNav active={active}/><SignalGlass/><AlgorithmBlueprint/></main>;
}
