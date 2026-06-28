import { Todo, FilterType, Priority } from '../types/todo';
import { TodoItem } from './TodoItem';
import { CalendarRange, ClipboardList, CheckCircle2 } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, category: string, priority: Priority) => void;
}

export function TodoList({
  todos,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  onEdit
}: TodoListProps) {
  const getEmptyStateContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <ClipboardList className="mx-auto text-slate-300 dark:text-slate-700 w-12 h-12 mb-3" />,
          title: 'No active tasks',
          desc: 'Take a break! You have completed all your tasks.'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="mx-auto text-slate-300 dark:text-slate-700 w-12 h-12 mb-3" />,
          title: 'No completed tasks',
          desc: 'Get to work! Once you finish a task, check it off the list.'
        };
      default:
        return {
          icon: <CalendarRange className="mx-auto text-slate-300 dark:text-slate-700 w-12 h-12 mb-3" />,
          title: 'Your task list is empty',
          desc: 'Use the form above to add a new task and plan your day.'
        };
    }
  };

  const emptyState = getEmptyStateContent();

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800/80 pb-1.5 gap-2">
        {(['all', 'active', 'completed'] as FilterType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              filter === tab
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
            }`}
          >
            <span className="capitalize">{tab}</span>
          </button>
        ))}
      </div>

      {/* Todo items list */}
      {todos.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-3xl bg-slate-50/50 border border-dashed border-slate-200 dark:bg-slate-900/20 dark:border-slate-800/80 transition-all-custom">
          {emptyState.icon}
          <h3 className="text-[15px] font-semibold text-slate-700 dark:text-slate-300">
            {emptyState.title}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[240px] mx-auto leading-relaxed">
            {emptyState.desc}
          </p>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto pr-1">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
