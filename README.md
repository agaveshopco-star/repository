# agave. — website, onboarding & client dashboard

React + Vite front end, Cloudflare Pages Functions API, D1 database, Google sign-in, optional Notion sync.
Bilingual: English at `/`, Spanish at `/es/`. Design language: black/white, uppercase condensed display type, ghost pill CTAs.

## Structure
- `src/lib/content.ts` — **all copy (EN + ES) and the services list. Edit here.**
- `src/pages` — Home, Login, Onboarding (3 steps), Dashboard (client + admin lead table)
- `functions/api` — `auth/{config,google,me,logout}`, `onboarding`, `dashboard`
- `server/lib.ts` — signed-cookie sessions, Notion client
- `db/schema.sql` — D1 tables (`users`, `onboarding`)

## Setup
1. `npm install`
2. `npx wrangler d1 create agave` → paste the id into `wrangler.toml`; then `npm run db:init`
3. Google Cloud Console → OAuth client (Web). Add `https://agavemkt.com` (and `http://localhost:8788`) as authorised JS origins. Put the client ID in `wrangler.toml` (`GOOGLE_CLIENT_ID`).
4. Secrets: `npx wrangler pages secret put SESSION_SECRET` (long random string); optional `NOTION_TOKEN`.
5. Local: `npm run build && npm run preview` (copy `.dev.vars.example` to `.dev.vars` first).
6. Deploy: `npm run deploy`, or connect the repo in Cloudflare Pages (build `npm run build`, output `dist`), add the D1 binding `DB`, then point `agavemkt.com` at the project.

## Notion (optional — the dashboard is driven from it)
Create two databases, share both with your Notion integration, and set `NOTION_LEADS_DB` / `NOTION_UPDATES_DB` to their IDs.
- **Leads**: Company (title), Contact (text), Email (email), Phone (phone), Website (url), Country (text), Industry/Size/Budget/Timeline/Language/Source (select), Services (multi-select), Goals (text), **Status** (select: Received, In review, Kickoff, Active).
- **Updates**: Title (title), Client Email (email), Body (text), Date (date), Published (checkbox).

Every onboarding submission creates a Leads row. Changing **Status** in Notion moves the client's progress bar; ticking **Published** on an Updates row shows it in that client's dashboard. Admins (`ADMIN_EMAILS`) also see a leads table on `/dashboard`.
