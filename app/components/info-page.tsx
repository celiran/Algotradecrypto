import { LegacyFooter, LegacyHeader } from "./legacy-shell";
import "../legacy.css";

export default function InfoPage({ eyebrow, title, lead, children, showTopBack = false }: { eyebrow: string; title: string; lead: string; children: React.ReactNode; showTopBack?: boolean }) {
  return <main className="legacy-site info-site"><LegacyHeader/><section className="info-hero">{showTopBack&&<a className="info-top-back" href="/">← חזרה לדף הבית</a>}<p>{eyebrow}</p><h1>{title}</h1><div>{lead}</div></section><article className="info-content">{children}<div className="info-back"><a href="/">חזרה לדף הבית ←</a></div></article><LegacyFooter/></main>;
}
