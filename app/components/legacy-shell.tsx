import Link from "next/link";
import Script from "next/script";
import { legacyPosts } from "../content/legacy-content";
import "../legacy.css";

type LegacyPost = (typeof legacyPosts)[number];

export function LegacyHeader() {
  return <header className="legacy-header"><Link className="legacy-brand" href="/"><span>AT</span><b>AlgoTrade<em>Crypto</em></b></Link><nav><Link href="/">דף הבית</Link><Link href="/blog-2/">מרכז ידע</Link><a href="https://algocourses.co.il/">ללמוד לבנות</a><a href="https://autosysfx.com/">פיתוח מותאם</a></nav><a className="legacy-contact" href="https://api.whatsapp.com/send?phone=972528249299&text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%99%D7%A8%D7%9F%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20AlgoTradeCrypto" target="_blank" rel="noopener">שיחת אפיון ←</a></header>;
}

export function LegacyFooter() {
  return <footer className="legacy-footer"><p>AlgoTradeCrypto — ללמוד, לבחור ולבנות מסחר אוטומטי בקריפטו.</p><nav><Link href="/אזהרת-סיכון/">אזהרת סיכון</Link><Link href="/תקנון-תנאי-שימוש-ומדיניות-פרטיות/">תנאי שימוש ופרטיות</Link><Link href="/feed/">RSS</Link></nav><small>אין באמור ייעוץ השקעות או הבטחת תשואה.</small></footer>;
}

export function ArticleCard({ post }: { post: LegacyPost }) {
  return <article className="legacy-card"><span>{post.date ? new Intl.DateTimeFormat("he-IL",{year:"numeric",month:"long",day:"numeric"}).format(new Date(post.date)) : "מרכז הידע"}</span><h2><Link href={`/${post.slug}/`}>{post.title}</Link></h2><p>{post.excerpt.slice(0, 190)}{post.excerpt.length > 190 ? "…" : ""}</p><Link href={`/${post.slug}/`}>לקריאת המאמר ←</Link></article>;
}

export function ArticlePage({ post }: { post: LegacyPost }) {
  const canonical = `https://algotradecrypto.com/${post.slug}/`;
  const articleSchema = {"@context":"https://schema.org","@type":"Article",headline:post.title,description:post.excerpt,datePublished:post.date,dateModified:post.modified,mainEntityOfPage:canonical,author:{"@type":"Person",name:"אלירן כהן"},publisher:{"@type":"Organization",name:"AlgoTradeCrypto"}};
  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"דף הבית",item:"https://algotradecrypto.com/"},{"@type":"ListItem",position:2,name:"מרכז ידע",item:"https://algotradecrypto.com/blog-2/"},{"@type":"ListItem",position:3,name:post.title,item:canonical}]};
  return <main className="legacy-site"><Script id={`article-${post.id}`} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema)}}/><Script id={`breadcrumbs-${post.id}`} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema)}}/><LegacyHeader/><article className="article-page"><div className="article-hero"><p>ALGO KNOWLEDGE / {post.date ? new Date(post.date).getFullYear() : "ARCHIVE"}</p><h1>{post.title}</h1><div><span>מאת אלירן כהן</span><time dateTime={post.date ?? undefined}>{post.date ? new Intl.DateTimeFormat("he-IL",{year:"numeric",month:"long",day:"numeric"}).format(new Date(post.date)) : ""}</time></div></div><div className="article-layout"><div className="article-body" dangerouslySetInnerHTML={{__html:post.content}}/><aside><b>חשוב לדעת</b><p>התוכן נועד ללמידה כללית ואינו מהווה ייעוץ השקעות. יש לבדוק מידע עדכני לפני חיבור חשבון או API.</p><Link href="/blog-2/">חזרה למרכז הידע ←</Link></aside></div></article><LegacyFooter/></main>;
}
