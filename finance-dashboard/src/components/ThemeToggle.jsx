import { MoonStar, SunMedium } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';

export function ThemeToggle() {
  const theme = useFinanceStore((state) => state.theme);
  const setTheme = useFinanceStore((state) => state.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch theme' : 'Dark mode'}
      className="button-secondary !px-3"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  );
}
