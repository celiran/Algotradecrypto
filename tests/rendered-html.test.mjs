import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(path = "/", init = {}, extraEnv = {}) {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(url.href);
  const headers = new Headers(init.headers);
  if (!headers.has("accept")) headers.set("accept", "text/html");
  return worker.fetch(new Request(`http://localhost${path}`, { ...init, headers }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) }, ...extraEnv }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Signal Glass home page in Hebrew", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /הדרך שלך לרובוט מסחר בקריפטו/);
  assert.match(html, /מערכות קריפטו מוכנות/);
  assert.match(html, /תחת בנייה/);
  assert.match(html, /BOT EQUITY \/ BTC-USDT/);
  assert.match(html, /CUMULATIVE P&amp;L/);
  assert.match(html, /SINCE 2007/);
  assert.match(html, /600\+/);
  assert.match(html, /290\+/);
  assert.match(html, /רובוטים וייעוצים/);
  assert.match(html, /לא בטוח איך להתקדם בעולם האלגו בקריפטו\? דבר איתנו/);
  assert.match(html, />EC</);
  assert.doesNotMatch(html, />EK</);
  assert.match(html, /AlgoTradeCrypto/);
  assert.match(html, /class="accessibility-toggle"/);
  assert.match(html, /class="risk-bar"/);
  assert.match(html, /href="\/אודות\/"/);
  assert.match(html, /href="\/צור-קשר\/"/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("keeps the legacy blog index available", async () => {
  const response = await render("/blog-2/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /מרכז הידע/);
  assert.match(html, /באיזו שפת תכנות בונים רובוט מסחר בקריפטו ב־2026\?/);
  assert.match(html, /\/images\/articles\/crypto-intro-signal-glass\.webp/);
  assert.match(html, /alt="רשת בלוקצ&#x27;יין ומטבעות קריפטו בסגנון Signal Glass"/);
});

test("renders article SEO media, semantic headings and internal discovery links", async () => {
  const slug = encodeURIComponent("מבוא-לקריפטו-מדריך-מקיף-למתחילים");
  const response = await render(`/${slug}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<meta property="og:image" content="https:\/\/algotradecrypto\.com\/images\/articles\/crypto-intro-signal-glass-16x9\.webp"/);
  assert.match(html, /<script id="article-\d+" type="application\/ld\+json">/);
  assert.match(html, /"@type":"BlogPosting"/);
  assert.match(html, /"image":\["https:\/\/algotradecrypto\.com\/images\/articles\/crypto-intro-signal-glass-16x9\.webp","https:\/\/algotradecrypto\.com\/images\/articles\/crypto-intro-signal-glass-4x3\.webp","https:\/\/algotradecrypto\.com\/images\/articles\/crypto-intro-signal-glass-1x1\.webp"\]/);
  assert.match(html, /<h2>מה זה מטבעות קריפטו\?<\/h2>/);
  assert.match(html, /מאמרים קשורים/);
  assert.match(html, /href="\/למה-לסחור-בקריפטו\/"/);
});

test("renders the updated 2026 crypto exchange guide at its original WordPress URL", async () => {
  const slug = encodeURIComponent("באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח");
  const response = await render(`/${slug}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /באילו בורסות קריפטו אפשר להפעיל מסחר אוטומטי ב־2026\?/);
  assert.match(html, /<h2 id="selection">מה צריך לבדוק לפני שבוחרים בורסת קריפטו לרובוט\?<\/h2>/);
  assert.match(html, /<h3>1\. API למסחר ו־WebSocket לנתונים בזמן אמת<\/h3>/);
  assert.match(html, /class="article-table-wrap"/);
  assert.match(html, /Coinbase Advanced/);
  assert.match(html, /Kraken/);
  assert.match(html, /OKX/);
  assert.match(html, /Bybit/);
  assert.match(html, /"dateModified":"2026-08-10T12:00:00\+03:00"/);
  assert.match(html, /href="\/איך-לפתח-אסטרטגיית-מסחר\/"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.doesNotMatch(html, /Binance: Binance/);
});

test("renders the updated programming guide with a safe TradingView webhook architecture", async () => {
  const slug = encodeURIComponent("פיתוח-רובוטים-בקריפטו-באיזו-שפת-תכנות");
  const response = await render(`/${slug}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /באיזו שפת תכנות בונים רובוט מסחר בקריפטו ב־2026\?/);
  assert.match(html, /<h2 id="tradingview">האם אפשר לחבר TradingView לרובוט קריפטו\?<\/h2>/);
  assert.match(html, /class="article-flow"/);
  assert.match(html, /Webhook מאובטח/);
  assert.match(html, /idempotency/);
  assert.match(html, /לא שומרים מפתח API ב־Pine Script/);
  assert.match(html, /href="\/באילו-בורסות-קריפטו-אתה-יכול-לעשות-מסח\/"/);
  assert.match(html, /"dateModified":"2026-08-10T13:00:00\+03:00"/);
  assert.doesNotMatch(html, /JavaScrip<\/p>/);
});

test("sends the crypto algo development article CTA to the contact page", async () => {
  const slug = encodeURIComponent("למה-כדאי-לפתח-אלגו-בתחום-הקריפטו");
  const response = await render(`/${slug}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /רוצים עזרה בפיתוח רובוט קריפטו\? צרו איתנו קשר לשיחת אפיון ←/);
  assert.match(html, /href="\/צור-קשר\/"/);
  assert.doesNotMatch(html, /href="\/#details"/);
});

test("permanently redirects nested WordPress article variants to the canonical URL", async () => {
  const slug = encodeURIComponent("מבוא-לקריפטו-מדריך-מקיף-למתחילים");
  const response = await render(`/${slug}/feed/`);
  assert.equal(response.status, 308);
  assert.equal(decodeURIComponent(new URL(response.headers.get("location"), "http://localhost").pathname), `/${decodeURIComponent(slug)}/`);
});

test("sitemap contains each canonical URL once and no volatile current timestamp", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.equal((xml.match(/<loc>https:\/\/algotradecrypto\.com\/blog-2\/<\/loc>/g) ?? []).length, 1);
  assert.match(xml, /2026-08-10T09:00:00\.000Z/);
});

for (const [path, text] of [
  ["/%D7%90%D7%95%D7%93%D7%95%D7%AA/", "AutoSysFX הוא הבית"],
  ["/%D7%A6%D7%95%D7%A8-%D7%A7%D7%A9%D7%A8/", "בואו נדייק"],
  ["/%D7%94%D7%A6%D7%94%D7%A8%D7%AA-%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA/", "כלי הנגישות באתר"],
  ["/%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%90%D7%9C%D7%92%D7%95/", "ALGO AI PRO"],
  ["/%D7%A4%D7%99%D7%AA%D7%95%D7%97-%D7%9E%D7%95%D7%AA%D7%90%D7%9D/", "כשאתה רוצה להפוך את"],
]) {
  test(`keeps the local Hebrew route available: ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(text));
  });
}

test("renders the custom crypto development service page with depth and AI guardrails", async () => {
  const response = await render("/%D7%A4%D7%99%D7%AA%D7%95%D7%97-%D7%9E%D7%95%D7%AA%D7%90%D7%9D/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="custom-dev-blueprint"/);
  assert.match(html, /Backtest, Paper Trading ובדיקת היתכנות/);
  assert.match(html, /AI, WITH GUARDRAILS/);
  assert.match(html, /לא מקבל גישה חופשית למפתחות API/);
  assert.match(html, /href="\/צור-קשר\/"/);
  assert.match(html, /CUSTOM CRYPTO DEVELOPMENT/);
});

test("renders the visual ALGO AI PRO course page with two tracks and a contact CTA", async () => {
  const response = await render("/%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%90%D7%9C%D7%92%D7%95/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="algo-pro-console"/);
  assert.match(html, /AlgoCourses/);
  assert.match(html, /רובוטים לשוק הקריפטו/);
  assert.match(html, /אלגו גם מעבר לקריפטו/);
  assert.match(html, /AI יכול לעזור/);
  assert.match(html, /href="\/צור-קשר\/"/);
});

test("renders the contact intake and exposes a safe local Cloudflare configuration", async () => {
  const pageResponse = await render("/%D7%A6%D7%95%D7%A8-%D7%A7%D7%A9%D7%A8/");
  assert.equal(pageResponse.status, 200);
  const html = await pageResponse.text();
  assert.match(html, /במה תרצו להתמקד/);
  assert.match(html, /Cloudflare Turnstile מוכן לחיבור/);
  assert.match(html, /אין לשלוח סיסמאות, מפתחות API או פרטי גישה/);

  const configResponse = await render("/api/contact");
  assert.equal(configResponse.status, 200);
  assert.deepEqual(await configResponse.json(), { configured: false, turnstileSiteKey: null });
  assert.equal(configResponse.headers.get("cache-control"), "no-store");
});

test("validates and sends a configured contact request through the Worker binding", async () => {
  const sentMessages = [];
  const env = {
    EMAIL: { send: async (message) => { sentMessages.push(message); return { messageId: "test-message" }; } },
    CONTACT_DESTINATION_EMAIL: "owner@example.com",
    CONTACT_FROM_EMAIL: "contact@algotradecrypto.com",
  };
  const response = await render("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost" },
    body: JSON.stringify({
      fullName: "בדיקת מערכת",
      email: "visitor@example.com",
      phone: "050-0000000",
      interest: "custom-development",
      message: "אני רוצה לבדוק התאמה לפיתוח רובוט קריפטו מותאם.",
      website: "",
      privacy: true,
      turnstileToken: "",
    }),
  }, env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(sentMessages.length, 1);
  assert.equal(sentMessages[0].replyTo, "visitor@example.com");
  assert.match(sentMessages[0].text, /פיתוח רובוט קריפטו מותאם/);
});

test("requires a Turnstile token when Cloudflare protection is configured", async () => {
  const response = await render("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost" },
    body: JSON.stringify({ fullName: "בדיקה", email: "visitor@example.com", interest: "other", message: "הודעת בדיקה תקינה לטופס.", privacy: true }),
  }, {
    EMAIL: { send: async () => ({ messageId: "must-not-send" }) },
    CONTACT_DESTINATION_EMAIL: "owner@example.com",
    CONTACT_FROM_EMAIL: "contact@algotradecrypto.com",
    TURNSTILE_SITE_KEY: "test-site-key",
    TURNSTILE_SECRET_KEY: "test-secret-key",
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).message, /אימות האבטחה/);
});

test("keeps the legacy legal and risk pages available", async () => {
  for (const path of [
    "/%D7%90%D7%96%D7%94%D7%A8%D7%AA-%D7%A1%D7%99%D7%9B%D7%95%D7%9F/",
    "/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F-%D7%AA%D7%A0%D7%90%D7%99-%D7%A9%D7%99%D7%9E%D7%95%D7%A9-%D7%95%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%A4%D7%A8%D7%98%D7%99%D7%95%D7%AA/",
  ]) {
    assert.equal((await render(path)).status, 200);
  }
});
