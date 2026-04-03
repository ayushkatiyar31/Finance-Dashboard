import { useState } from 'react';
import { DownloadCloud } from 'lucide-react';
import { BalanceTrendChart } from '../components/charts/BalanceTrendChart';
import { ExpenseBreakdownChart } from '../components/charts/ExpenseBreakdownChart';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/Card';
import { ChartLegend } from '../components/ChartLegend';
import { InsightsPanel } from '../components/InsightsPanel';
import { LoadingState } from '../components/LoadingState';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { SectionHeader } from '../components/SectionHeader';
import { SummaryCard } from '../components/SummaryCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionTable } from '../components/TransactionTable';
import { useFinanceDashboard } from '../hooks/useFinanceDashboard';
import { useFinanceStore } from '../store/useFinanceStore';
import { exportTransactionsToCsv, formatCurrency } from '../utils/finance';
import { saveAs } from '../utils/saveAs';

export function DashboardPage() {
  const role = useFinanceStore((state) => state.role);
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const selectedTransaction = useFinanceStore((state) => state.selectedTransaction);
  const setSelectedTransaction = useFinanceStore((state) => state.setSelectedTransaction);
  const transactions = useFinanceStore((state) => state.transactions);

  const { loading, summary, trendData, breakdownData, insights, visibleTransactions } =
    useFinanceDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = () => {
    const csvContent = exportTransactionsToCsv(visibleTransactions);
    saveAs(csvContent, 'transactions.csv', 'text/csv;charset=utf-8;');
  };

  const openCreateModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleSubmitTransaction = (transaction) => {
    if (transaction.id) {
      updateTransaction(transaction);
      return;
    }

    addTransaction(transaction);
  };

  if (loading) {
    return (
      <AppShell
        toolbar={
          <>
            <RoleSwitcher />
            <ThemeToggle />
          </>
        }
      >
        <LoadingState />
      </AppShell>
    );
  }

  return (
    <AppShell
      toolbar={
        <>
          <RoleSwitcher />
          <ThemeToggle />
        </>
      }
    >
      <div className="grid gap-6">
        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">Workspace</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  Financial activity at a glance
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Review balances, compare spending patterns, and take action from a single dashboard flow.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="soft-chip">{transactions.length} transactions</span>
                <span className="soft-chip">Role: {role}</span>
              </div>
            </div>
          </Card>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-soft dark:border-slate-800 dark:from-brand-500 dark:to-brand-600 dark:text-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70 dark:text-slate-900/70">
                  Savings Snapshot
                </p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight">
                  {formatCurrency(insights.totalSavings)}
                </h3>
                <p className="mt-2 text-sm text-white/75 dark:text-slate-900/75">
                  Current net savings based on all tracked entries.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold dark:bg-slate-950/10">
                Live
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            value={summary.totalBalance}
            delta={`${transactions.length} tracked transactions`}
            type="balance"
          />
          <SummaryCard
            title="Total Income"
            value={summary.totalIncome}
            delta="All recorded incoming cash flow"
            type="income"
          />
          <SummaryCard
            title="Total Expenses"
            value={summary.totalExpenses}
            delta="All recorded outgoing payments"
            type="expenses"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
          <Card className="p-5 md:p-6">
            <SectionHeader
              eyebrow="Overview"
              title="Balance trend"
              description="Track how your running balance shifts over time as income and expenses land."
            />
            <div className="mt-6">
              <BalanceTrendChart data={trendData} />
            </div>
          </Card>

          <Card className="p-5 md:p-6">
            <SectionHeader
              eyebrow="Breakdown"
              title="Expense mix"
              description="Understand which categories are taking the biggest share of spend."
            />
            <div className="mt-6">
              <ExpenseBreakdownChart data={breakdownData} />
            </div>
            <div className="mt-4">
              <ChartLegend items={breakdownData} />
            </div>
          </Card>
        </section>

        <section className="grid gap-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Smart summaries for quick decisions
              </h2>
            </div>
            <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 md:flex">
              <DownloadCloud className="h-4 w-4" />
              Savings: {formatCurrency(insights.totalSavings)}
            </div>
          </div>

          <InsightsPanel insights={insights} />
        </section>

        <section>
          <TransactionTable
            role={role}
            transactions={visibleTransactions}
            onAdd={openCreateModal}
            onEdit={openEditModal}
            onDelete={deleteTransaction}
            onExport={handleExport}
          />
        </section>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitTransaction}
        initialValue={selectedTransaction}
      />
    </AppShell>
  );
}
