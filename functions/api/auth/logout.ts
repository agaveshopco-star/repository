import { json, sessionCookie, type Env } from "../../../server/lib";
export const onRequestPost: PagesFunction<Env> = async () => json({ ok: true }, 200, { "set-cookie": sessionCookie("", 0) });
