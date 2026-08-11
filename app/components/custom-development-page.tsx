/* eslint-disable @next/next/no-html-link-for-pages -- vinext requires full-document navigation for reliable production routing. */
import { LegacyFooter, LegacyHeader } from "./legacy-shell";
import "../legacy.css";

const Arrow = () => <span aria-hidden="true">←</span>;

export default function CustomDevelopmentPage() {
  return <main className="legacy-site custom-development-site">
    <LegacyHeader />
    <section className="custom-dev-hero">
      <div className="custom-dev-hero-copy">
        <p className="custom-dev-kicker"><i /> CUSTOM CRYPTO DEVELOPMENT / AUTOSYSFX</p>
        <h1>כשאתה רוצה להפוך את<br /><em>הרעיונות שלך לרובוט קריפטו.</em></h1>
        <p>אם יש לכם שיטה, צורך תפעולי או רעיון שדורש יותר מ־DCA או Grid — אפשר לאפיין ולבנות מערכת קריפטו שעובדת לפי הכללים, החשבונות והבקרה שלכם.</p>
        <div className="custom-dev-actions"><a className="custom-dev-primary" href="/צור-קשר/">לשיחת אפיון על המערכת <Arrow /></a><a className="custom-dev-secondary" href="#process">כך נראה התהליך ↓</a></div>
      </div>
      <div className="custom-dev-blueprint" aria-label="תרשים רכיבי מערכת מסחר קריפטו">
        <div className="blueprint-head"><span>כך מערכת הקריפטו עובדת</span><b>SYSTEM FLOW / 01—03</b></div>
        <div className="blueprint-flow">
          <article className="blueprint-step signal"><span>01</span><p>אות מסחר</p><strong>אסטרטגיה או<br />TradingView</strong><small>Signal / Webhook</small></article>
          <div className="blueprint-link" aria-hidden="true"><i />←</div>
          <article className="blueprint-step risk"><span>02</span><p>בדיקת סיכון</p><strong>כללי חשיפה,<br />גודל פקודה ועצירה</strong><small>Risk checks</small></article>
          <div className="blueprint-link" aria-hidden="true"><i />←</div>
          <article className="blueprint-step execution"><span>03</span><p>ביצוע בבורסה</p><strong>שליחת פקודה<br />ומעקב סטטוס</strong><small>Exchange API</small></article>
        </div>
        <div className="blueprint-status"><i /><div><b>בקרה רציפה</b><span>ניטור · לוגים · התראות · בדיקת חריגות</span></div></div>
      </div>
    </section>

    <section className="custom-dev-context"><div><p className="custom-dev-kicker dark"><i /> WHEN A READY-MADE BOT IS NOT ENOUGH</p><h2>פיתוח מותאם מתחיל מהצורך, לא מהקוד.</h2></div><p>המערכת יכולה להתחיל מאסטרטגיה קיימת, מאיתותים ב־TradingView, מתהליך ידני שרוצים להפוך למסודר או מדרישה לחבר כמה חשבונות ובורסות. המטרה היא לא “לבנות בוט” — אלא להגדיר מה המערכת עושה, מתי היא לא פועלת ואיך בודקים שהיא מתנהגת כמתוכנן.</p></section>

    <section className="custom-dev-sections" aria-label="סוגי מערכות קריפטו מותאמות">
      <article><span>01 / EXECUTION</span><h2>רובוט מסחר לפי חוקים מוגדרים</h2><p>הופכים תנאי כניסה, יציאה, גודל פוזיציה ומגבלות סיכון ללוגיקה ברורה. כולל שכבת ביצוע שמדברת בשפה של הבורסה, ולא רק סימון על גרף.</p></article>
      <article><span>02 / RESEARCH</span><h2>Backtest, Paper Trading ובדיקת היתכנות</h2><p>בודקים את ההיגיון על נתונים היסטוריים או בסביבת סימולציה, מזהים הנחות חסרות ומגדירים מה נחשב הצלחה תפעולית לפני חיבור לחשבון חי.</p></article>
      <article><span>03 / SIGNALS</span><h2>סורקים, התראות ו־TradingView</h2><p>אפשר לבנות סורק שווקים, מערכת התראות או חיבור של Pine Alert ל־Webhook מאובטח. האות עובר בדיקות בשרת לפני שנשלחת פקודה לבורסה.</p></article>
      <article><span>04 / OPERATIONS</span><h2>דשבורד, חשבונות וניטור</h2><p>תצוגת מצב, יומן פעולות, התראות על שגיאות, הרשאות API והפרדה בין חשבונות. כך אפשר להבין מה קרה גם כשהמערכת לא מול העיניים.</p></article>
    </section>

    <section id="process" className="custom-dev-process"><div className="custom-dev-process-intro"><p className="custom-dev-kicker"><i /> DEVELOPMENT PIPELINE</p><h2>מגבשים מערכת לפני שמריצים אותה.</h2><p>פיתוח טוב מצמצם הנחות כבר בתחילת הדרך. לא כל רעיון צריך להפוך מיד לפרויקט מלא; לפעמים התוצאה הנכונה היא Proof of Concept קטן או כלי מחקר פנימי.</p></div><ol><li><span>01</span><div><h3>אפיון</h3><p>מגדירים מהו האות, באילו שווקים פועלים, מה גודל החשיפה ומה אסור למערכת לעשות.</p></div></li><li><span>02</span><div><h3>היתכנות וארכיטקטורה</h3><p>בודקים נתונים, API, מגבלות בורסה, חשבונות, סביבת שרת ודרישות אבטחה.</p></div></li><li><span>03</span><div><h3>פיתוח ובדיקות</h3><p>בונים רכיבים, מוסיפים לוגים, Backtest או Paper Trading ובודקים מצבי כשל.</p></div></li><li><span>04</span><div><h3>הפעלה מדורגת</h3><p>עולים בהיקף מוגבל, מנטרים פקודות וחריגות, ומשפרים על בסיס תיעוד אמיתי.</p></div></li></ol></section>

    <section className="custom-dev-ai"><div><p className="custom-dev-kicker dark"><i /> AI, WITH GUARDRAILS</p><h2>איפה AI נכנס<br /><em>לפיתוח רובוט קריפטו?</em></h2></div><div className="custom-dev-ai-copy"><p>AI יכול לקצר עבודה סביב המערכת: ניתוח לוגים, סיווג אירועים, כתיבת בדיקות, תיעוד ממשקי API, יצירת אב־טיפוס וכלי בקרה. הוא אינו מחליף הגדרת אסטרטגיה, בדיקת נתונים או החלטת ניהול סיכונים.</p><ul><li>מסייע לנתח תקלות והתנהגות חריגה מתוך לוגים.</li><li>מסייע לייצר בדיקות ותיעוד לרכיבים קיימים.</li><li>יכול לתמוך במחקר ובמיון מידע — תחת כללים ובקרה אנושית.</li><li>לא מקבל גישה חופשית למפתחות API או מחליט לבדו על פקודות מסחר.</li></ul></div></section>

    <section className="custom-dev-readiness"><div><p className="custom-dev-kicker"><i /> BEFORE THE CALL</p><h2>לא חייבים מפרט מושלם.<br />כן כדאי להביא כיוון.</h2></div><ul><li><b>מה אתם רוצים שהמערכת תזהה או תבצע?</b><span>שיטה קיימת, דוגמה ידנית או תיאור של הבעיה מספיקים להתחלה.</span></li><li><b>איפה היא אמורה לעבוד?</b><span>בורסה, TradingView, שרת, כמה חשבונות או שילוב ביניהם.</span></li><li><b>מה חייב להיות בשליטה?</b><span>חשיפה, גודל פקודה, זמני פעילות, עצירה, התראות או דוח מצב.</span></li></ul></section>

    <section className="custom-dev-final"><p className="custom-dev-kicker"><i /> START WITH A CLEAR SPEC</p><h2>יש כיוון למערכת?<br /><em>בואו נבדוק מה נכון לבנות.</em></h2><p>שיחת אפיון קצרה יכולה לעזור להפריד בין רעיון, אב־טיפוס, מערכת מוכנה ופיתוח מלא.</p><a className="custom-dev-primary" href="/צור-קשר/">לתיאום שיחת אפיון <Arrow /></a><small>אין באמור ייעוץ השקעות או הבטחת תשואה.</small></section>
    <LegacyFooter />
  </main>;
}
