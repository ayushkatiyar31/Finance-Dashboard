import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { formatCurrency } from '../utils/finance';

const iconMap = {
  balance: Wallet,
  income: ArrowUpRight,
  expenses: ArrowDownRight,
};

const accentMap = {
  balance:
    'from-slate-900 to-slate-700 text-white dark:from-brand-500 dark:to-brand-400 dark:text-slate-950',
  income:
    'from-brand-100 to-brand-50 text-brand-700 dark:from-brand-500/20 dark:to-brand-500/5 dark:text-brand-300',
  expenses:
    'from-amber-100 to-orange-50 text-orange-700 dark:from-orange-500/20 dark:to-orange-500/5 dark:text-orange-200',
};

export function SummaryCard({ title, value, delta, type }) {
  const Icon = iconMap[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                {formatCurrency(value)}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{delta}</p>
            </div>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accentMap[type]}`}
          >
            <Icon className="h-5 w-5 transition duration-200 group-hover:scale-110" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
