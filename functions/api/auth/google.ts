import { json, signSession, sessionCookie, type Env } from "../../../server/lib";

const WEEK = 60 * 60 * 24 * 7;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { credential } = (await request.json().catch(() => ({}))) as { credential?: string };
  if (!credential) return json({ error: "missing credential" }, 400);

  // Google validates signature + expiry; we validate audience + verified email.
  const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  if (!r.ok) return json({ error: "invalid token" }, 401);
  const p = (await r.json()) as { aud: string; sub: string; email: string; email_verified: string; name?: string; picture?: string };
  if (p.aud !== env.GOOGLE_CLIENT_ID || p.email_verified !== "true") return json({ error: "invalid token" }, 401);

  const id = p.sub;
  await env.DB.prepare(
    "INSERT INTO users (id,email,name,picture) VALUES (?1,?2,?3,?4) ON CONFLICT(id) DO UPDATE SET email=?2,name=?3,picture=?4",
  ).bind(id, p.email.toLowerCase(), p.name ?? p.email, p.picture ?? "").run();

  const token = await signSession(env, { uid: id, exp: Math.floor(Date.now() / 1000) + WEEK });
  return json({ ok: true }, 200, { "set-cookie": sessionCookie(token, WEEK) });
};
