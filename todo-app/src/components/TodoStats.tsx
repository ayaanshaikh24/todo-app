import { TodoStatsData } from '../types/todo';
import { Sparkles, Trash } from 'lucide-react';

interface TodoStatsProps {
  stats: TodoStatsData;
  onClearCompleted: () => void;
}

export function TodoStats({ stats, onClearCompleted }: TodoStatsProps) {
  const { total, completedCount, activeCount, completionPercentage } = stats;

  if (total === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-sm mb-6 transition-all-custom">
      {/* Counters Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{total}</p>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Tasks</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{activeCount}</p>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Active</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{completedCount}</p>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Completed</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="flex items-center gap-1 font-medium text-slate-500">
            <Sparkles size={12} className="text-indigo-500" />
            {completionPercentage === 100 ? 'All done! Good job!' : 'Your Progress'}
          </span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{completionPercentage}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Clear Completed Action */}
      {completedCount > 0 && (
        <div className="flex justify-end mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
          >
            <Trash size={12} />
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
}
