import { BarChart3, Landmark, ShieldCheck, Sparkles } from 'lucide-react';

export function AppShell({ children, toolbar }) {
  return (
    <div className="min-h-full bg-mesh dark:bg-mesh-dark">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="glass-panel mb-6 overflow-hidden px-6 py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-3xl bg-slate-900 p-3 text-white shadow-lg dark:bg-brand-500 dark:text-slate-950">
                <Landmark className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow">Finance Dashboard</p>
                  <span className="soft-chip">
                    <Sparkles className="h-3.5 w-3.5" />
                    Interactive UI
                  </span>
                </div>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Clear cash flow, sharper decisions.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Monitor balances, spot spending patterns, and manage transactions from one clean workspace.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">{toolbar}</div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.3fr_0.8fr]">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-900/5 px-4 py-3 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
              <BarChart3 className="h-4 w-4" />
              The data layer is mock-driven and persisted locally for a backend-free prototype.
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4" />
              Responsive layout with role-based actions and theme support.
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
