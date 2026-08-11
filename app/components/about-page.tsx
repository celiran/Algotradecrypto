/* eslint-disable @next/next/no-html-link-for-pages -- vinext requires full-document navigation for reliable production routing. */
import { LegacyFooter, LegacyHeader } from "./legacy-shell";
import "../legacy.css";

const Arrow = () => <span aria-hidden="true">←</span>;

export default function AboutPage() {
  return <main className="legacy-site about-site">
    <LegacyHeader />
    <section className="about-hero">
      <p className="about-kicker"><i /> ABOUT / ALGOTRADECLYPTO × AUTOSYSFX</p>
      <h1>קריפטו הוא התחום.<br /><em>AutoSysFX הוא הבית.</em></h1>
      <p>AlgoTradeCrypto הוא מיזם הקריפטו של <a href="https://www.autosysfx.com/" target="_blank" rel="noreferrer">AutoSysFX — בית תוכנה לפתרונות פיננסיים ולמסחר אוטומטי</a>. כאן מרכזים ידע, מערכות וכלי פיתוח סביב רובוטי מסחר בקריפטו.</p>
      <div className="about-hero-rail"><span>TRADING EXPERIENCE</span><b>2005</b><i /><span>ALGO DEVELOPMENT</span><b>2007</b><i /><span>CRYPTO FOCUS</span><b>NOW</b></div>
    </section>

    <section className="about-intro">
      <div><p className="about-kicker dark"><i /> FROM A SOFTWARE HOUSE, NOT A SALES FUNNEL</p><h2>המטרה היא מערכת שאפשר להבין, לבדוק ולתחזק.</h2></div>
      <div><p>AutoSysFX הוקם על ידי אלירן כהן. הרקע שלו משלב מסחר עצמאי בשוקי ההון עם פיתוח מערכות אלגוריתמיות: מסחר מאז 2005 ופיתוח אסטרטגיות אוטומטיות וחצי־אוטומטיות מאז 2007.</p><p>הניסיון הזה חשוב גם בקריפטו: רובוט אינו רק קוד. הוא צריך להתמודד עם כללי מסחר, נתונים, חיבור לבורסה, מצבי כשל, בקרה ומי שאמור לעבוד איתו ביום שאחרי ההשקה.</p></div>
    </section>

    <section className="about-capabilities" aria-label="יכולות AutoSysFX עבור AlgoTradeCrypto">
      <article><span>01 / THINK</span><h2>מפרקים רעיון למערכת</h2><p>מתרגמים שיטה, התראה או תהליך ידני לכללים שאפשר לבדוק: מהו האות, מתי לא פועלים ומה מוגדר כסיכון.</p></article>
      <article><span>02 / BUILD</span><h2>בונים את שכבות המערכת</h2><p>רובוטי ביצוע, סורקים, Webhooks מ־TradingView, דשבורדים וחיבורים לבורסות — לפי הצורך ולא לפי תבנית אחת.</p></article>
      <article><span>03 / VERIFY</span><h2>בודקים לפני שמרחיבים</h2><p>Backtest, סביבת דמו, לוגים ובדיקת חריגות עוזרים לבחון את ההתנהגות של המערכת לפני שימוש רחב יותר.</p></article>
      <article><span>04 / OPERATE</span><h2>משאירים שליטה אצלכם</h2><p>הרשאות API מוגבלות, תיעוד, התראות ונראות תפעולית — כדי לדעת מה המערכת עשתה ומדוע.</p></article>
    </section>

    <section className="about-why">
      <div className="about-why-label"><p>WHY A SEPARATE CRYPTO SITE</p><span>01—03</span></div>
      <div className="about-why-copy"><h2>לא כל מי שמגיע עם רעיון צריך להתחיל מפיתוח מלא.</h2><p>AlgoTradeCrypto נבנה כדי להציג מסלולים שמתאימים לעולם הקריפטו: ללמוד את הבסיס, לבחון מערכת קיימת או לאפיין פיתוח מותאם. הבחירה תלויה בשיטה, ברמת המעורבות ובמה שבאמת צריך לבנות.</p><div><a href="/לימוד-אלגו/">ללימוד רובוטי קריפטו <Arrow /></a><a href="/פיתוח-מותאם/">לפיתוח מותאם <Arrow /></a><a href="/צור-קשר/">לשיחת אפיון <Arrow /></a></div></div>
    </section>

    <section className="about-process"><div><p className="about-kicker"><i /> HOW WE WORK</p><h2>שיחה טובה מתחילה<br />במטרות, לא בסיסמאות.</h2></div><ol><li><b>01</b><div><h3>מבינים את הצורך</h3><p>מגדירים מה רוצים לחקור, לחבר או להפוך לאוטומטי.</p></div></li><li><b>02</b><div><h3>בודקים היתכנות</h3><p>מסתכלים על נתונים, פלטפורמה, מגבלות API, סיכון ותפעול.</p></div></li><li><b>03</b><div><h3>בוחרים מסלול</h3><p>למידה, כלי קיים, אב־טיפוס או פיתוח מלא — רק לאחר שיש כיוון ברור.</p></div></li></ol></section>

    <section className="about-standards"><p className="about-kicker dark"><i /> WORKING PRINCIPLES</p><h2>מה לא נמצא כאן.</h2><ul><li>אין הבטחות תשואה או “רובוט קסם”.</li><li>אין המלצת השקעה אישית או תחליף לייעוץ מורשה.</li><li>אין צורך למסור מפתחות API עם הרשאות משיכה.</li><li>אין סיבה להתחיל פרויקט גדול לפני שאפשר להסביר מה הוא אמור לעשות.</li></ul></section>

    <section className="about-final"><p className="about-kicker"><i /> LET’S START CLEAR</p><h2>יש רעיון, שיטה או צורך תפעולי?<br /><em>בואו נדבר על הדרך הנכונה.</em></h2><a href="/צור-קשר/">לתיאום שיחת אפיון <Arrow /></a></section>
    <LegacyFooter />
  </main>;
}
