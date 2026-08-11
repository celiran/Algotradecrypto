import { getArticleImageVariants, getArticleSeo, normalizeLegacyArticleHtml } from "../content/article-seo";
import { getEffectiveArticle } from "../content/article-overrides";
import { legacyPosts } from "../content/legacy-content";
import "../legacy.css";

type LegacyPost = (typeof legacyPosts)[number];

const absoluteUrl = (path: string) => `https://algotradecrypto.com${path}`;
const jsonLd = (value: object) => JSON.stringify(value).replaceAll("<", "\\u003c");

export function LegacyHeader() {
  return <header className="legacy-header"><a className="legacy-brand" href="/"><span>AT</span><b>AlgoTrade<em>Crypto</em></b></a><nav><a href="/">דף הבית</a><a href="/אודות/">אודות</a><a href="/blog-2/">מרכז ידע</a><a href="/לימוד-אלגו/">ללמוד לבנות</a><a href="/פיתוח-מותאם/">פיתוח מותאם</a></nav><a className="legacy-contact" href="/צור-קשר/">צור קשר ←</a></header>;
}

export function LegacyFooter() {
  return <footer className="legacy-footer"><p>AlgoTradeCrypto — ללמוד, לבחור ולבנות מסחר אוטומטי בקריפטו.</p><nav><a href="/אודות/">אודות</a><a href="/צור-קשר/">צור קשר</a><a href="/אזהרת-סיכון/">אזהרת סיכון</a><a href="/תקנון-תנאי-שימוש-ומדיניות-פרטיות/">תקנון ופרטיות</a><a href="/הצהרת-נגישות/">נגישות</a><a href="/feed/">RSS</a></nav><small><span>אין באמור ייעוץ השקעות או הבטחת תשואה.</span><span>אתר זה חלק מקבוצת <a href="http://www.autosysfx.com/" target="_blank" rel="noopener noreferrer">AutoSysFX</a></span></small></footer>;
}

export function ArticleCard({ post }: { post: LegacyPost }) {
  const article = getEffectiveArticle(post);
  const seo = getArticleSeo(article.slug);
  return <article className="legacy-card"><a className="legacy-card-image" href={`/${article.slug}/`} aria-label={`לקריאת ${article.title}`}><img src={seo.image} width="1536" height="1024" loading="lazy" decoding="async" alt={seo.imageAlt}/></a><span>{article.date ? new Intl.DateTimeFormat("he-IL",{year:"numeric",month:"long",day:"numeric"}).format(new Date(article.date)) : "מרכז הידע"}</span><h2><a href={`/${article.slug}/`}>{article.title}</a></h2><p>{article.excerpt.slice(0, 190)}{article.excerpt.length > 190 ? "…" : ""}</p><a href={`/${article.slug}/`}>לקריאת המאמר ←</a></article>;
}

export function ArticlePage({ post }: { post: LegacyPost }) {
  const article = getEffectiveArticle(post);
  const canonical = absoluteUrl(`/${article.slug}/`);
  const seo = getArticleSeo(article.slug);
  const imageVariants = getArticleImageVariants(seo.image);
  const schemaImages = [imageVariants.wide, imageVariants.standard, imageVariants.square].map(absoluteUrl);
  const relatedPosts = legacyPosts.filter((item) => seo.related.includes(item.slug));
  const articleSchema = {"@context":"https://schema.org","@type":"BlogPosting",headline:article.title,description:article.excerpt,image:schemaImages,datePublished:article.date,dateModified:article.modified,inLanguage:"he-IL",mainEntityOfPage:{"@type":"WebPage","@id":canonical},author:{"@type":"Person",name:"אלירן כהן",url:"https://algotradecrypto.com/אודות/"},publisher:{"@type":"Organization",name:"AlgoTradeCrypto",url:"https://algotradecrypto.com/",logo:{"@type":"ImageObject",url:"https://algotradecrypto.com/signal-glass-og.png"}}};
  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"דף הבית",item:"https://algotradecrypto.com/"},{"@type":"ListItem",position:2,name:"מרכז ידע",item:"https://algotradecrypto.com/blog-2/"},{"@type":"ListItem",position:3,name:article.title,item:canonical}]};

  return <main className="legacy-site">
    <script id={`article-${post.id}`} type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(articleSchema)}}/>
    <script id={`breadcrumbs-${post.id}`} type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbSchema)}}/>
    <LegacyHeader/>
    <article className="article-page">
      <div className="article-hero"><nav className="article-breadcrumbs" aria-label="פירורי לחם"><a href="/">דף הבית</a><span aria-hidden="true">←</span><a href="/blog-2/">מרכז ידע</a></nav><p>ALGO KNOWLEDGE / {article.modified ? new Date(article.modified).getFullYear() : "ARCHIVE"}</p><h1>{article.title}</h1><div><span>מאת <a href="/אודות/">אלירן כהן</a></span><time dateTime={article.modified ?? article.date ?? undefined}>עודכן {article.modified ? new Intl.DateTimeFormat("he-IL",{year:"numeric",month:"long",day:"numeric"}).format(new Date(article.modified)) : article.date ? new Intl.DateTimeFormat("he-IL",{year:"numeric",month:"long",day:"numeric"}).format(new Date(article.date)) : ""}</time></div></div>
      <figure className="article-featured-image"><img src={seo.image} width="1536" height="1024" decoding="async" fetchPriority="high" alt={seo.imageAlt}/></figure>
      <div className="article-layout"><div className="article-body" dangerouslySetInnerHTML={{__html:normalizeLegacyArticleHtml(article.content)}}/><aside><b>חשוב לדעת</b><p>התוכן נועד ללמידה כללית ואינו מהווה ייעוץ השקעות. יש לבדוק מידע עדכני לפני חיבור חשבון או API.</p><a href="/blog-2/">חזרה למרכז הידע ←</a></aside></div>
      {relatedPosts.length > 0 && <section className="related-articles" aria-labelledby="related-title"><div><p>המשך קריאה</p><h2 id="related-title">מאמרים קשורים</h2></div><div className="related-grid">{relatedPosts.map((item) => <ArticleCard post={item} key={item.id}/>)}</div></section>}
    </article>
    <LegacyFooter/>
  </main>;
}
