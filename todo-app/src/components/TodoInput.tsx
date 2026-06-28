import React, { useState } from 'react';
import { Priority } from '../types/todo';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string, category: string, priority: Priority) => void;
}

const CATEGORY_SUGGESTIONS = ['Personal', 'Work', 'Health', 'Shopping'];

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text, category.trim() || 'General', priority);
    setText('');
    setCategory('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div
        className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 ${
          isFocused
            ? 'border-indigo-500 shadow-lg ring-4 ring-indigo-500/10'
            : 'border-slate-100 shadow-md dark:border-slate-800'
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Main Todo Input - Full Width to prevent overlapping */}
          <div className="w-full">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What needs to be done today?"
              className="w-full px-1 py-1 text-lg font-medium bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              required
            />
          </div>

          {/* Metadata Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-50 dark:border-slate-800/60">
            <div className="flex flex-wrap gap-2 items-center">
              {/* Category Input */}
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category (e.g. Work)"
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-36"
              />

              {/* Priority Selector */}
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all active:scale-[0.98] cursor-pointer ml-auto"
            >
              <Plus size={14} strokeWidth={2.5} />
              Add Task
            </button>
          </div>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 items-center border-t border-slate-50/60 dark:border-slate-800/40">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mr-1">
            QUICK CATEGORY:
          </span>
          {CATEGORY_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => setCategory(sug)}
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-200 cursor-pointer ${
                category.toLowerCase() === sug.toLowerCase()
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-400'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
              }`}
            >
              {sug}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
