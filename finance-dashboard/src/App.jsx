import { useEffect } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { useFinanceStore } from './store/useFinanceStore';

function App() {
  const theme = useFinanceStore((state) => state.theme);
  const initialize = useFinanceStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <DashboardPage />;
}

export default App;
