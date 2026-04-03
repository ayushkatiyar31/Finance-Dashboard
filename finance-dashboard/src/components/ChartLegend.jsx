import { formatCurrency } from '../utils/finance';

const COLORS = ['#16a34a', '#0f766e', '#f59e0b', '#f97316', '#334155', '#14b8a6', '#84cc16'];

export function ChartLegend({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm dark:bg-slate-800/70 dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full transition duration-200 hover:scale-125"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">{formatCurrency(item.value)}</span>
        </div>
      ))}
    </div>
  );
}
