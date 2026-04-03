import { motion } from 'framer-motion';
import { Download, Pencil, Plus, Trash2 } from 'lucide-react';
import { Card } from './Card';
import { EmptyState } from './EmptyState';
import { FiltersBar } from './FiltersBar';
import { SectionHeader } from './SectionHeader';
import { formatCurrency, formatDate } from '../utils/finance';

export function TransactionTable({
  role,
  transactions,
  onAdd,
  onEdit,
  onDelete,
  onExport,
}) {
  return (
    <Card className="p-5 md:p-6">
      <SectionHeader
        eyebrow="Transactions"
        title="Recent financial activity"
        description="Search, filter, and sort transactions to inspect where your cash flow is going."
        action={
          <div className="flex flex-wrap gap-3">
            <button type="button" className="button-secondary" onClick={onExport}>
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            {role === 'admin' ? (
              <button type="button" className="button-primary" onClick={onAdd}>
                <Plus className="h-4 w-4" />
                Add transaction
              </button>
            ) : null}
          </div>
        }
      />

      <div className="mt-6">
        <FiltersBar />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
        {transactions.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No matching transactions"
              description="Try a broader search or reset filters to bring transactions back into view."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900/60">
                <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Note</th>
                  {role === 'admin' ? <th className="px-5 py-4 font-semibold">Actions</th> : null}
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04 } },
                }}
                className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950/40"
              >
                {transactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ backgroundColor: 'rgba(148, 163, 184, 0.08)' }}
                    className="text-sm text-slate-700 transition dark:text-slate-200"
                  >
                    <td className="px-5 py-4">{formatDate(transaction.date)}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          transaction.type === 'income'
                            ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300'
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-200'
                        }`}
                      >
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td
                      className={`px-5 py-4 font-semibold ${
                        transaction.type === 'income'
                          ? 'text-brand-700 dark:text-brand-300'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{transaction.note}</td>
                    {role === 'admin' ? (
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="button-secondary !px-3 hover:!scale-105"
                            onClick={() => onEdit(transaction)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="button-secondary !px-3 !text-orange-600 hover:!scale-105 dark:!text-orange-300"
                            onClick={() => onDelete(transaction.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
