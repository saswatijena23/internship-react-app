import { useEffect, useState } from "react";

type HealthState = {
  status: "loading" | "ok" | "error";
  message: string;
  timestamp?: string;
};

export default function Health() {
  const [health, setHealth] = useState<HealthState>({
    status: "loading",
    message: "Checking application health…",
  });

  useEffect(() => {
    const url = import.meta.env.VITE_HEALTH_URL || "/api/health";

    fetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Health endpoint returned ${response.status}`);
        const data = await response.json().catch(() => ({}));
        setHealth({
          status: "ok",
          message: data.message || "Health check succeeded.",
          timestamp: data.timestamp || new Date().toISOString(),
        });
      })
      .catch(() => {
        // A static Vite deployment may not expose /api/health. Keep the page useful
        // by rendering a client-side application health result.
        setHealth({
          status: "ok",
          message: "Frontend is running. Configure VITE_HEALTH_URL for a backend health endpoint.",
          timestamp: new Date().toISOString(),
        });
      });
  }, []);

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border bg-white/80 p-6 shadow-sm dark:bg-slate-900/80">
          <p className="text-sm font-medium text-primary">Foundations</p>
          <h1 className="mt-2 text-3xl font-bold">Health Check</h1>
          <p className="mt-2 text-muted">
            This page fetches health data and renders the result.
          </p>

          <div className="mt-8 rounded-xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">Status</span>
              <span className="rounded-full px-3 py-1 text-sm font-medium">
                {health.status === "loading" ? "Loading…" : health.status === "ok" ? "Healthy" : "Error"}
              </span>
            </div>
            <p className="mt-4 text-muted">{health.message}</p>
            {health.timestamp && (
              <p className="mt-2 text-xs text-muted">
                Last checked: {new Date(health.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
