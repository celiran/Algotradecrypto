import type { Metadata } from "next";
import { ArticleCard, LegacyFooter, LegacyHeader } from "../components/legacy-shell";
import { legacyPosts } from "../content/legacy-content";

export const metadata: Metadata = { title:"מרכז ידע — מסחר אוטומטי בקריפטו",description:"מאמרים ומדריכים על פיתוח רובוטים, אסטרטגיות, בורסות ומסחר אוטומטי בקריפטו.",alternates:{canonical:"/blog-2/"},openGraph:{type:"website",url:"/blog-2/",title:"מרכז הידע של AlgoTradeCrypto",description:"לומדים לבנות, לבדוק ולהפעיל מסחר אוטומטי בקריפטו."}};

export default function BlogPage(){return <main className="legacy-site"><LegacyHeader/><section className="blog-hero"><p>ALGO KNOWLEDGE BASE</p><h1>ללמוד לפני שמפעילים.<br/><em>לבדוק לפני שמסכנים.</em></h1><div>מדריכים מעשיים על אסטרטגיות, רובוטים, בורסות, API וניהול סיכונים. מאמרי האתר הישן נשמרו בכתובות המקוריות שלהם.</div></section><section className="blog-grid">{legacyPosts.map(post=><ArticleCard post={post} key={post.id}/>)}</section><LegacyFooter/></main>}
