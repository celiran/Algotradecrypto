import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleCard, ArticlePage, LegacyFooter, LegacyHeader } from "../components/legacy-shell";
import { CookiePrivacyDisclosure } from "../components/cookie-consent";
import { excerptForMetadata, getArticleImageVariants, getArticleSeo } from "../content/article-seo";
import { getEffectiveArticle } from "../content/article-overrides";
import { infoRoutes } from "../content/info-routes";
import { legacyPages, legacyPosts } from "../content/legacy-content";

type Props={params:Promise<{slug:string[]}>};
const normalize=(parts:string[])=>parts.map(part=>{try{return decodeURIComponent(part)}catch{return part}});
const findPost=(parts:string[])=>legacyPosts.find(post=>post.slug===parts[0]);
const findPage=(parts:string[])=>legacyPages.find(page=>page.slug===parts[0]);
const cleanLegacyTitle=(title:string)=>title.replaceAll("\uFFFC","").trim();
const normalizeLegacyPageHtml=(html:string)=>html.replace(/eliran@autosysfx\.com/gi,"support@algotradecrypto.com");

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const parts=normalize((await params).slug);const info=infoRoutes[parts[0]];const post=findPost(parts);const page=findPage(parts);const path=`/${parts.map(encodeURIComponent).join("/")}/`;
  if(info)return{title:info.title,description:info.description,alternates:{canonical:`/${parts[0]}/`}};
  if(post){const article=getEffectiveArticle(post);const description=excerptForMetadata(article.excerpt);const seo=getArticleSeo(article.slug);const images=getArticleImageVariants(seo.image);return{title:article.title,description,alternates:{canonical:`/${article.slug}/`},openGraph:{type:"article",url:`/${article.slug}/`,title:article.title,description,publishedTime:article.date??undefined,modifiedTime:article.modified??undefined,authors:["אלירן כהן"],images:[{url:images.wide,width:1200,height:675,alt:seo.imageAlt}]},twitter:{card:"summary_large_image",title:article.title,description,images:[images.wide]}};}
  if(page)return{title:cleanLegacyTitle(page.title),description:page.excerpt.slice(0,160),alternates:{canonical:`/${page.slug}/`}};
  if(parts[0]==="tag"||parts[0]==="category"||parts[0]==="author")return{title:`ארכיון: ${parts.at(-1)?.replaceAll("-"," ")}`,description:"מאמרים מארכיון AlgoTradeCrypto",alternates:{canonical:path}};
  if(parts[0]==="blog-2"&&parts[1]==="2")return{title:"מרכז הידע — עמוד 2",alternates:{canonical:"/blog-2/2/"}};
  return{title:"העמוד לא נמצא",robots:{index:false,follow:false}};
}

export default async function LegacyRoute({params}:Props){
  const parts=normalize((await params).slug);const info=infoRoutes[parts[0]];if(info)return info.content();
  const post=findPost(parts);if(post){if(parts.length>1)permanentRedirect(`/${encodeURIComponent(post.slug)}/`);return <ArticlePage post={post}/>;}
  const page=findPage(parts);if(page)return <main className="legacy-site"><LegacyHeader/><article className="legacy-page"><a className="legal-page-back" href="/">← חזרה לדף הבית</a><h1>{cleanLegacyTitle(page.title)}</h1>{page.slug==="תקנון-תנאי-שימוש-ומדיניות-פרטיות"&&<CookiePrivacyDisclosure/>}<div className="legacy-page-body" dangerouslySetInnerHTML={{__html:normalizeLegacyPageHtml(page.content)}}/></article><LegacyFooter/></main>;
  const isArchive=parts[0]==="tag"||parts[0]==="category"||parts[0]==="author"||(parts[0]==="blog-2"&&parts[1]==="2");
  if(isArchive){const label=parts[0]==="blog-2"?"מרכז הידע — עמוד 2":parts.at(-1)?.replaceAll("-"," ");return <main className="legacy-site"><LegacyHeader/><section className="archive-title"><p>LEGACY ARCHIVE</p><h1>{label}</h1></section><section className="blog-grid archive-grid">{legacyPosts.map(item=><ArticleCard post={item} key={item.id}/>)}</section><LegacyFooter/></main>}
  notFound();
}
