// waitlist-welcome: sends a one-time welcome email after a waitlist sign-up.
// Called fire-and-forget from /waitlist right after a successful INSERT.
// Anti-abuse: only sends if the email actually exists in the waitlist table and
// was added in the last few minutes (i.e. a genuine fresh sign-up).
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") ?? "";

const FROM_EMAIL = "noreply@babilfinance.com";
const FROM_NAME = "Babil";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Only these origins may call the function from a browser.
const ALLOWED_ORIGINS = new Set([
  "https://babilfinance.com",
  "https://www.babilfinance.com",
  "http://localhost:5176",
]);

function corsHeaders(origin: string): Record<string, string> {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://babilfinance.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

const WELCOME_SUBJECT = "You are on the Babil waitlist";

const WELCOME_TEXT =
  "Hi,\n\n" +
  "Thanks for joining the Babil waitlist. Babil is a personal finance tracker " +
  "that helps you understand your spending, earnings, and habits at a glance.\n\n" +
  "We have saved your spot. When Babil launches, you will be among the first to know.\n\n" +
  "Talk soon,\nThe Babil team\nhttps://babilfinance.com";

// Table-based layout: email clients (notably Gmail) ignore <body> backgrounds,
// so the dark color is set with bgcolor + inline styles on the outer table cell.
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const WELCOME_HTML = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#0D1117;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0D1117" style="background-color:#0D1117;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:480px;background-color:#161B2C;border-radius:16px;border:1px solid #1E2640;">
            <tr>
              <td style="padding:32px 28px;font-family:${FONT};color:#C7CEDB;">
                <div style="font-size:22px;font-weight:800;color:#FFB547;margin-bottom:20px;">Babil</div>
                <h1 style="font-size:22px;color:#FFFFFF;margin:0 0 14px;">You are on the waitlist</h1>
                <p style="font-size:15px;line-height:1.6;margin:0 0 14px;color:#C7CEDB;">
                  Thanks for joining the Babil waitlist. Babil is a personal finance tracker that
                  helps you understand your spending, earnings, and habits at a glance.
                </p>
                <p style="font-size:15px;line-height:1.6;margin:0 0 24px;color:#C7CEDB;">
                  We have saved your spot. When Babil launches, you will be among the first to know.
                </p>
                <a href="https://babilfinance.com"
                   style="display:inline-block;background-color:#6C63FF;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:12px;">
                  Visit babilfinance.com
                </a>
                <p style="font-size:12px;color:#5A6478;line-height:1.6;margin:28px 0 0;">
                  You are receiving this because you signed up at babilfinance.com/waitlist.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("Origin") ?? "";

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, origin);
  if (!BREVO_API_KEY) return json({ error: "email_not_configured" }, 500, origin);

  let payload: Record<string, unknown>;
  try { payload = await req.json(); } catch { return json({ error: "bad_json" }, 400, origin); }

  const email = String(payload?.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return json({ error: "invalid_email" }, 400, origin);

  // Confirm this is a genuine, recent sign-up before sending anything.
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("waitlist")
    .select("email, created_at")
    .eq("email", email)
    .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
    .limit(1);

  if (error) return json({ error: "db_error" }, 500, origin);
  if (!data || data.length === 0) {
    // Not a recent sign-up: silently accept so we never leak list membership.
    return json({ ok: true, skipped: "no_recent_signup" }, 200, origin);
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email }],
      subject: WELCOME_SUBJECT,
      htmlContent: WELCOME_HTML,
      textContent: WELCOME_TEXT,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return json({ error: "send_failed", status: res.status, detail }, 502, origin);
  }
  return json({ ok: true }, 200, origin);
});
