import { currentUser, json, notionCreateLead, type Env } from "../../server/lib";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const u = await currentUser(env, request);
  if (!u) return json({ error: "unauthorized" }, 401);
  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return json({ error: "bad request" }, 400);

  const f = {
    company: str(b.company, 120), website: str(b.website, 200), industry: str(b.industry, 80), size: str(b.size, 40),
    phone: str(b.phone, 40), country: str(b.country, 80), goals: str(b.goals, 2000), budget: str(b.budget, 60),
    timeline: str(b.timeline, 60), language: str(b.language, 20), heard: str(b.heard, 60),
    services: Array.isArray(b.services) ? b.services.filter((x): x is string => typeof x === "string").slice(0, 12).map((x) => x.slice(0, 40)) : [],
  };
  if (!f.company || !f.phone || !f.country || !f.goals || f.services.length === 0) return json({ error: "missing fields" }, 400);
  if (f.website && !/^https?:\/\//i.test(f.website)) f.website = `https://${f.website}`;

  const existing = await env.DB.prepare("SELECT notion_page_id FROM onboarding WHERE user_id=?").bind(u.id).first<{ notion_page_id: string | null }>();
  const notionId = existing?.notion_page_id ?? (await notionCreateLead(env, u, f));

  await env.DB.prepare(
    `INSERT INTO onboarding (user_id,company,website,industry,size,phone,country,services,goals,budget,timeline,language,heard_from,notion_page_id)
     VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14)
     ON CONFLICT(user_id) DO UPDATE SET company=?2,website=?3,industry=?4,size=?5,phone=?6,country=?7,services=?8,goals=?9,budget=?10,timeline=?11,language=?12,heard_from=?13,notion_page_id=COALESCE(?14,notion_page_id)`,
  ).bind(u.id, f.company, f.website, f.industry, f.size, f.phone, f.country, JSON.stringify(f.services), f.goals, f.budget, f.timeline, f.language, f.heard, notionId).run();

  return json({ ok: true });
};
