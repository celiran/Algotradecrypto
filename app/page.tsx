import Script from "next/script";
import { SiteFooter } from "./components/legacy-shell";
import { legacyPosts } from "./content/legacy-content";
import "./site.css";

const whatsapp = "https://api.whatsapp.com/send?phone=972528249299&text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%99%D7%A8%D7%9F%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20AlgoTradeCrypto%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%99%D7%97%D7%AA%20%D7%90%D7%A4%D7%99%D7%95%D7%9F";

function Logo() {
  return <a className="brand" href="/" aria-label="AlgoTradeCrypto — דף הבית"><span>AT</span><b>AlgoTrade<em>Crypto</em></b></a>;
}

function Arrow() { return <span aria-hidden="true">←</span>; }

function SignalPipeline() {
  const stages = [
    ["01", "אסטרטגיית הקריפטו", "CRYPTO STRATEGY"],
    ["02", "בחירת הרובוט", "RIGHT BOT"],
    ["03", "בדיקה וחיבור", "TEST & CONNECT"],
    ["04", "מסחר ובקרה", "TRADE & MONITOR"],
  ];
  return (
    <div className="pipeline-console" aria-label="מסלול בחירת רובוט למסחר בקריפטו">
      <div className="console-head"><span>••• &nbsp; AUTOMATION PIPELINE</span><b>BTC / USDT &nbsp; ● READY</b></div>
      <div className="signal-screen equity-screen" role="img" aria-label="המחשה של גרף רווח מצטבר של רובוט קריפטו, לצורכי תצוגה בלבד">
        <div className="chart-head"><span>BOT EQUITY / BTC-USDT</span><b><i/> LIVE SIMULATION</b></div>
        <svg className="equity-chart" viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ef2b1" stopOpacity=".34"/><stop offset="100%" stopColor="#4ef2b1" stopOpacity="0"/></linearGradient>
            <filter id="equityGlow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <clipPath id="equityReveal"><rect className="chart-reveal" x="0" y="0" width="600" height="130"/></clipPath>
          </defs>
          <g clipPath="url(#equityReveal)">
            <path className="equity-area" d="M12 114 L42 108 L72 110 L102 96 L132 99 L162 86 L192 91 L222 72 L252 77 L282 63 L312 67 L342 51 L372 56 L402 41 L432 45 L462 30 L492 35 L522 22 L552 26 L588 12 L588 130 L12 130 Z"/>
            <path className="equity-line-glow" d="M12 114 L42 108 L72 110 L102 96 L132 99 L162 86 L192 91 L222 72 L252 77 L282 63 L312 67 L342 51 L372 56 L402 41 L432 45 L462 30 L492 35 L522 22 L552 26 L588 12"/>
            <path className="equity-line" pathLength="1" d="M12 114 L42 108 L72 110 L102 96 L132 99 L162 86 L192 91 L222 72 L252 77 L282 63 L312 67 L342 51 L372 56 L402 41 L432 45 L462 30 L492 35 L522 22 L552 26 L588 12"/>
            <g className="trade-points"><circle cx="102" cy="96" r="3"/><circle cx="222" cy="72" r="3"/><circle cx="342" cy="51" r="3"/><circle cx="462" cy="30" r="3"/><circle className="last-point" cx="588" cy="12" r="4"/></g>
          </g>
        </svg>
        <div className="profit-meter"><small>CUMULATIVE P&amp;L</small><div className="profit-ticker"><span>+3.2%</span><span>+7.8%</span><span>+12.6%</span><span>+18.4%</span></div></div>
        <small className="chart-stamp">EQUITY CURVE / DEMO DATA</small>
      </div>
      <div className="pipeline-grid">
        {stages.map(([no, title, sub], i) => <div className={i === 3 ? "stage active" : "stage"} key={no}><span>{no}</span><b>{title}</b><small>{sub}</small>{i < 3 && <i className="connector">←</i>}</div>)}
      </div>
      <div className="console-metrics"><div><small>BOT EXPERIENCE</small><b>SINCE 2007</b></div><div><small>BOTS & CONSULTING</small><b>600+</b></div><div><small>TRADERS & CLIENTS</small><b>290+</b></div><div><small>CRYPTO STATUS</small><b className="mint">OPERATIONAL</b></div></div>
    </div>
  );
}

const paths = [
  {no:"01", tag:"LEARN", title:"ללמוד לבנות רובוט קריפטו", text:"מסלול למי שרוצה להבין איך מפתחים, בודקים ומפעילים רובוט מסחר בקריפטו באופן עצמאי.", href:"/לימוד-אלגו/", cta:"ללימוד רובוטי קריפטו", state:"זמין"},
  {no:"02", tag:"READY SYSTEMS", title:"מערכות קריפטו מוכנות", text:"השוואות ומדריכי הטמעה לרובוטי קריפטו מוכנים כמו 3Commas, Coinrule, Bitsgap ו־Hummingbot.", href:"#ready-systems", cta:"למערכות הקריפטו", state:"בבנייה"},
  {no:"03", tag:"CUSTOM", title:"פיתוח רובוט קריפטו מותאם", text:"כאשר מוצר מדף לא מתאים: אפיון, Backtest, חיבור לבורסת קריפטו ופיתוח דרך AutoSysFX.", href:"/פיתוח-מותאם/", cta:"לפיתוח רובוט קריפטו", state:"זמין"},
];

export default function Home() {
  const latest = legacyPosts.slice(0, 3);
  const jsonLd = {"@context":"https://schema.org","@type":"ProfessionalService",name:"AlgoTradeCrypto",url:"https://algotradecrypto.com/",description:"המרכז הישראלי ללימוד, בחירה והקמה של פתרונות מסחר אוטומטי בקריפטו",founder:{"@type":"Person",name:"אלירן כהן"},email:"support@algotradecrypto.com",telephone:"+972-52-824-9299",areaServed:"IL"};
  return (
    <main className="site-shell">
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <header className="site-header">
        <Logo />
        <nav aria-label="ניווט ראשי"><a href="/">דף הבית</a><a href="/אודות/">אודות</a><a href="/blog-2/">מרכז ידע</a><a href="/לימוד-אלגו/">ללמוד לבנות</a><a href="/פיתוח-מותאם/">פיתוח מותאם</a></nav>
        <a className="header-cta" href="/צור-קשר/">צור קשר <Arrow/></a>
      </header>

      <section className="hero" id="top">
        <div className="orb orb-one"/><div className="orb orb-two"/>
        <div className="hero-copy">
          <p className="eyebrow"><i/> ISRAELI CRYPTO AUTOMATION HUB</p>
          <h1>הדרך שלך לרובוט מסחר בקריפטו.<br/><em>ללמוד. לבחור. לבנות.</em></h1>
          <p className="lead">לא כל סוחר קריפטו צריך רובוט שמפותח מאפס. כאן אפשר ללמוד לבנות רובוט קריפטו, לבחור מערכת מוכנה או לקבל פיתוח מותאם כשבאמת צריך.</p>
          <div className="hero-actions"><a className="button primary" href="#paths">איזו דרך מתאימה לי? <Arrow/></a><a className="text-link" href="#process">לראות את התהליך</a></div>
          <div className="proof-strip"><div><strong>2007</strong><span>פעילים בתחום<br/>מאז שנת 2007</span></div><div><strong>600+</strong><span>רובוטים וייעוצים<br/>שניתנו</span></div><div><strong>290+</strong><span>לקוחות פרטיים<br/>וחברות מסחר</span></div></div>
        </div>
        <SignalPipeline />
      </section>

      <section className="section paths" id="paths">
        <div className="section-heading"><p className="eyebrow dark"><i/> CHOOSE YOUR PATH</p><h2>לא מתחילים מרובוט.<br/><em>מתחילים מצורת המסחר בקריפטו.</em></h2><p>שלושה מסלולים לרובוטי קריפטו, בלי לדחוף לפיתוח יקר אם מערכת מוכנה או לימוד עצמי יספיקו.</p></div>
        <div className="path-grid">{paths.map((path) => <article className="path-card" key={path.no}><div className="card-top"><span>{path.no}</span><small>{path.state}</small></div><p>{path.tag}</p><h3>{path.title}</h3><div className="path-line"/><p className="card-copy">{path.text}</p><a href={path.href}>{path.cta} <Arrow/></a></article>)}</div>
      </section>

      <section className="ready-section" id="ready-systems">
        <div className="ready-copy"><span className="construction">תחת בנייה / COMING SOON</span><p className="eyebrow"><i/> READY-MADE CRYPTO BOTS</p><h2>לא כל רובוט קריפטו<br/><em>צריך לפתח מאפס.</em></h2><p>אנחנו בונים מרכז השוואה והדרכה בעברית למערכות ורובוטים מוכנים למסחר בקריפטו — לפי האסטרטגיה, רמת הידע ובורסת הקריפטו שלך.</p><a className="button ghost" href="https://algolinks.com/s/gw-algo-crypto" target="_blank" rel="noopener noreferrer">כנסו לקהילה שלנו לקבלת עדכונים בהמשך <Arrow/></a></div>
        <div className="systems-grid" aria-label="דוגמאות לרובוטי קריפטו שיופיעו באזור"><div><b>3COMMAS</b><small>DCA · GRID · SIGNAL</small></div><div><b>COINRULE</b><small>NO-CODE AUTOMATION</small></div><div><b>BITSGAP</b><small>BOTS · TERMINAL</small></div><div><b>HUMMINGBOT</b><small>OPEN SOURCE · PRO</small></div><p>השוואות בין רובוטי קריפטו, מדריכי הקמה, גילוי נאות וקישורי שותפים יסומנו בצורה שקופה.</p></div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading"><p className="eyebrow dark"><i/> THE CRYPTO BOT PIPELINE</p><h2>מרעיון לרובוט קריפטו פעיל,<br/><em>בלי לדלג על הבדיקות.</em></h2></div>
        <div className="process-grid"><article><span>01</span><h3>מגדירים אסטרטגיית קריפטו</h3><p>באילו מטבעות ובורסות הרובוט יעבוד, מה תנאי המסחר ומה רמת הסיכון.</p></article><article><span>02</span><h3>בוחרים מסלול לרובוט</h3><p>לימוד עצמי, רובוט קריפטו מוכן או פיתוח מותאם — לפי האסטרטגיה והתקציב.</p></article><article><span>03</span><h3>בודקים ומחברים לבורסה</h3><p>חוקי המסחר, Backtest, הרשאות API מוגבלות, סביבת בדיקה וניהול סיכונים.</p></article><article><span>04</span><h3>מפעילים ומנטרים</h3><p>הפעלת רובוט הקריפטו באופן מדורג, עם התראות, בקרה ותחזוקה לפי נתוני מסחר.</p></article></div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-copy"><p className="eyebrow"><i/> CRYPTO BOT EXPERIENCE, NOT HYPE</p><h2>הקוד הוא רק חלק מרובוט הקריפטו.<br/><em>הבנת המסחר היא החלק השני.</em></h2><p>אלירן כהן פעיל בתחום המסחר העצמאי ופיתוח רובוטים ומערכות מסחר מאז 2007, כולל חיבורים לבורסות קריפטו, סורקים, API ומנועי ביצוע.</p><a className="text-link light" href="#eliran">להכיר את אלירן <Arrow/></a></div>
        <blockquote><span>“</span><p>היתרון הוא לא רק לדעת לתכנת רובוט — אלא להבין איך סוחר הקריפטו רוצה לעבוד, ואיפה המערכת עלולה להיכשל.</p><footer>הגישה של AlgoTradeCrypto</footer></blockquote>
      </section>

      <section className="section services">
        <div className="section-heading compact"><p className="eyebrow dark"><i/> CRYPTO BOT CAPABILITIES</p><h2>כשמפתחים רובוט קריפטו,<br/><em>בונים תשתית מסחר שלמה.</em></h2></div>
        <div className="service-list"><div><span>01</span><h3>רובוטי מסחר בקריפטו</h3><p>מימוש אסטרטגיות מותאמות למטבע, לבורסת הקריפטו ולניהול הסיכון.</p></div><div><span>02</span><h3>Backtesting לקריפטו</h3><p>בדיקת חוקי הרובוט על נתוני קריפטו היסטוריים, עמלות ותרחישי קיצון.</p></div><div><span>03</span><h3>סורקי שוק קריפטו</h3><p>איתור תנאי מסחר במטבעות בזמן אמת ושליחת התראות לערוצים הנכונים.</p></div><div><span>04</span><h3>חיבורי API לבורסות</h3><p>חיבור הרובוט ל־TradingView, לבורסות קריפטו, למקורות נתונים ולדשבורדים.</p></div></div>
      </section>

      <section className="section cases">
        <div className="section-heading compact"><p className="eyebrow dark"><i/> PRACTICAL CRYPTO AUTOMATION</p><h2>איפה רובוט קריפטו<br/><em>באמת יכול לעזור?</em></h2><p>לא הבטחת תשואה — אלא ביצוע עקבי של חוקים, בקרה וניהול סיכונים.</p></div>
        <div className="case-grid"><article><span>SCENARIO / 01</span><h3>סורק הזדמנויות שלא מפספס את השוק</h3><p>עוקב אחרי רשימת מטבעות ומתריע רק כשנפגשים התנאים שהגדרתם מראש — מחיר, מחזור, מגמה ונזילות.</p><small>סריקה · התראות · תנאי שוק</small></article><article><span>SCENARIO / 02</span><h3>רובוט DCA שלא קונה על עיוור</h3><p>מבצע רכישות מדורגות לפי זמן או מצב השוק, מגביל חשיפה ועוצר כאשר הסיכון חורג מהכללים.</p><small>DCA · מגבלת חשיפה · עצירה</small></article><article><span>SCENARIO / 03</span><h3>שומר סף לחשבון הקריפטו</h3><p>מנטר פוזיציות ופקודות, מזהה חריגות סיכון, מפעיל עצירת חירום ושולח התראה לפני שהבעיה גדלה.</p><small>Risk Monitor · Kill Switch · Alerts</small></article></div>
      </section>

      <section className="eliran" id="eliran">
        <figure className="portrait-mark">
          {/* Already cropped and compressed for this fixed-size portrait; no runtime image service needed. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/eliran-cohen-founder-expanded.png" width="1254" height="1254" loading="lazy" decoding="async" alt="אלירן כהן, מייסד AlgoTradeCrypto ו־AutoSysFX" />
          <i aria-hidden="true" />
          <b>2007</b>
          <small>ACTIVE IN ALGO SINCE</small>
        </figure>
        <div><p className="eyebrow"><i/> ELIRAN COHEN</p><h2>סוחר קריפטו שמבין קוד.<br/><em>מפתח רובוטים שמבין סוחרים.</em></h2><p>אני אלירן כהן, יזם, מפתח רובוטים למסחר ובעל בית התוכנה AutoSysFX. ב־AlgoTradeCrypto המטרה אינה למכור לכל אחד רובוט קריפטו — אלא לעזור ללמוד, לבחור מערכת מוכנה או לפתח רובוט רק כשיש לכך הצדקה אמיתית.</p><div className="signature">אלירן כהן <span>מייסד AlgoTradeCrypto ו־AutoSysFX</span></div></div>
      </section>

      <section className="section knowledge">
        <div className="section-heading row"><div><p className="eyebrow dark"><i/> CRYPTO BOT KNOWLEDGE</p><h2>ללמוד על רובוטי קריפטו<br/><em>לפני שמחברים API.</em></h2></div><a className="text-link" href="/blog-2/">לכל המאמרים <Arrow/></a></div>
        <div className="article-grid">{latest.map((post, i) => <article key={post.id}><span>0{i+1} / {new Date(post.date!).getFullYear()}</span><h3><a href={`/${post.slug}/`}>{post.title}</a></h3><p>{post.excerpt.slice(0, 155)}…</p><a href={`/${post.slug}/`} aria-label={`לקריאת ${post.title}`}>לקריאה <Arrow/></a></article>)}</div>
      </section>

      <section className="final-cta"><p className="eyebrow"><i/> START YOUR CRYPTO BOT</p><h2>לא בטוח איך להתקדם בעולם האלגו בקריפטו? דבר איתנו.</h2><p>בשיחת אפיון קצרה נבין אם נכון ללמוד לבנות, לבחור רובוט מוכן או לפתח מערכת קריפטו מותאמת.</p><a className="button primary" href={whatsapp} target="_blank" rel="noopener">בוא נדבר על רובוט הקריפטו שלך <Arrow/></a><small>שיחה ראשונית ללא התחייבות · WhatsApp</small></section>

      <SiteFooter/>
    </main>
  );
}
