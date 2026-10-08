import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export interface User { id: string; email: string; name: string; picture: string; isAdmin: boolean }
interface Ctx { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> }
const Auth = createContext<Ctx>(null as never);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/auth/me");
      setUser(r.ok ? ((await r.json()) as { user: User | null }).user : null);
    } catch { setUser(null); }
    setLoading(false);
  }, []);
  const logout = useCallback(async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return <Auth.Provider value={{ user, loading, refresh, logout }}>{children}</Auth.Provider>;
}
export const useAuth = () => useContext(Auth);
