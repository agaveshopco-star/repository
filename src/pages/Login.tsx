import { Navigate, useSearchParams } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { useAuth } from "../lib/auth";
import GoogleButton from "../components/GoogleButton";

export default function Login() {
  const { t, path } = useI18n();
  const { user, loading } = useAuth();
  const [q] = useSearchParams();
  if (!loading && user) return <Navigate to={q.get("next") || path("/dashboard")} replace />;
  return (
    <section className="page"><div className="col stack">
      <span className="cap">{t.login.eyebrow}</span>
      <h1 className="d-xl">{t.login.title}</h1>
      <p className="lead">{t.login.body}</p>
      <GoogleButton />
      <p className="cap" style={{ color: "var(--mute)" }}>{t.login.note}</p>
    </div></section>
  );
}
