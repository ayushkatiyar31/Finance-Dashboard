import { ArrowDown, PiggyBank, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { formatCurrency } from '../utils/finance';

export function InsightsPanel({ insights }) {
  const monthlyDirection =
    insights.monthlyComparison <= 0 ? 'Down from last month' : 'Up from last month';

  const cards = [
    {
      title: 'Highest Spending',
      value: insights.highestSpendingCategory?.name ?? 'No expenses',
      helper: insights.highestSpendingCategory
        ? formatCurrency(insights.highestSpendingCategory.value)
        : 'No data yet',
      icon: Sparkles,
    },
    {
      title: 'Monthly Comparison',
      value: formatCurrency(Math.abs(insights.monthlyComparison)),
      helper: monthlyDirection,
      icon: ArrowDown,
    },
    {
      title: 'Total Savings',
      value: formatCurrency(insights.totalSavings),
      helper: 'Income minus expenses',
      icon: PiggyBank,
    },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                    {card.value}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{card.helper}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
