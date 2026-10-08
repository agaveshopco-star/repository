import { currentUser, json, type Env } from "../../../server/lib";
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => json({ user: await currentUser(env, request) });
