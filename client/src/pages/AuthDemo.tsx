import React, { useEffect, useState } from "react";

type DemoUser = {
  name: string;
  email: string;
  avatarUrl: string;
};

const STORAGE_KEY = "pokedex-demo-user";

export const AuthDemo: React.FC = () => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load "logged in" user from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    // This simulates a successful OAuth login (Google/GitHub style)
    const fakeUser: DemoUser = {
      name: "Demo User",
      email: "demo@example.com",
      avatarUrl:
        "https://avatars.githubusercontent.com/u/583231?v=4", // any avatar
    };
    setUser(fakeUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex min-h-[calc(100vh-40px)] items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 shadow-md">
        <h1 className="text-lg font-semibold text-center">OAuth Demo</h1>
        <p className="text-xs text-muted-foreground text-center">
          Simple Google-style login proof-of-concept
        </p>

        {loading && (
          <p className="text-sm text-muted-foreground text-center">
            Loading…
          </p>
        )}

        {!loading && !user && (
          <button
            type="button"
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow"
          >
            <span className="text-lg">🔐</span>
            <span>Continue with Google (demo)</span>
          </button>
        )}

        {!loading && user && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-muted"
            >
              Sign out
            </button>
          </div>
        )}

        <p className="text-[11px] text-center text-muted-foreground">
          Frontend-only login demo that mimics an OAuth flow and persists the
          session using localStorage.
        </p>
      </div>
    </div>
  );
};
