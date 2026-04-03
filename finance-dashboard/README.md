# Finance Dashboard

A responsive finance dashboard UI built with React, Vite, Tailwind CSS, Recharts, Zustand, and mock data. The project focuses on clean architecture, reusable UI patterns, and a polished dashboard experience without any backend dependency.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Features

- Dashboard summary cards for total balance, income, and expenses
- Area chart for balance trend over time
- Donut chart for expense category breakdown
- Transactions table with search, type/category filters, sorting, and empty state
- Viewer/Admin role switch with conditional transaction actions
- Insights cards for highest spending category, monthly comparison, and total savings
- Zustand-based state management with scalable store structure
- Mock API-style loading state
- Dark mode toggle
- Local storage persistence
- CSV export for filtered transactions
- Responsive layout with smooth motion using Framer Motion

## Tech Stack

- React
- Vite
- Tailwind CSS
- Recharts
- Zustand
- Framer Motion
- Lucide React

## Folder Structure

```text
src/
├── components/
│   ├── charts/
│   ├── layout/
│   ├── Card.jsx
│   ├── ChartLegend.jsx
│   ├── EmptyState.jsx
│   ├── FiltersBar.jsx
│   ├── InsightsPanel.jsx
│   ├── LoadingState.jsx
│   ├── RoleSwitcher.jsx
│   ├── SectionHeader.jsx
│   ├── SummaryCard.jsx
│   ├── ThemeToggle.jsx
│   ├── TransactionModal.jsx
│   └── TransactionTable.jsx
├── data/
├── hooks/
├── pages/
├── store/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

## Design Decisions

- Zustand keeps UI state, role state, filters, and transaction data centralized without introducing boilerplate.
- The dashboard is split into focused components so cards, charts, filters, and modal flows stay reusable.
- Tailwind utility patterns are paired with a few shared component classes for consistent spacing and styling.
- Mock data loads with a brief delay to simulate a frontend-only API state and support loading skeletons.
- Local storage persistence makes the prototype more realistic by retaining role, theme, and transaction edits.

## Notes

- Clearing browser local storage resets the app back to the seed mock data.
- The project is frontend-only and intended as a strong foundation for adding a real API later.
