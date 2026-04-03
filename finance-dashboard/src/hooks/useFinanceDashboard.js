import { useMemo } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import {
  buildBalanceTrend,
  buildExpenseBreakdown,
  calculateInsights,
  calculateSummary,
} from '../utils/finance';

export function useFinanceDashboard() {
  const transactions = useFinanceStore((state) => state.transactions);
  const filters = useFinanceStore((state) => state.filters);
  const loading = useFinanceStore((state) => state.loading);
  const getVisibleTransactions = useFinanceStore((state) => state.getVisibleTransactions);

  const visibleTransactions = useMemo(
    () => getVisibleTransactions(),
    [getVisibleTransactions, filters, transactions],
  );
  const summary = useMemo(() => calculateSummary(transactions), [transactions]);
  const trendData = useMemo(() => buildBalanceTrend(transactions), [transactions]);
  const breakdownData = useMemo(() => buildExpenseBreakdown(transactions), [transactions]);
  const insights = useMemo(() => calculateInsights(transactions), [transactions]);

  return {
    loading,
    summary,
    trendData,
    breakdownData,
    insights,
    visibleTransactions,
  };
}
