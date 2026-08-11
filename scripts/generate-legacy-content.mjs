import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(projectRoot, "..", "migration-artifacts", "2026-08-09-algotradecrypto", "public-backup", "wordpress-rest");
const posts = JSON.parse(await readFile(resolve(sourceRoot, "posts", "page-1.json"), "utf8"));
const pages = JSON.parse(await readFile(resolve(sourceRoot, "pages", "page-1.json"), "utf8"));

const decode = (value = "") => {
  try { return decodeURIComponent(value); } catch { return value; }
};

const cleanHtml = (html = "") => html
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<(script|style|iframe|form|input|button)[^>]*>[\s\S]*?<\/\1>/gi, "")
  .replace(/<(script|style|iframe|form|input|button)[^>]*\/?>/gi, "")
  .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
  .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, "")
  .replace(/\sclass\s*=\s*("[^"]*"|'[^']*')/gi, "")
  .replace(/<a\s+([^>]*href=("[^"]*"|'[^']*')[^>]*)>/gi, "<a $1 rel=\"nofollow noopener\">")
  .replace(/https?:\/\/(?:www\.)?algotradecrypto\.com/gi, "")
  .trim();

const stripHtml = (html = "") => html
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/g, " ")
  .replace(/&hellip;|&#8230;/g, "…")
  .replace(/&#8211;/g, "–")
  .replace(/&#8217;/g, "’")
  .replace(/&amp;/g, "&")
  .replace(/\s+/g, " ")
  .trim();

const normalize = (item, type) => ({
  id: item.id,
  type,
  slug: decode(item.slug),
  title: stripHtml(item.title?.rendered || ""),
  excerpt: stripHtml(item.excerpt?.rendered || item.content?.rendered || "").slice(0, 240),
  content: cleanHtml(item.content?.rendered || ""),
  date: item.date || null,
  modified: item.modified || item.date || null,
});

const target = resolve(projectRoot, "app", "content", "legacy-content.ts");
await mkdir(dirname(target), { recursive: true });
await writeFile(target,
  `// Generated from the public WordPress REST backup. Do not edit by hand.\n` +
  `export const legacyPosts = ${JSON.stringify(posts.map((item) => normalize(item, "post")), null, 2)} as const;\n\n` +
  `export const legacyPages = ${JSON.stringify(pages.map((item) => normalize(item, "page")), null, 2)} as const;\n`,
  "utf8"
);

console.log(`Generated ${posts.length} posts and ${pages.length} pages.`);
