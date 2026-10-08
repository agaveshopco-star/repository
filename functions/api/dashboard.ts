import { currentUser, json, notionStatus, notionUpdates, type Env } from "../../server/lib";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const u = await currentUser(env, request);
  if (!u) return json({ error: "unauthorized" }, 401);

  let row = await env.DB.prepare("SELECT * FROM onboarding WHERE user_id=?").bind(u.id).first<any>();
  if (row?.notion_page_id) {
    // Notion is the source of truth for status: change it in Notion and the client's dashboard follows.
    const s = await notionStatus(env, row.notion_page_id);
    if (s && s !== row.status) {
      await env.DB.prepare("UPDATE onboarding SET status=? WHERE user_id=?").bind(s, u.id).run();
      row = { ...row, status: s };
    }
  }
  const updates = await notionUpdates(env, u.email);
  const onboarding = row ? { ...row, services: JSON.parse(row.services || "[]") } : null;

  let leads;
  if (u.isAdmin) {
    leads = (await env.DB.prepare(
      "SELECT o.company, u.email, o.status, o.created_at FROM onboarding o JOIN users u ON u.id=o.user_id ORDER BY o.created_at DESC LIMIT 100",
    ).all()).results;
  }
  return json({ onboarding, updates, leads });
};
