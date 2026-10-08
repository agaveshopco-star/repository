import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { useAuth } from "../lib/auth";
import { WHATSAPP } from "../lib/content";

interface Data {
  onboarding: null | { company: string; website: string; industry: string; size: string; phone: string; country: string; services: string[]; goals: string; budget: string; timeline: string; status: string; created_at: string };
  updates: { title: string; body: string; date: string }[];
  leads?: { company: string; email: string; status: string; created_at: string }[];
}
const ORDER = ["received", "review", "kickoff", "active"] as const;

export default function Dashboard() {
  const { t, path } = useI18n();
  const { user, loading, logout } = useAuth();
  const [d, setD] = useState<Data | null>(null);
  useEffect(() => { if (user) fetch("/api/dashboard").then((r) => r.json()).then((j) => setD(j as Data)).catch(() => setD({ onboarding: null, updates: [] })); }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to={`${path("/login")}?next=${encodeURIComponent(path("/dashboard"))}`} replace />;
  const x = t.dashboard, ob = d?.onboarding;
  const idx = ob ? ORDER.indexOf(ob.status as (typeof ORDER)[number]) : -1;
  const svcName = (id: string) => t.services.items.find((s) => s.id === id)?.name ?? id;

  return (
    <section className="page"><div className="col">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div><span className="cap">{x.eyebrow}</span><h1 className="d-lg">{x.hello}, {user.name.split(" ")[0]}</h1></div>
        <div className="actions" style={{ alignItems: "center" }}>
          {user.picture && <img className="avatar" src={user.picture} alt="" referrerPolicy="no-referrer" />}
          <button className="btn" onClick={() => void logout()}>{x.signout}</button>
        </div>
      </div>

      {d && !ob && <div className="panel" style={{ marginTop: 48, alignItems: "flex-start" }}>
        <p>{x.notOnboarded}</p><Link className="btn" to={path("/onboarding")}>{x.complete} →</Link></div>}

      {ob && <div className="dash">
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="panel"><h3>{x.steps}</h3>
            <div className="timeline">{ORDER.map((s, i) => <div key={s} className={i <= idx ? "on" : ""}>{x.statuses[s]}</div>)}</div></div>
          <div className="panel"><h3>{x.updates}</h3>
            {d!.updates.length === 0 ? <p style={{ color: "var(--mute)" }}>{x.noUpdates}</p> :
              d!.updates.map((u, i) => <div className="upd" key={i}><small>{u.date}</small><h4>{u.title}</h4><p>{u.body}</p></div>)}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="panel"><h3>{x.profile}</h3>
            <dl className="kv">
              <dt>{x.company}</dt><dd>{ob.company}</dd>
              <dt>{x.status}</dt><dd>{x.statuses[ob.status as keyof typeof x.statuses]}</dd>
              <dt>{x.services}</dt><dd>{ob.services.map(svcName).join(", ")}</dd>
            </dl>
            <Link className="btn" to={path("/onboarding")}>{x.edit}</Link>
            <a className="btn" href={WHATSAPP} target="_blank" rel="noopener">{x.contact}</a></div>
        </div>
      </div>}

      {d?.leads && <div className="panel" style={{ marginTop: 32 }}><h3>{x.admin}</h3>
        <table><thead><tr><th>{x.company}</th><th>{x.email}</th><th>{x.status}</th><th>{x.date}</th></tr></thead>
          <tbody>{d.leads.map((l, i) => <tr key={i}><td>{l.company}</td><td>{l.email}</td><td>{l.status}</td><td>{l.created_at.slice(0, 10)}</td></tr>)}</tbody></table></div>}
    </div></section>
  );
}
