import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { transactionCategories } from '../data/mockTransactions';

const initialFormState = {
  date: new Date().toISOString().slice(0, 10),
  amount: '',
  category: 'Food',
  type: 'expense',
  note: '',
};

export function TransactionModal({ isOpen, onClose, onSubmit, initialValue }) {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (initialValue) {
      setForm({
        date: initialValue.date,
        amount: initialValue.amount,
        category: initialValue.category,
        type: initialValue.type,
        note: initialValue.note,
      });
      return;
    }

    setForm(initialFormState);
  }, [initialValue, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...initialValue,
      ...form,
      amount: Number(form.amount),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="glass-panel w-full max-w-xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">
                  Transaction
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {initialValue ? 'Edit transaction' : 'Add transaction'}
                </h3>
              </div>
              <button type="button" className="button-secondary !px-3" onClick={onClose}>
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Date
                  <input
                    required
                    type="date"
                    className="field-input"
                    value={form.date}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, date: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Amount
                  <input
                    required
                    type="number"
                    min="0"
                    className="field-input"
                    value={form.amount}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, amount: event.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Category
                  <select
                    className="field-input"
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, category: event.target.value }))
                    }
                  >
                    {transactionCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Type
                  <select
                    className="field-input"
                    value={form.type}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, type: event.target.value }))
                    }
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Note
                <textarea
                  rows="4"
                  className="field-input resize-none"
                  placeholder="Add a quick note"
                  value={form.note}
                  onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                />
              </label>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" className="button-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="button-primary">
                  {initialValue ? 'Save changes' : 'Add transaction'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
