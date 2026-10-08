import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { useAuth } from "../lib/auth";
import { WHATSAPP } from "../lib/content";

export default function Layout() {
  const { t, lang, path, switchPath } = useI18n();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const home = pathname === "/" || pathname === "/es" || pathname === "/es/";
  const anchor = (id: string) => (home ? `#${id}` : `${path("/")}#${id}`);
  document.documentElement.lang = lang;

  const links = (
    <>
      <a href={anchor("services")} onClick={() => setOpen(false)}>{t.nav.services}</a>
      <a href={anchor("why")} onClick={() => setOpen(false)}>{t.nav.why}</a>
      <Link to={path("/onboarding")} onClick={() => setOpen(false)}>{t.nav.onboarding}</Link>
      <a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp</a>
    </>
  );
  return (
    <>
      <header className="hdr">
        <Link to={path("/")} className="logo">agave<span>.</span></Link>
        <nav className="nav">{links}</nav>
        <div className="hdr-right">
          <Link to={path(user ? "/dashboard" : "/login")} className="pill-sm hide-m">{user ? t.nav.dashboard : t.nav.signin}</Link>
          <Link to={switchPath} className="pill-sm">{lang === "en" ? "ES" : "EN"}</Link>
          <button className="burger" aria-expanded={open} onClick={() => setOpen(true)}>{t.nav.menu}</button>
        </div>
      </header>
      {open && (
        <div className="menu">
          <button className="x" onClick={() => setOpen(false)}>{t.nav.close}</button>
          {links}
          <Link to={path(user ? "/dashboard" : "/login")} onClick={() => setOpen(false)}>{user ? t.nav.dashboard : t.nav.signin}</Link>
        </div>
      )}
      <main><Outlet /></main>
      <footer className="ftr">
        <div className="col">
          <span>© {new Date().getFullYear()} agave. {t.footer.rights}</span>
          <div className="links">
            <a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp</a>
            <Link to={path("/onboarding")}>{t.nav.onboarding}</Link>
            <Link to={path("/dashboard")}>{t.nav.dashboard}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
