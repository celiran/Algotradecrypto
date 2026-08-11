import { LegacyFooter, LegacyHeader } from "./legacy-shell";
import "../legacy.css";

export default function InfoPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: React.ReactNode }) {
  return <main className="legacy-site info-site"><LegacyHeader/><section className="info-hero"><p>{eyebrow}</p><h1>{title}</h1><div>{lead}</div></section><article className="info-content">{children}<div className="info-back"><a href="/">חזרה לדף הבית ←</a></div></article><LegacyFooter/></main>;
}
