import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { content, type Lang, type Copy } from "./content";

interface Ctx { lang: Lang; t: Copy; path: (p: string) => string; switchPath: string }
const I18n = createContext<Ctx>(null as never);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lang: Lang = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const bare = lang === "es" ? pathname.replace(/^\/es/, "") || "/" : pathname;
  const path = (p: string) => (lang === "es" ? `/es${p === "/" ? "" : p}` || "/es" : p);
  const switchPath = lang === "es" ? bare : `/es${bare === "/" ? "" : bare}`;
  return <I18n.Provider value={{ lang, t: content[lang] as unknown as Copy, path, switchPath }}>{children}</I18n.Provider>;
}
export const useI18n = () => useContext(I18n);
