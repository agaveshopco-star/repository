import { Link } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { WHATSAPP } from "../lib/content";
import AgaveCanvas from "../components/AgaveCanvas";

export default function Home() {
  const { t, path } = useI18n();
  return (
    <>
      <section className="band hero">
        <AgaveCanvas />
        <div className="col">
          <span className="cap">{t.hero.eyebrow}</span>
          <h1 className="d-xxl">{t.hero.title}</h1>
          <Link className="btn" to={path("/onboarding")}>{t.hero.cta} →</Link>
        </div>
      </section>

      <section className="band auto soft"><div className="col pad stack">
        <span className="cap">{t.statement.eyebrow}</span>
        <h2 className="d-xl">{t.statement.title}</h2>
        <p className="lead">{t.statement.body}</p>
      </div></section>

      <section id="services" className="band auto"><div className="col pad">
        <span className="cap">{t.services.eyebrow}</span>
        <h2 className="d-xl">{t.services.title}</h2>
        <div className="svc">
          {t.services.items.map((s, i) => (
            <div key={s.id}><span className="cap idx">0{i + 1}</span><h3>{s.name}</h3><p>{s.body}</p></div>
          ))}
        </div>
      </div></section>

      <section id="why" className="band auto soft"><div className="col pad">
        <span className="cap">{t.why.eyebrow}</span>
        <h2 className="d-xl">{t.why.title}</h2>
        <div className="why">{t.why.points.map((p) => <div key={p.k}><h4>{p.k}</h4><p>{p.v}</p></div>)}</div>
      </div></section>

      <section className="band auto"><div className="col pad">
        <span className="cap">{t.process.eyebrow}</span>
        <h2 className="d-xl">{t.process.title}</h2>
        <div className="steps">{t.process.steps.map((s) => <div key={s.n}><div className="n">{s.n}</div><h4>{s.t}</h4><p>{s.b}</p></div>)}</div>
      </div></section>

      <section className="band" style={{ minHeight: "70vh" }}>
        <AgaveCanvas offsetY={0.05} />
        <div className="col" style={{ paddingBottom: 96 }}>
          <div className="stack">
            <h2 className="d-xl">{t.cta.title}</h2>
            <Link className="btn" to={path("/onboarding")}>{t.cta.button} →</Link>
            <a className="link cap" href={WHATSAPP} target="_blank" rel="noopener">{t.cta.whatsapp}</a>
          </div>
        </div>
      </section>
    </>
  );
}
