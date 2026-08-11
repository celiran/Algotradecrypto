import ContactForm from "./contact-form";
import { LegacyFooter, LegacyHeader } from "./legacy-shell";

const whatsappUrl = "https://api.whatsapp.com/send?phone=972528249299&text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%99%D7%A8%D7%9F%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20AlgoTradeCrypto";

function ContactIcon({ type }: { type: "mail" | "path" | "whatsapp" }) {
  if (type === "mail") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if (type === "path") return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z"/><path d="M9 8.5c.5 2.7 2 4.2 4.7 4.9"/></svg>;
}

export default function ContactPage() {
  return <main className="legacy-site crypto-contact-page">
    <LegacyHeader/>
    <section className="crypto-contact-main">
      <div className="crypto-contact-grid" aria-hidden="true"/>
      <div className="crypto-contact-shell">
        <div className="crypto-contact-intro">
          <p className="crypto-contact-kicker">ALGO TRADE CRYPTO / CONTACT</p>
          <h1>בואו נדייק<br/><span>את הכיוון.</span></h1>
          <p className="crypto-contact-lead">ספרו לנו מה אתם רוצים להשיג בעולם האלגו בקריפטו. נבדוק יחד אם נכון ללמוד לבנות, לבחור מערכת מוכנה או לצאת לפיתוח מותאם.</p>
          <div className="crypto-contact-cards" aria-label="אפשרויות יצירת קשר">
            <article><div><span><ContactIcon type="mail"/></span><h2>אימייל</h2></div><p>לפנייה מפורטת או לצירוף מידע על האסטרטגיה.</p><a href="mailto:eliran@autosysfx.com" dir="ltr">eliran@autosysfx.com</a></article>
            <article><div><span><ContactIcon type="path"/></span><h2>מה קורה אחרי הפנייה?</h2></div><p>נעבור על הצורך, נזהה את המסלול המתאים ואם יש התאמה — נמשיך לשיחת אפיון ממוקדת.</p></article>
            <article className="is-whatsapp"><div><span><ContactIcon type="whatsapp"/></span><h2>WhatsApp</h2></div><p>מעדיפים להתחיל בהודעה קצרה? אפשר לפנות ישירות לאלירן.</p><a href={whatsappUrl} target="_blank" rel="noreferrer">שליחת הודעה ב־WhatsApp ↗</a></article>
          </div>
        </div>
        <div className="crypto-contact-panel">
          <div className="crypto-contact-topline"><span>01</span><p>השאירו פרטים ונבדוק איך נכון להתקדם</p></div>
          <ContactForm/>
        </div>
      </div>
    </section>
    <LegacyFooter/>
  </main>;
}
