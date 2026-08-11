import { legacyPages, legacyPosts } from "../content/legacy-content";
import { getEffectiveArticle } from "../content/article-overrides";

const escapeXml=(value:string)=>value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const url=(loc:string,lastmod:string|undefined,changefreq:string,priority:string)=>`<url><loc>${escapeXml(loc)}</loc>${lastmod?`<lastmod>${lastmod}</lastmod>`:""}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

export async function GET(){
  const base="https://algotradecrypto.com";
  const excluded=new Set(["home","homepage","blog-2","shop","shop-2","cart","cart-2","checkout","checkout-2","my-account","my-account-2"]);
  const primaryPages=[
    ["אודות","monthly","0.6"],
    ["צור-קשר","monthly","0.7"],
    ["לימוד-אלגו","weekly","0.8"],
    ["פיתוח-מותאם","weekly","0.8"],
    ["הצהרת-נגישות","yearly","0.3"],
  ] as const;
  const entries=[
    url(`${base}/`,undefined,"weekly","1.0"),
    url(`${base}/blog-2/`,undefined,"weekly","0.8"),
    ...primaryPages.map(([slug,changefreq,priority])=>url(`${base}/${encodeURIComponent(slug)}/`,undefined,changefreq,priority)),
    ...legacyPosts.map(getEffectiveArticle).map(post=>url(`${base}/${encodeURIComponent(post.slug)}/`,post.modified||post.date?new Date(post.modified??post.date).toISOString():undefined,"monthly","0.7")),
    ...legacyPages.filter(page=>!excluded.has(page.slug)).map(page=>url(`${base}/${encodeURIComponent(page.slug)}/`,page.modified?new Date(page.modified).toISOString():undefined,"yearly","0.4")),
  ];
  const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
  return new Response(xml,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
