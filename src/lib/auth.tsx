import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type User = { name: string; handle: string };

type AuthValue = {
  user: User | null;
  ready: boolean;
  signIn: (name: string, handle: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  ready: false,
  signIn: () => {},
  signOut: () => {},
});

const KEY = "buzzboard.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      signIn: (name, handle) => {
        const next = { name, handle };
        setUser(next);
        localStorage.setItem(KEY, JSON.stringify(next));
      },
      signOut: () => {
        setUser(null);
        localStorage.removeItem(KEY);
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
