import { Todo, FilterType, Priority } from '../types/todo';
import { TodoItem } from './TodoItem';
import { CalendarRange, ClipboardList, CheckCircle2, Search, X, Filter } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  selectedPriority: Priority | null;
  onPrioritySelect: (priority: Priority | null) => void;
  categories: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, category: string, priority: Priority) => void;
  onClearFilters: () => void;
  totalTodosCount: number;
}

export function TodoList({
  todos,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedPriority,
  onPrioritySelect,
  categories,
  onToggle,
  onDelete,
  onEdit,
  onClearFilters,
  totalTodosCount
}: TodoListProps) {
  
  const hasActiveFilters = searchQuery || selectedCategory || selectedPriority || filter !== 'all';

  const getEmptyStateContent = () => {
    if (totalTodosCount > 0 && todos.length === 0) {
      return {
        icon: <Search className="mx-auto text-slate-300 dark:text-slate-700 w-12 h-12 mb-3" />,
        title: 'No matching tasks',
        desc: 'Try changing your search query, selecting another category, or resetting filters.'
      };
    }

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
      {/* Search and Filters Controls */}
      <div className="space-y-3.5 pb-2">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters Top Row: All/Active/Completed Status & Reset Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <div className="flex gap-1">
            {(['all', 'active', 'completed'] as FilterType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => onFilterChange(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dynamic Category Pill Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="flex items-center gap-1 text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">
              <Filter size={11} /> Filter by Category:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategorySelect(isSelected ? null : cat)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-400'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  {cat}
                  {isSelected && <X size={10} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Priority Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">
            Filter by Priority:
          </span>
          {(['low', 'medium', 'high'] as Priority[]).map((pri) => {
            const isSelected = selectedPriority === pri;
            return (
              <button
                key={pri}
                onClick={() => onPrioritySelect(isSelected ? null : pri)}
                className={`px-2.5 py-1 rounded-full border capitalize transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-400'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700'
                }`}
              >
                {pri}
              </button>
            );
          })}
        </div>
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
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          )}
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
              onCategoryClick={onCategorySelect}
              onPriorityClick={onPrioritySelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
