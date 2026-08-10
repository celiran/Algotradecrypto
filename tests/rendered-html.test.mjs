import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(path = "/") {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(url.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Signal Glass home page in Hebrew", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /הדרך שלך למסחר אוטומטי/);
  assert.match(html, /מערכות מוכנות/);
  assert.match(html, /תחת בנייה/);
  assert.match(html, /AlgoTradeCrypto/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("keeps the legacy blog index available", async () => {
  const response = await render("/blog-2/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /מרכז הידע/);
  assert.match(html, /פיתוח רובוטים בקריפטו/);
});
