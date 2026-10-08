import { useEffect, useRef, useState } from "react";
import { useAuth } from "../lib/auth";
import { useI18n } from "../lib/i18n";

declare global { interface Window { google?: any } }

export default function GoogleButton({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { refresh } = useAuth();
  const { lang } = useI18n();
  const [err, setErr] = useState("");

  useEffect(() => {
    let dead = false;
    (async () => {
      const cfg = (await (await fetch("/api/auth/config")).json()) as { clientId: string };
      if (!window.google) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://accounts.google.com/gsi/client"; s.async = true;
          s.onload = () => res(); s.onerror = () => rej(new Error("gsi"));
          document.head.appendChild(s);
        });
      }
      if (dead || !ref.current) return;
      window.google.accounts.id.initialize({
        client_id: cfg.clientId,
        callback: async (resp: { credential: string }) => {
          const r = await fetch("/api/auth/google", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ credential: resp.credential }) });
          if (!r.ok) return setErr("Login failed");
          await refresh(); onDone?.();
        },
      });
      window.google.accounts.id.renderButton(ref.current, { theme: "filled_black", shape: "pill", size: "large", text: "continue_with", locale: lang });
    })().catch(() => setErr("Could not load Google sign-in"));
    return () => { dead = true; };
  }, [lang, refresh, onDone]);

  return <div><div ref={ref} className="gbtn" />{err && <p className="cap" style={{ marginTop: 8 }}>{err}</p>}</div>;
}
