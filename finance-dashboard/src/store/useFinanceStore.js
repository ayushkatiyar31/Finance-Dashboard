import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockTransactions';
import { filterTransactions, sortTransactions } from '../utils/finance';

const initialFilters = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date-desc',
};

const createId = () => `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      filters: initialFilters,
      role: 'admin',
      theme: 'light',
      loading: true,
      seeded: false,
      selectedTransaction: null,
      initialize: () => {
        if (get().seeded) {
          set({ loading: false });
          return;
        }

        set({ loading: true });
        window.setTimeout(() => {
          set({ transactions: mockTransactions, loading: false, seeded: true });
        }, 900);
      },
      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      updateFilters: (nextFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...nextFilters },
        })),
      resetFilters: () => set({ filters: initialFilters }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [{ ...transaction, id: createId() }, ...state.transactions],
        })),
      updateTransaction: (updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction,
          ),
          selectedTransaction: null,
        })),
      deleteTransaction: (transactionId) =>
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
        })),
      setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
      getVisibleTransactions: () => {
        const { transactions, filters } = get();
        return sortTransactions(filterTransactions(transactions, filters), filters.sortBy);
      },
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
        seeded: state.seeded,
      }),
    },
  ),
);
