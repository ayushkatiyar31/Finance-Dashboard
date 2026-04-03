import { Eye, ShieldCheck } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';

export function RoleSwitcher() {
  const role = useFinanceStore((state) => state.role);
  const setRole = useFinanceStore((state) => state.setRole);

  return (
    <label className="input-shell group min-w-[180px] cursor-pointer">
      {role === 'admin' ? (
        <ShieldCheck className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      ) : (
        <Eye className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      )}
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Role</p>
        <select
          aria-label="Select dashboard role"
          className="w-full cursor-pointer bg-transparent text-sm font-semibold outline-none"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </label>
  );
}
