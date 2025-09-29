import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as apiLogin, type AuthResponse } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: Omit<AuthResponse, "token"> | null;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = "hackhub_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return { token: null, user: null };
      const parsed = JSON.parse(raw) as AuthResponse;
      return {
        token: parsed.token ?? null,
        user: parsed
          ? {
              userId: parsed.userId,
              name: parsed.name ?? null,
              email: parsed.email ?? null,
              role: parsed.role ?? null,
            }
          : null,
      };
    } catch {
      return { token: null, user: null };
    }
  });

  useEffect(() => {
    if (auth.token) {
      const payload: AuthResponse = {
        userId: auth.user?.userId || "",
        name: auth.user?.name ?? null,
        email: auth.user?.email ?? null,
        role: auth.user?.role ?? null,
        token: auth.token,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [auth]);

  const doLogin = async (email: string, password: string) => {
    const res = await apiLogin({ email, password });
    setAuth({
      token: res.token ?? null,
      user: {
        userId: res.userId,
        name: res.name ?? null,
        email: res.email ?? null,
        role: res.role ?? null,
      },
    });
  };

  const logout = () => setAuth({ token: null, user: null });

  const value = useMemo<AuthContextValue>(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      login: doLogin,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

