const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

export function formatCurrency(value, compact = false) {
  return compact ? compactCurrencyFormatter.format(value) : currencyFormatter.format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatShortDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export function sortTransactions(transactions, sortBy) {
  const cloned = [...transactions];

  if (sortBy === 'amount-desc') {
    return cloned.sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === 'amount-asc') {
    return cloned.sort((a, b) => a.amount - b.amount);
  }

  if (sortBy === 'date-asc') {
    return cloned.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return cloned.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function filterTransactions(transactions, filters) {
  const searchText = filters.search.toLowerCase().trim();

  return transactions.filter((transaction) => {
    const matchesSearch =
      searchText.length === 0 ||
      transaction.category.toLowerCase().includes(searchText) ||
      transaction.note.toLowerCase().includes(searchText);

    const matchesType = filters.type === 'all' || transaction.type === filters.type;
    const matchesCategory =
      filters.category === 'all' || transaction.category === filters.category;

    return matchesSearch && matchesType && matchesCategory;
  });
}

export function buildBalanceTrend(transactions) {
  const ordered = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;

  return ordered.map((transaction) => {
    runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;

    return {
      date: formatShortDate(transaction.date),
      balance: runningBalance,
      income: transaction.type === 'income' ? transaction.amount : 0,
      expense: transaction.type === 'expense' ? transaction.amount : 0,
    };
  });
}

export function buildExpenseBreakdown(transactions) {
  const breakdown = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] =
        (accumulator[transaction.category] || 0) + transaction.amount;
      return accumulator;
    }, {});

  return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
}

export function calculateSummary(transactions) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
  };
}

export function calculateInsights(transactions) {
  const summary = calculateSummary(transactions);
  const breakdown = buildExpenseBreakdown(transactions);
  const highestSpendingCategory = breakdown.sort((a, b) => b.value - a.value)[0];

  const monthlyTotals = transactions.reduce((accumulator, transaction) => {
    const monthKey = transaction.date.slice(0, 7);
    accumulator[monthKey] ??= { income: 0, expenses: 0 };

    if (transaction.type === 'income') {
      accumulator[monthKey].income += transaction.amount;
    } else {
      accumulator[monthKey].expenses += transaction.amount;
    }

    return accumulator;
  }, {});

  const months = Object.keys(monthlyTotals).sort();
  const currentMonth = months.at(-1);
  const previousMonth = months.at(-2);
  const currentExpenses = currentMonth ? monthlyTotals[currentMonth].expenses : 0;
  const previousExpenses = previousMonth ? monthlyTotals[previousMonth].expenses : 0;

  return {
    highestSpendingCategory,
    monthlyComparison: currentExpenses - previousExpenses,
    totalSavings: summary.totalBalance,
  };
}

export function exportTransactionsToCsv(transactions) {
  const headers = ['Date', 'Amount', 'Category', 'Type', 'Note'];
  const rows = transactions.map((transaction) => [
    transaction.date,
    transaction.amount,
    transaction.category,
    transaction.type,
    `"${transaction.note.replaceAll('"', '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
