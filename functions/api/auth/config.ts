import { json, type Env } from "../../../server/lib";
export const onRequestGet: PagesFunction<Env> = async ({ env }) => json({ clientId: env.GOOGLE_CLIENT_ID });
