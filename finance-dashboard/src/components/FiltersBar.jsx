import { Funnel, RotateCcw, Search } from 'lucide-react';
import { transactionCategories } from '../data/mockTransactions';
import { useFinanceStore } from '../store/useFinanceStore';

export function FiltersBar() {
  const filters = useFinanceStore((state) => state.filters);
  const updateFilters = useFinanceStore((state) => state.updateFilters);
  const resetFilters = useFinanceStore((state) => state.resetFilters);

  return (
    <div className="grid gap-3 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))_auto]">
      <label className="input-shell cursor-text">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search category or note"
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
          value={filters.search}
          onChange={(event) => updateFilters({ search: event.target.value })}
        />
      </label>

      <label className="input-shell cursor-pointer">
        <Funnel className="h-4 w-4 text-slate-400" />
        <select
          aria-label="Filter by type"
          className="w-full cursor-pointer bg-transparent outline-none"
          value={filters.type}
          onChange={(event) => updateFilters({ type: event.target.value })}
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="input-shell cursor-pointer">
        <select
          aria-label="Filter by category"
          className="w-full cursor-pointer bg-transparent outline-none"
          value={filters.category}
          onChange={(event) => updateFilters({ category: event.target.value })}
        >
          <option value="all">All categories</option>
          {transactionCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="input-shell cursor-pointer">
        <select
          aria-label="Sort transactions"
          className="w-full cursor-pointer bg-transparent outline-none"
          value={filters.sortBy}
          onChange={(event) => updateFilters({ sortBy: event.target.value })}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </label>

      <button type="button" className="button-secondary" onClick={resetFilters}>
        <RotateCcw className="h-4 w-4" />
        Reset
      </button>
    </div>
  );
}
