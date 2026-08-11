/* eslint-disable @next/next/no-html-link-for-pages -- vinext requires full-document navigation for reliable production routing. */
import { LegacyFooter, LegacyHeader } from "./legacy-shell";
import "../legacy.css";

const Arrow = () => <span aria-hidden="true">←</span>;

const modules = [
  ["01", "מפרקים רעיון לכללים", "לנסח תנאי כניסה ויציאה, להבדיל בין הנחה לעובדה ולזהות מה צריך למדוד."],
  ["02", "מתכנתים את הלוגיקה", "הופכים את הכללים לקוד, מבינים את המבנה ובונים רכיב שאפשר לקרוא, לשנות ולתחזק."],
  ["03", "בודקים ב־Backtest", "מריצים את הלוגיקה על נתונים היסטוריים, בוחנים הטיות שכיחות ומבררים מה באמת צריך לשפר."],
  ["04", "מחברים לדמו ומשפרים", "עובדים בסביבת דמו או Paper Trading, בודקים התראות והתנהגות בפועל, מתקנים ומשדרגים לפי התוצאות."],
  ["05", "עוברים ללייב בהדרגה", "רק לאחר בדיקות ובקרה: מחברים לחשבון חי בהיקף מדוד, מנטרים את המערכת ושומרים על כללי סיכון ברורים."],
];

export default function AlgoAiProPage() {
  return <main className="legacy-site algo-pro-site">
    <LegacyHeader />

    <section className="algo-pro-hero">
      <div className="algo-pro-hero-copy">
        <p className="algo-pro-kicker"><i /> ALGO AI PRO / POWERED BY ALGOCOURSES</p>
        <h1>לומדים לבנות<br /><em>מערכת מסחר עם AI.</em></h1>
        <p>ALGO AI PRO הוא מסלול של <a href="https://algocourses.com/" target="_blank" rel="noopener noreferrer">AlgoCourses</a> למי שרוצים להבין איך הופכים רעיון למסחר אוטומטי — מהמחקר והבדיקה ועד למערכת שעובדת לפי חוקים מוגדרים.</p>
        <div className="algo-pro-actions"><a className="algo-pro-primary" href="https://algocourses.com/" target="_blank" rel="noopener noreferrer">לפרטי הקורס ב־AlgoCourses <Arrow /></a><a className="algo-pro-secondary" href="#tracks">לראות את מסלולי היישום ↓</a></div>
      </div>

      <div className="algo-pro-console" aria-label="מפת הלמידה של ALGO AI PRO">
        <div className="algo-pro-console-head"><span>ALGO AI PRO / LEARNING MAP</span><b>BUILD MODE</b></div>
        <div className="algo-pro-orbit" aria-hidden="true"><span className="orbit-core">IDEA<br /><b>→</b><br />SYSTEM</span><i className="orbit-node orbit-one">01<br /><b>RESEARCH</b></i><i className="orbit-node orbit-two">02<br /><b>TEST</b></i><i className="orbit-node orbit-three">03<br /><b>BUILD</b></i><i className="orbit-node orbit-four">04<br /><b>OPERATE</b></i></div>
        <div className="algo-pro-console-footer"><span><i /> AI STUDY COMPANION</span><b>שאלה → בדיקה → הבנה</b></div>
      </div>
    </section>

    <section className="algo-pro-intro">
      <div><p className="algo-pro-kicker dark"><i /> NOT A SHORTCUT. A WORKING METHOD.</p><h2>לא עוד קורס קוד.<br />דרך להבין <em>מערכת שלמה.</em></h2></div>
      <p>הקוד הוא רק חלק מהתמונה. במסחר אוטומטי צריך לדעת מה בודקים, אילו תנאים חסרים, מה קורה כשהנתונים משתנים ואיך לאפשר למערכת לפעול רק בתוך גבולות שהגדרתם. זה הבסיס שמשרת גם קריפטו וגם שווקים נוספים.</p>
    </section>

    <section id="tracks" className="algo-pro-tracks" aria-label="שני מסלולי יישום">
      <div className="algo-pro-tracks-title"><p className="algo-pro-kicker"><i /> ONE FOUNDATION, TWO DIRECTIONS</p><h2>אותה חשיבה.<br /><em>שני מסלולי יישום.</em></h2></div>
      <article className="algo-pro-track crypto"><div className="algo-pro-track-top"><span>TRACK / 01</span><b>CRYPTO</b></div><h3>רובוטים לשוק הקריפטו</h3><p>למי שרוצים לחקור אסטרטגיה, לעבוד עם נתוני מטבעות, להבין API של בורסה ולהכיר את שכבת הבקרה סביב רובוט קריפטו.</p><ol><li><b>01</b><span>כללי אסטרטגיה ונתוני שוק</span></li><li><b>02</b><span>התראות, Webhooks וחיבורי API</span></li><li><b>03</b><span>בדיקות, ניטור ופעולה זהירה</span></li></ol><a href="/פיתוח-מותאם/">כשצריך פיתוח קריפטו מותאם <Arrow /></a></article>
      <article className="algo-pro-track markets"><div className="algo-pro-track-top"><span>TRACK / 02</span><b>MARKETS</b></div><h3>אלגו גם מעבר לקריפטו</h3><p>אותם עקרונות של מחקר, חוקים ובדיקות יכולים לשמש גם מערכות שמתחברות לפלטפורמות מסחר אחרות, לרבות MT4 ו־MT5.</p><ol><li><b>01</b><span>מחשיבה ידנית לכללים ברורים</span></li><li><b>02</b><span>בדיקות על נתונים וסימולציה</span></li><li><b>03</b><span>הבנת מגבלות הפלטפורמה</span></li></ol><a href="https://algocourses.com/" target="_blank" rel="noopener noreferrer">למסלול דרך AlgoCourses <Arrow /></a></article>
    </section>

    <section className="algo-pro-map"><div className="algo-pro-map-heading"><p className="algo-pro-kicker dark"><i /> THE LEARNING MAP</p><h2>מתקדמים לפי רצף שאפשר <em>ליישם.</em></h2><p>המסלול מחבר בין חשיבה, תרגול ובקרה — כדי להבין מה המערכת עושה ולא רק להעתיק קוד לתוכה.</p></div><ol>{modules.map(([number, title, description]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{description}</p></div><span aria-hidden="true">↙</span></li>)}</ol></section>

    <section className="algo-pro-ai">
      <div className="algo-pro-ai-stamp"><span>AI</span><i>WITH<br />HUMAN<br />CHECKS</i></div>
      <div className="algo-pro-ai-copy"><p className="algo-pro-kicker"><i /> AI IS A TOOL, NOT A TRADER</p><h2>AI יכול לעזור<br />לבנות, לשאול ולבדוק.<br /><em>לא להחליט במקומכם.</em></h2><p>אפשר להיעזר בו כדי לפרק רעיון, להבין קוד, לכתוב בדיקות או לתעד תהליך. אבל בדיקת הנתונים, ההיגיון העסקי וניהול הסיכונים נשארים עבודה אנושית.</p><ul><li>לנסח שאלות ולפרק משימות לפעולות קטנות.</li><li>לקרוא קוד ולהבין מה יש לבדוק בו.</li><li>לייצר תיעוד ובדיקות כנקודת פתיחה.</li><li>לא להחליף מחקר, שיקול דעת או בקרה על מערכת חיה.</li></ul></div>
    </section>

    <section className="algo-pro-fit"><div><p className="algo-pro-kicker dark"><i /> WHO THIS IS FOR</p><h2>למי המסלול מתאים?</h2></div><div className="algo-pro-fit-grid"><article><span>מתאים אם</span><ul><li>יש לכם סקרנות להבין איך רעיון מסחר הופך לחוקים.</li><li>אתם מוכנים לבדוק, לשאול ולתרגל במקום לחפש “בוט מוכן”.</li><li>מעניין אתכם קריפטו, שווקים אחרים או החיבור ביניהם.</li></ul></article><article><span>פחות מתאים אם</span><ul><li>מחפשים הבטחת תשואה, אותות או קיצור דרך למסחר.</li><li>רוצים להפעיל מערכת בלי להבין את מגבלותיה.</li><li>לא מתכוונים להשקיע זמן בלמידה ובבדיקה.</li></ul></article></div></section>

    <section className="algo-pro-bridge"><p className="algo-pro-kicker"><i /> CUSTOM DEVELOPMENT / AUTOSYSFX</p><h2>רוצים שאנחנו נפתח עבורכם<br /><em>מערכת מותאמת?</em></h2><p>אם יש לכם רעיון, שיטה או צורך בחיבור מורכב — אפשר לאפיין יחד רובוט קריפטו, כלי מחקר או מערכת לפי הכללים והתהליך שלכם.</p><a href="/פיתוח-מותאם/">לבדוק אפשרות לפיתוח מותאם <Arrow /></a></section>

    <section className="algo-pro-final"><p className="algo-pro-kicker"><i /> LET&apos;S FIND THE RIGHT START</p><h2>רוצים להבין אם המסלול<br /><em>מתאים למה שאתם רוצים לבנות?</em></h2><p>השאירו פרטים ונכוון אתכם בין מסלול הלימוד, עולם הקריפטו ופיתוח מותאם.</p><a className="algo-pro-primary" href="/צור-קשר/">לעבור לצור קשר <Arrow /></a><small>הקורס עוסק בלמידה ובכלים טכנולוגיים; אין באמור ייעוץ השקעות או הבטחת תשואה.</small></section>
    <LegacyFooter />
  </main>;
}
