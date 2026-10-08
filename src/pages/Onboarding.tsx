import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { useAuth } from "../lib/auth";

interface Form { company: string; website: string; industry: string; size: string; phone: string; country: string; services: string[]; goals: string; budget: string; timeline: string; language: string; heard: string }
const empty: Form = { company: "", website: "", industry: "", size: "", phone: "", country: "", services: [], goals: "", budget: "", timeline: "", language: "", heard: "" };

export default function Onboarding() {
  const { t, lang, path } = useI18n();
  const { user, loading } = useAuth();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>({ ...empty, language: lang });
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const o = t.onboarding;
  const set = (k: keyof Form, v: string) => setF((p) => ({ ...p, [k]: v }));

  if (loading) return null;
  if (!user) return <Navigate to={`${path("/login")}?next=${encodeURIComponent(path("/onboarding"))}`} replace />;

  const required: (keyof Form)[][] = [["company", "phone", "country"], ["industry", "size"], ["goals"]];
  const validate = () => {
    const e: Record<string, boolean> = {};
    required[step].forEach((k) => { if (!String(f[k]).trim()) e[k] = true; });
    if (step === 1 && f.services.length === 0) e.services = true;
    setErrs(e); return Object.keys(e).length === 0;
  };
  const next = () => validate() && setStep((s) => s + 1);
  const submit = async () => {
    if (!validate()) return;
    setState("sending");
    try {
      const r = await fetch("/api/onboarding", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(f) });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  };

  if (state === "done") return (
    <section className="page"><div className="col stack">
      <h1 className="d-xl">{o.doneTitle}</h1><p className="lead">{o.doneBody}</p>
      <Link className="btn" to={path("/dashboard")}>{o.toDashboard} →</Link>
    </div></section>
  );

  const field = (k: keyof Form, label: string, type = "text") => (
    <div className="field"><label htmlFor={k}>{label}</label>
      <input id={k} type={type} value={f[k] as string} onChange={(e) => set(k, e.target.value)} />
      {errs[k] && <span className="err">{o.required}</span>}</div>
  );
  const select = (k: keyof Form, label: string, opts: readonly string[]) => (
    <div className="field"><label htmlFor={k}>{label}</label>
      <select id={k} value={f[k] as string} onChange={(e) => set(k, e.target.value)}>
        <option value="">—</option>{opts.map((x) => <option key={x}>{x}</option>)}</select>
      {errs[k] && <span className="err">{o.required}</span>}</div>
  );
  const toggle = (id: string) => setF((p) => ({ ...p, services: p.services.includes(id) ? p.services.filter((x) => x !== id) : [...p.services, id] }));

  return (
    <section className="page"><div className="col">
      <span className="cap">{o.eyebrow}</span>
      <h1 className="d-xl">{o.title}</h1>
      <div className="prog">{o.steps.map((s, i) => <span key={s} className={i <= step ? "on" : ""}>{i + 1} · {s}</span>)}</div>
      <form className="form" onSubmit={(e) => { e.preventDefault(); step < 2 ? next() : void submit(); }}>
        {step === 0 && <>
          <div className="field"><label>Google</label><input value={`${user.name} · ${user.email}`} readOnly /></div>
          {field("company", o.f.company)}
          <div className="row">{field("phone", o.f.phone, "tel")}{field("country", o.f.country)}</div>
          {field("website", o.f.website, "url")}
        </>}
        {step === 1 && <>
          <div className="row">{select("industry", o.f.industry, t.industries)}{select("size", o.f.size, o.sizes)}</div>
          <div className="field"><label>{o.f.services}</label>
            <div className="chips">{t.services.items.map((s) => (
              <button type="button" key={s.id} className={"chip" + (f.services.includes(s.id) ? " on" : "")} aria-pressed={f.services.includes(s.id)} onClick={() => toggle(s.id)}>{s.name}</button>
            ))}</div>
            {errs.services && <span className="err">{o.required}</span>}</div>
        </>}
        {step === 2 && <>
          <div className="field"><label htmlFor="goals">{o.f.goals}</label>
            <textarea id="goals" value={f.goals} onChange={(e) => set("goals", e.target.value)} />
            {errs.goals && <span className="err">{o.required}</span>}</div>
          <div className="row">{select("budget", o.f.budget, o.budgets)}{select("timeline", o.f.timeline, o.timelines)}</div>
          <div className="row">{select("language", o.f.language, ["English", "Español"])}{select("heard", o.f.heard, t.heardFrom)}</div>
        </>}
        {state === "error" && <p className="cap">{o.error}</p>}
        <div className="actions">
          {step > 0 && <button type="button" className="btn" onClick={() => setStep(step - 1)}>← {o.back}</button>}
          <button type="submit" className="btn" disabled={state === "sending"}>{step < 2 ? o.next : o.submit} →</button>
        </div>
      </form>
    </div></section>
  );
}
