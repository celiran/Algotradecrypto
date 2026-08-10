import { legacyPages, legacyPosts } from "../content/legacy-content";

const escapeXml=(value:string)=>value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const url=(loc:string,lastmod:string,changefreq:string,priority:string)=>`<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

export async function GET(){
  const base="https://algotradecrypto.com";
  const excluded=new Set(["home","homepage","shop","shop-2","cart","cart-2","checkout","checkout-2","my-account","my-account-2"]);
  const entries=[
    url(`${base}/`,new Date().toISOString(),"weekly","1.0"),
    url(`${base}/blog-2/`,new Date().toISOString(),"weekly","0.8"),
    ...legacyPosts.map(post=>url(`${base}/${encodeURIComponent(post.slug)}/`,new Date(post.modified??post.date??Date.now()).toISOString(),"monthly","0.7")),
    ...legacyPages.filter(page=>!excluded.has(page.slug)).map(page=>url(`${base}/${encodeURIComponent(page.slug)}/`,new Date(page.modified??Date.now()).toISOString(),"yearly","0.4")),
  ];
  const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
  return new Response(xml,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
