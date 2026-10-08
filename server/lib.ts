export interface Env {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  SESSION_SECRET: string;
  ADMIN_EMAILS?: string;
  NOTION_TOKEN?: string;
  NOTION_LEADS_DB?: string;
  NOTION_UPDATES_DB?: string;
}
export interface Session { uid: string; exp: number }

const enc = new TextEncoder();
const b64u = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const key = (secret: string) => crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

export const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...headers } });

export async function signSession(env: Env, s: Session) {
  const body = b64u(enc.encode(JSON.stringify(s)));
  const sig = await crypto.subtle.sign("HMAC", await key(env.SESSION_SECRET), enc.encode(body));
  return `${body}.${b64u(sig)}`;
}

export async function readSession(env: Env, req: Request): Promise<Session | null> {
  const m = /(?:^|;\s*)agv_session=([^;]+)/.exec(req.headers.get("cookie") || "");
  if (!m || !env.SESSION_SECRET) return null;
  const [body, sig] = m[1].split(".");
  if (!body || !sig) return null;
  const ok = await crypto.subtle.verify("HMAC", await key(env.SESSION_SECRET), unb64u(sig), enc.encode(body));
  if (!ok) return null;
  const s = JSON.parse(new TextDecoder().decode(unb64u(body))) as Session;
  return s.exp > Date.now() / 1000 ? s : null;
}

export const sessionCookie = (v: string, maxAge: number) =>
  `agv_session=${v}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

export interface DbUser { id: string; email: string; name: string; picture: string }
export async function currentUser(env: Env, req: Request): Promise<(DbUser & { isAdmin: boolean }) | null> {
  const s = await readSession(env, req);
  if (!s) return null;
  const u = await env.DB.prepare("SELECT id,email,name,picture FROM users WHERE id=?").bind(s.uid).first<DbUser>();
  if (!u) return null;
  const admins = (env.ADMIN_EMAILS || "").split(",").map((x) => x.trim().toLowerCase());
  return { ...u, isAdmin: admins.includes(u.email.toLowerCase()) };
}

// ---- Notion (optional; skipped when NOTION_TOKEN is not set) ----
const notion = (env: Env, path: string, body?: unknown, method = "POST") =>
  fetch(`https://api.notion.com/v1/${path}`, {
    method, headers: { Authorization: `Bearer ${env.NOTION_TOKEN}`, "Notion-Version": "2022-06-28", "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
const txt = (s: string) => [{ text: { content: (s || "").slice(0, 1900) } }];
const sel = (s: string) => (s ? { select: { name: s.replace(/,/g, " ") } } : { select: null });

export async function notionCreateLead(env: Env, u: DbUser, f: Record<string, any>): Promise<string | null> {
  if (!env.NOTION_TOKEN || !env.NOTION_LEADS_DB) return null;
  const r = await notion(env, "pages", {
    parent: { database_id: env.NOTION_LEADS_DB },
    properties: {
      Company: { title: txt(f.company) },
      Contact: { rich_text: txt(u.name) },
      Email: { email: u.email },
      Phone: { phone_number: f.phone || null },
      Website: { url: f.website || null },
      Country: { rich_text: txt(f.country) },
      Industry: sel(f.industry), Size: sel(f.size), Budget: sel(f.budget), Timeline: sel(f.timeline), Language: sel(f.language), Source: sel(f.heard),
      Services: { multi_select: (f.services as string[]).map((name) => ({ name })) },
      Goals: { rich_text: txt(f.goals) },
      Status: { select: { name: "Received" } },
    },
  });
  if (!r.ok) { console.error("notion create", r.status, await r.text()); return null; }
  return ((await r.json()) as { id: string }).id;
}

export async function notionStatus(env: Env, pageId: string): Promise<string | null> {
  if (!env.NOTION_TOKEN) return null;
  const r = await notion(env, `pages/${pageId}`, undefined, "GET");
  if (!r.ok) return null;
  const p = (await r.json()) as any;
  const name: string | undefined = p.properties?.Status?.select?.name;
  return name ? name.toLowerCase().replace(/\s+/g, "") === "inreview" ? "review" : name.toLowerCase() : null;
}

export async function notionUpdates(env: Env, email: string) {
  if (!env.NOTION_TOKEN || !env.NOTION_UPDATES_DB) return [];
  const r = await notion(env, `databases/${env.NOTION_UPDATES_DB}/query`, {
    filter: { and: [{ property: "Client Email", email: { equals: email } }, { property: "Published", checkbox: { equals: true } }] },
    sorts: [{ property: "Date", direction: "descending" }], page_size: 20,
  });
  if (!r.ok) return [];
  return ((await r.json()) as any).results.map((p: any) => ({
    title: p.properties.Title?.title?.map((t: any) => t.plain_text).join("") ?? "",
    body: p.properties.Body?.rich_text?.map((t: any) => t.plain_text).join("") ?? "",
    date: p.properties.Date?.date?.start ?? "",
  }));
}
