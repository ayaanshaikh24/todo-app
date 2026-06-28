import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoStats } from './components/TodoStats';
import { TodoList } from './components/TodoList';
import { CheckSquare } from 'lucide-react';

export default function App() {
  const {
    filter,
    setFilter,
    filteredTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted
  } = useTodos();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl">
        {/* App Header */}
        <div className="text-center mb-8 flex items-center justify-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center">
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
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        {/* Footer info */}
        <footer className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
          <p>Double-click a task text to edit directly • Auto-saved to LocalStorage</p>
        </footer>
      </div>
    </div>
  );
}
