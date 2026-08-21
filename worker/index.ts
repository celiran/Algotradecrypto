/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  EMAIL?: {
    send(message: {
      to: string;
      from: string;
      subject: string;
      text: string;
      html?: string;
      replyTo?: string;
    }): Promise<{ messageId?: string }>;
  };
  CONTACT_DESTINATION_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  website?: unknown;
  privacy?: unknown;
  turnstileToken?: unknown;
};

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanSingleLine(value: unknown, maxLength: number): string {
  return cleanText(value, maxLength)
    .replaceAll("\r", " ")
    .replaceAll("\n", " ")
    .split("")
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function handleContactRequest(request: Request, env: Env): Promise<Response> {
  const emailConfigured = Boolean(env.EMAIL && env.CONTACT_DESTINATION_EMAIL && env.CONTACT_FROM_EMAIL);
  const turnstileConfigured = Boolean(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);
  const turnstilePartiallyConfigured = Boolean(env.TURNSTILE_SITE_KEY || env.TURNSTILE_SECRET_KEY) && !turnstileConfigured;

  if (request.method === "GET") {
    return json({ configured: emailConfigured && !turnstilePartiallyConfigured, turnstileSiteKey: turnstileConfigured ? env.TURNSTILE_SITE_KEY : null });
  }
  if (request.method !== "POST") return json({ success: false, message: "שיטת הבקשה אינה נתמכת." }, 405);

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== requestUrl.origin) return json({ success: false, message: "מקור הבקשה אינו מורשה." }, 403);
  if (!emailConfigured || turnstilePartiallyConfigured) return json({ success: false, message: "שליחת הפניות עדיין לא הוגדרה ב־Cloudflare." }, 503);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ success: false, message: "פורמט הבקשה אינו נתמך." }, 415);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 25_000) return json({ success: false, message: "ההודעה ארוכה מדי." }, 413);

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 25_000) return json({ success: false, message: "ההודעה ארוכה מדי." }, 413);
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return json({ success: false, message: "לא ניתן לקרוא את הבקשה." }, 400);
  }

  // Bots commonly complete hidden fields. Return success without sending so the trap is not disclosed.
  if (cleanText(payload.website, 200)) return json({ success: true });

  const fullName = cleanSingleLine(payload.fullName, 80);
  const email = cleanSingleLine(payload.email, 160).toLowerCase();
  const phone = cleanSingleLine(payload.phone, 30);
  const interest = cleanSingleLine(payload.interest, 40);
  const message = cleanText(payload.message, 3000).replaceAll("\0", "");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const interestLabels: Record<string, string> = {
    learning: "לימוד ופיתוח עצמאי",
    "ready-system": "בחירת מערכת קריפטו מוכנה",
    "custom-development": "פיתוח רובוט קריפטו מותאם",
    partnership: "שיתוף פעולה",
    other: "נושא אחר",
  };

  if (fullName.length < 2 || !emailPattern.test(email) || !interestLabels[interest] || message.length < 10 || payload.privacy !== true) {
    return json({ success: false, message: "יש להשלים שם, כתובת מייל, נושא, הודעה ואישור מדיניות פרטיות." }, 400);
  }

  if (turnstileConfigured) {
    const token = cleanText(payload.turnstileToken, 2048);
    if (!token) return json({ success: false, message: "יש להשלים את אימות האבטחה." }, 400);
    const verificationBody = new FormData();
    verificationBody.set("secret", env.TURNSTILE_SECRET_KEY!);
    verificationBody.set("response", token);
    verificationBody.set("idempotency_key", crypto.randomUUID());
    const remoteIp = request.headers.get("CF-Connecting-IP");
    if (remoteIp) verificationBody.set("remoteip", remoteIp);

    try {
      const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: verificationBody, signal: AbortSignal.timeout(10_000) });
      const verification = (await verificationResponse.json()) as { success?: boolean; action?: string; hostname?: string };
      if (!verification.success || verification.action !== "contact_form" || verification.hostname !== requestUrl.hostname) {
        return json({ success: false, message: "אימות האבטחה נכשל. רעננו את האימות ונסו שוב." }, 400);
      }
    } catch {
      return json({ success: false, message: "שירות אימות האבטחה אינו זמין כרגע. נסו שוב בעוד כמה דקות." }, 502);
    }
  }

  try {
    const submittedAt = new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
    const interestLabel = interestLabels[interest];
    const plainText = [
      "פנייה חדשה מטופס יצירת הקשר באתר AlgoTradeCrypto",
      "===============================================",
      "",
      `שם מלא: ${fullName}`,
      `מייל לחזרה: ${email}`,
      `טלפון: ${phone || "לא נמסר"}`,
      `נושא הפנייה: ${interestLabel}`,
      `נשלח בתאריך: ${submittedAt}`,
      "",
      "--- תוכן הפנייה ---",
      message,
      "--- סוף תוכן הפנייה ---",
    ].join("\n");
    const html = `<!doctype html>
<html lang="he" dir="rtl">
  <body style="margin:0;background:#f3f7f5;color:#102b31;font-family:Arial,sans-serif;direction:rtl;text-align:right">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f7f5;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #c8d8d1;border-top:5px solid #168461">
          <tr><td style="padding:28px 32px 18px">
            <div style="font-size:12px;letter-spacing:.08em;color:#168461;font-weight:700">ALGOTRADECRYPTO / CONTACT</div>
            <h1 style="margin:10px 0 0;font-size:26px;line-height:1.35;color:#102b31">פנייה חדשה מהאתר</h1>
          </td></tr>
          <tr><td style="padding:0 32px 24px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;line-height:1.7">
              <tr><td style="width:130px;padding:7px 0;color:#61766f">שם מלא</td><td style="padding:7px 0;font-weight:700">${escapeHtml(fullName)}</td></tr>
              <tr><td style="padding:7px 0;color:#61766f">מייל לחזרה</td><td style="padding:7px 0"><a href="mailto:${escapeHtml(email)}" style="color:#08795d;font-weight:700">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:7px 0;color:#61766f">טלפון</td><td style="padding:7px 0">${escapeHtml(phone || "לא נמסר")}</td></tr>
              <tr><td style="padding:7px 0;color:#61766f">נושא הפנייה</td><td style="padding:7px 0">${escapeHtml(interestLabel)}</td></tr>
              <tr><td style="padding:7px 0;color:#61766f">מועד השליחה</td><td style="padding:7px 0">${escapeHtml(submittedAt)}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:0 32px 32px">
            <div style="margin-bottom:9px;font-size:13px;color:#168461;font-weight:700">תוכן הפנייה</div>
            <div style="padding:20px;background:#eef5f1;border-right:4px solid #4ef2b1;font-size:17px;line-height:1.85;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(message)}</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

    await env.EMAIL!.send({
      to: env.CONTACT_DESTINATION_EMAIL!,
      from: env.CONTACT_FROM_EMAIL!,
      replyTo: email,
      subject: `פנייה חדשה מ־AlgoTradeCrypto — ${fullName}`,
      text: plainText,
      html,
    });
    return json({ success: true });
  } catch {
    return json({ success: false, message: "לא הצלחנו לשלוח את הפנייה כרגע. נסו שוב בעוד כמה דקות." }, 502);
  }
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "www.algotradecrypto.com") {
      url.hostname = "algotradecrypto.com";
      return Response.redirect(url, 308);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/contact") {
      return handleContactRequest(request, env);
    }

    const response = await handler.fetch(request, env, ctx);
    const isProductionHost = url.hostname === "algotradecrypto.com" || url.hostname === "www.algotradecrypto.com";
    if (isProductionHost) return response;

    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};

export default worker;
