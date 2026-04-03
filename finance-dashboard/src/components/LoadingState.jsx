export function LoadingState() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-3xl bg-white/70 shadow-soft dark:bg-slate-900/80"
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="h-[360px] animate-pulse rounded-3xl bg-white/70 shadow-soft dark:bg-slate-900/80" />
        <div className="h-[360px] animate-pulse rounded-3xl bg-white/70 shadow-soft dark:bg-slate-900/80" />
      </div>
      <div className="h-[420px] animate-pulse rounded-3xl bg-white/70 shadow-soft dark:bg-slate-900/80" />
    </div>
  );
}
