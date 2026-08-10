import Link from "next/link";
import Script from "next/script";
import { legacyPosts } from "./content/legacy-content";
import "./site.css";

const whatsapp = "https://api.whatsapp.com/send?phone=972528249299&text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%99%D7%A8%D7%9F%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20AlgoTradeCrypto%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%99%D7%97%D7%AA%20%D7%90%D7%A4%D7%99%D7%95%D7%9F";

function Logo() {
  return <Link className="brand" href="/" aria-label="AlgoTradeCrypto — דף הבית"><span>AT</span><b>AlgoTrade<em>Crypto</em></b></Link>;
}

function Arrow() { return <span aria-hidden="true">←</span>; }

function SignalPipeline() {
  const stages = [
    ["01", "הרעיון", "YOUR GOAL"],
    ["02", "בחירת הדרך", "RIGHT PATH"],
    ["03", "בדיקה והקמה", "BUILD & TEST"],
    ["04", "הפעלה ובקרה", "RUN & MONITOR"],
  ];
  return (
    <div className="pipeline-console" aria-label="מסלול בחירת פתרון למסחר אוטומטי">
      <div className="console-head"><span>••• &nbsp; AUTOMATION PIPELINE</span><b>BTC / USDT &nbsp; ● READY</b></div>
      <div className="signal-screen"><div className="signal-bars">{Array.from({length: 17}).map((_, i) => <i key={i}/>)}</div><small>PATH SIGNAL / 08:42:17</small></div>
      <div className="pipeline-grid">
        {stages.map(([no, title, sub], i) => <div className={i === 3 ? "stage active" : "stage"} key={no}><span>{no}</span><b>{title}</b><small>{sub}</small>{i < 3 && <i className="connector">←</i>}</div>)}
      </div>
      <div className="console-metrics"><div><small>EXPERIENCE</small><b>15+ YRS</b></div><div><small>SYSTEMS</small><b>400+</b></div><div><small>CLIENTS</small><b>175+</b></div><div><small>STATUS</small><b className="mint">OPERATIONAL</b></div></div>
    </div>
  );
}

const paths = [
  {no:"01", tag:"LEARN", title:"ללמוד ולבנות לבד", text:"מסלול למי שרוצה להבין את הכלים, לפתח אסטרטגיות ולשלוט במערכת בעצמו.", href:"https://algocourses.co.il/", cta:"למסלולי הלימוד", state:"זמין"},
  {no:"02", tag:"READY SYSTEMS", title:"מערכות מוכנות", text:"השוואות, מדריכים והטמעה של 3Commas, Coinrule, Bitsgap, Hummingbot וכלים נוספים.", href:"#ready-systems", cta:"הצצה למערכות", state:"בבנייה"},
  {no:"03", tag:"CUSTOM", title:"פיתוח מותאם אישית", text:"כאשר מוצר מדף לא מספיק: אפיון, Backtest, אינטגרציות ופיתוח דרך AutoSysFX.", href:"https://autosysfx.com/", cta:"לפתרון מותאם", state:"זמין"},
];

export default function Home() {
  const latest = legacyPosts.slice(0, 3);
  const jsonLd = {"@context":"https://schema.org","@type":"ProfessionalService",name:"AlgoTradeCrypto",url:"https://algotradecrypto.com/",description:"המרכז הישראלי ללימוד, בחירה והקמה של פתרונות מסחר אוטומטי בקריפטו",founder:{"@type":"Person",name:"אלירן כהן"},email:"eliran@autosysfx.com",telephone:"+972-52-824-9299",areaServed:"IL"};
  return (
    <main className="site-shell">
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <header className="site-header">
        <Logo />
        <nav aria-label="ניווט ראשי"><a href="#paths">בחרו מסלול</a><a href="#experience">הניסיון שלנו</a><a href="#process">איך זה עובד</a><Link href="/blog-2/">מרכז ידע</Link></nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noopener">שיחת אפיון <Arrow/></a>
      </header>

      <section className="hero" id="top">
        <div className="orb orb-one"/><div className="orb orb-two"/>
        <div className="hero-copy">
          <p className="eyebrow"><i/> ISRAELI CRYPTO AUTOMATION HUB</p>
          <h1>הדרך שלך למסחר אוטומטי.<br/><em>ללמוד. לבחור. לבנות.</em></h1>
          <p className="lead">לא כל סוחר צריך פיתוח מאפס. כאן תוכל ללמוד לבנות בעצמך, לבחור מערכת קיימת או לקבל פתרון מותאם כשבאמת צריך.</p>
          <div className="hero-actions"><a className="button primary" href="#paths">איזו דרך מתאימה לי? <Arrow/></a><a className="text-link" href="#process">לראות את התהליך</a></div>
          <div className="proof-strip"><div><strong>15+</strong><span>שנות ניסיון<br/>במסחר ובפיתוח</span></div><div><strong>400+</strong><span>רובוטים ומערכות<br/>שפותחו עד היום</span></div><div><strong>175+</strong><span>לקוחות פרטיים<br/>וחברות מסחר</span></div></div>
        </div>
        <SignalPipeline />
      </section>

      <section className="section paths" id="paths">
        <div className="section-heading"><p className="eyebrow dark"><i/> CHOOSE YOUR PATH</p><h2>לא מתחילים מטכנולוגיה.<br/><em>מתחילים ממה שאתה צריך.</em></h2><p>שלושה מסלולים, בלי לדחוף אותך לפיתוח יקר אם מערכת קיימת או לימוד עצמי יספיקו.</p></div>
        <div className="path-grid">{paths.map((path) => <article className="path-card" key={path.no}><div className="card-top"><span>{path.no}</span><small>{path.state}</small></div><p>{path.tag}</p><h3>{path.title}</h3><div className="path-line"/><p className="card-copy">{path.text}</p><a href={path.href}>{path.cta} <Arrow/></a></article>)}</div>
      </section>

      <section className="ready-section" id="ready-systems">
        <div className="ready-copy"><span className="construction">תחת בנייה / COMING SOON</span><p className="eyebrow"><i/> READY-MADE SYSTEMS</p><h2>לפעמים לא צריך לפתח.<br/><em>צריך לבחור נכון.</em></h2><p>אנחנו בונים מרכז השוואה והדרכה בעברית למערכות מסחר אוטומטי קיימות — כולל התאמה לצורך, רמת הידע והבורסה שלך.</p><a className="button ghost" href={whatsapp} target="_blank" rel="noopener">עדכנו אותי כשהאזור נפתח <Arrow/></a></div>
        <div className="systems-grid" aria-label="דוגמאות למערכות שיופיעו באזור"><div><b>3COMMAS</b><small>DCA · GRID · SIGNAL</small></div><div><b>COINRULE</b><small>NO-CODE AUTOMATION</small></div><div><b>BITSGAP</b><small>BOTS · TERMINAL</small></div><div><b>HUMMINGBOT</b><small>OPEN SOURCE · PRO</small></div><p>השוואות, מדריכי הקמה, גילוי נאות וקישורי שותפים יסומנו בצורה שקופה.</p></div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading"><p className="eyebrow dark"><i/> THE PIPELINE</p><h2>מהרעיון למערכת פעילה,<br/><em>בלי לדלג על הבדיקות.</em></h2></div>
        <div className="process-grid"><article><span>01</span><h3>מגדירים מטרה</h3><p>מה אתה מנסה להשיג, מה רמת הסיכון ומה כבר קיים היום.</p></article><article><span>02</span><h3>בוחרים מסלול</h3><p>לימוד עצמי, מערכת מוכנה או פיתוח מותאם — לפי הצורך ולא לפי המחיר הגבוה.</p></article><article><span>03</span><h3>בודקים ומקימים</h3><p>חוקים, Backtest, הרשאות API, סביבת בדיקה וניהול סיכונים.</p></article><article><span>04</span><h3>מפעילים ומנטרים</h3><p>עלייה מבוקרת, התראות, תחזוקה ושיפור לפי נתונים אמיתיים.</p></article></div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-copy"><p className="eyebrow"><i/> EXPERIENCE, NOT HYPE</p><h2>הקוד הוא רק חלק מהמערכת.<br/><em>הבנת המסחר היא החלק השני.</em></h2><p>אלירן כהן משלב ניסיון של יותר מ־15 שנה במסחר עצמאי ובפיתוח מערכות אוטומטיות. לאורך השנים פותחו מאות רובוטים, סורקים ואינטגרציות לסוחרים פרטיים, מנהלי תיקים וחברות מסחר.</p><a className="text-link light" href="#eliran">להכיר את אלירן <Arrow/></a></div>
        <blockquote><span>“</span><p>היתרון הוא לא רק לדעת לתכנת — אלא להבין מה הסוחר באמת מנסה לעשות, ואיפה המערכת עלולה להיכשל.</p><footer>הגישה של AlgoTradeCrypto</footer></blockquote>
      </section>

      <section className="section services">
        <div className="section-heading compact"><p className="eyebrow dark"><i/> CAPABILITIES</p><h2>כשצריך פיתוח,<br/><em>בונים תשתית שלמה.</em></h2></div>
        <div className="service-list"><div><span>01</span><h3>רובוטי מסחר</h3><p>מימוש אסטרטגיות מותאמות לבורסה ולניהול הסיכון.</p></div><div><span>02</span><h3>Backtesting</h3><p>בדיקת חוקים על נתוני עבר, עמלות ותרחישי קיצון.</p></div><div><span>03</span><h3>סורקים והתראות</h3><p>איתור תנאים בזמן אמת ושליחת התראות לערוצים הנכונים.</p></div><div><span>04</span><h3>אינטגרציות API</h3><p>חיבור TradingView, בורסות, מערכות נתונים ודשבורדים.</p></div></div>
      </section>

      <section className="section cases">
        <div className="section-heading compact"><p className="eyebrow dark"><i/> SELECTED USE CASES</p><h2>דוגמאות למערכות<br/><em>שנולדות מצורך אמיתי.</em></h2></div>
        <div className="case-grid"><article><span>CASE / 01</span><h3>אסטרטגיה ידנית שהפכה למערכת 24/7</h3><p>תרגום כללי כניסה, יציאה וניהול פוזיציה למנוע ביצוע אוטומטי עם התראות.</p><small>אפיון · Backtest · ביצוע</small></article><article><span>CASE / 02</span><h3>ניהול מספר נכסים בלי לשבת מול המסך</h3><p>סורק שוק שמזהה תנאים, מדרג הזדמנויות ומפעיל כללי סיכון אחידים.</p><small>סורק · התראות · Risk Engine</small></article><article><span>CASE / 03</span><h3>חיבור TradingView לחשבון מסחר</h3><p>קליטת Webhooks, אימות אותות ושליחת פקודות לפי הרשאות מוגבלות.</p><small>TradingView · API · Monitoring</small></article></div>
      </section>

      <section className="eliran" id="eliran">
        <div className="portrait-mark" aria-hidden="true"><span>EK</span><i/><b>15+</b><small>YEARS IN ALGO</small></div>
        <div><p className="eyebrow"><i/> ELIRAN COHEN</p><h2>סוחר שמבין קוד.<br/><em>מפתח שמבין סוחרים.</em></h2><p>אני אלירן כהן, יזם, מפתח אלגו ובעל בית התוכנה AutoSysFX. המטרה שלי כאן אינה למכור לכל אחד רובוט — אלא לעזור לבחור פתרון נכון, להבין את הסיכונים ולבנות רק כשיש הצדקה אמיתית.</p><div className="signature">אלירן כהן <span>מייסד AlgoTradeCrypto ו־AutoSysFX</span></div></div>
      </section>

      <section className="section knowledge">
        <div className="section-heading row"><div><p className="eyebrow dark"><i/> KNOWLEDGE BASE</p><h2>ללמוד לפני<br/><em>שמחברים API.</em></h2></div><Link className="text-link" href="/blog-2/">לכל המאמרים <Arrow/></Link></div>
        <div className="article-grid">{latest.map((post, i) => <article key={post.id}><span>0{i+1} / {new Date(post.date!).getFullYear()}</span><h3><Link href={`/${post.slug}/`}>{post.title}</Link></h3><p>{post.excerpt.slice(0, 155)}…</p><Link href={`/${post.slug}/`} aria-label={`לקריאת ${post.title}`}>לקריאה <Arrow/></Link></article>)}</div>
      </section>

      <section className="final-cta"><p className="eyebrow"><i/> START WITH CLARITY</p><h2>לא בטוח מאיפה להתחיל?</h2><p>בשיחת אפיון קצרה נבין אם נכון ללמוד, לבחור מערכת מוכנה או לפתח פתרון מותאם.</p><a className="button primary" href={whatsapp} target="_blank" rel="noopener">בוא נדבר על הצורך שלך <Arrow/></a><small>שיחה ראשונית ללא התחייבות · WhatsApp</small></section>

      <footer className="site-footer"><Logo/><p>למידה, בחירה ופיתוח של מערכות מסחר אוטומטי בקריפטו.</p><nav><Link href="/blog-2/">מרכז ידע</Link><Link href="/אזהרת-סיכון/">אזהרת סיכון</Link><Link href="/תקנון-תנאי-שימוש-ומדיניות-פרטיות/">תנאי שימוש ופרטיות</Link><a href="mailto:eliran@autosysfx.com">יצירת קשר</a></nav><small>© {new Date().getFullYear()} AlgoTradeCrypto · אין באמור ייעוץ השקעות או הבטחת תשואה.</small></footer>
    </main>
  );
}
