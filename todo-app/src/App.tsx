import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoStats } from './components/TodoStats';
import { TodoList } from './components/TodoList';
import { CheckSquare, Sparkles, X, Lightbulb } from 'lucide-react';

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    categories,
    filteredTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    clearAllFilters
  } = useTodos();

  const [showTips, setShowTips] = useState(() => {
    try {
      return localStorage.getItem('focuslist_show_tips') !== 'false';
    } catch {
      return true;
    }
  });

  const handleCloseTips = () => {
    setShowTips(false);
    try {
      localStorage.setItem('focuslist_show_tips', 'false');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* App Header */}
        <div className="text-center mb-8 flex items-center justify-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center transition-transform hover:scale-105">
            <CheckSquare size={28} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              FocusList
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
              Premium Todo Dashboard
            </p>
          </div>
        </div>

        {/* Dismissible Tips Guide */}
        {showTips && (
          <div className="bg-gradient-to-r from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/15 dark:to-violet-950/15 border border-indigo-100/50 dark:border-indigo-950/30 p-4.5 rounded-3xl relative mb-6 transition-all duration-300 shadow-sm flex gap-3">
            <div className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0">
              <Lightbulb size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                Pro Productivity Tips
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed list-disc pl-4">
                <li>Double-click any task title to edit it inline instantly.</li>
                <li>Assign <strong>Categories</strong> and click them to filter your list.</li>
                <li>Plan with <strong>Priority</strong> tags to focus on what matters most first.</li>
              </ul>
            </div>
            <button
              onClick={handleCloseTips}
              title="Dismiss Guide"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg absolute top-3 right-3 cursor-pointer transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Input area */}
        <TodoInput onAddTodo={addTodo} />

        {/* Stats area */}
        <TodoStats stats={stats} onClearCompleted={clearCompleted} />

        {/* List Card container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-md transition-all-custom">
          <TodoList
            todos={filteredTodos}
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            selectedPriority={selectedPriority}
            onPrioritySelect={setSelectedPriority}
            categories={categories}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onClearFilters={clearAllFilters}
            totalTodosCount={todos.length}
          />
        </div>

        {/* Success / 100% Completion message */}
        {stats.total > 0 && stats.completedCount === stats.total && (
          <div className="mt-6 flex items-center justify-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold text-center animate-bounce">
            <Sparkles size={14} className="text-emerald-500 animate-pulse" />
            All tasks completed! Amazing productivity today!
          </div>
        )}

        {/* Footer info */}
        <footer className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
          <p>Auto-saved to LocalStorage • Double-click items to edit</p>
        </footer>
      </div>
    </div>
  );
}
