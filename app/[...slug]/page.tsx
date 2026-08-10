import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard, ArticlePage, LegacyFooter, LegacyHeader } from "../components/legacy-shell";
import { legacyPages, legacyPosts } from "../content/legacy-content";

type Props={params:Promise<{slug:string[]}>};
const normalize=(parts:string[])=>parts.map(part=>{try{return decodeURIComponent(part)}catch{return part}});
const findPost=(parts:string[])=>legacyPosts.find(post=>post.slug===parts[0]);
const findPage=(parts:string[])=>legacyPages.find(page=>page.slug===parts[0]);

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const parts=normalize((await params).slug);const post=findPost(parts);const page=findPage(parts);const path=`/${parts.map(encodeURIComponent).join("/")}/`;
  if(post)return{title:post.title,description:post.excerpt.slice(0,160),alternates:{canonical:`/${post.slug}/`},openGraph:{type:"article",url:`/${post.slug}/`,title:post.title,description:post.excerpt.slice(0,160),publishedTime:post.date??undefined,modifiedTime:post.modified??undefined,authors:["אלירן כהן"]}};
  if(page)return{title:page.title,description:page.excerpt.slice(0,160),alternates:{canonical:`/${page.slug}/`}};
  if(parts[0]==="tag"||parts[0]==="category"||parts[0]==="author")return{title:`ארכיון: ${parts.at(-1)?.replaceAll("-"," ")}`,description:"מאמרים מארכיון AlgoTradeCrypto",alternates:{canonical:path}};
  if(parts[0]==="blog-2"&&parts[1]==="2")return{title:"מרכז הידע — עמוד 2",alternates:{canonical:"/blog-2/2/"}};
  return{title:"העמוד לא נמצא",robots:{index:false,follow:false}};
}

export default async function LegacyRoute({params}:Props){
  const parts=normalize((await params).slug);const post=findPost(parts);if(post)return <ArticlePage post={post}/>;
  const page=findPage(parts);if(page)return <main className="legacy-site"><LegacyHeader/><article className="legacy-page"><p className="eyebrow dark">LEGACY PAGE</p><h1>{page.title}</h1><div className="legacy-page-body" dangerouslySetInnerHTML={{__html:page.content}}/></article><LegacyFooter/></main>;
  const isArchive=parts[0]==="tag"||parts[0]==="category"||parts[0]==="author"||(parts[0]==="blog-2"&&parts[1]==="2");
  if(isArchive){const label=parts[0]==="blog-2"?"מרכז הידע — עמוד 2":parts.at(-1)?.replaceAll("-"," ");return <main className="legacy-site"><LegacyHeader/><section className="archive-title"><p>LEGACY ARCHIVE</p><h1>{label}</h1></section><section className="blog-grid archive-grid">{legacyPosts.map(item=><ArticleCard post={item} key={item.id}/>)}</section><LegacyFooter/></main>}
  notFound();
}
