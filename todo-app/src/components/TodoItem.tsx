import React, { useState, useRef, useEffect } from 'react';
import { Todo, Priority } from '../types/todo';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, category: string, priority: Priority) => void;
  onCategoryClick?: (category: string) => void;
  onPriorityClick?: (priority: Priority) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onCategoryClick,
  onPriorityClick
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText, editCategory, editPriority);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
      setEditCategory(todo.category);
      setEditPriority(todo.priority);
    }
  };

  const getPriorityStyles = (p: Priority) => {
    switch (p) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/40';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-amber-900/40';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/40';
    }
  };

  const getCategoryStyles = (cat: string) => {
    const norm = cat.toLowerCase();
    if (norm.includes('work')) {
      return 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40';
    } else if (norm.includes('personal')) {
      return 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900/40';
    } else if (norm.includes('health') || norm.includes('fit')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40';
    } else if (norm.includes('shop')) {
      return 'bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-900/50 hover:bg-pink-100 dark:hover:bg-pink-900/40';
    }
    return 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-850';
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 rounded-2xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-slate-50/50 border-slate-100 dark:bg-slate-900/30 dark:border-slate-800/50 opacity-75'
          : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
      }`}
    >
      {isEditing ? (
        <div className="flex-1 flex flex-col gap-3 w-full">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="text-slate-500">Category:</span>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-2 py-1 w-24 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-slate-500 ml-2">Priority:</span>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="ml-auto flex gap-1.5">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-colors cursor-pointer"
              >
                <Save size={13} />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium transition-colors cursor-pointer"
              >
                <X size={13} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            {/* Custom Checkbox */}
            <button
              onClick={() => onToggle(todo.id)}
              className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                todo.completed
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                  : 'border-slate-300 hover:border-indigo-500 dark:border-slate-600 dark:hover:border-indigo-400 bg-transparent'
              }`}
            >
              {todo.completed && <Check size={14} strokeWidth={3} />}
            </button>

            {/* Todo Info */}
            <div className="flex-1 min-w-0" onDoubleClick={() => setIsEditing(true)}>
              <p
                className={`text-[15px] font-medium leading-relaxed break-words transition-all duration-200 ${
                  todo.completed
                    ? 'text-slate-400 line-through dark:text-slate-500'
                    : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {todo.text}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                {/* Clickable Category tag */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategoryClick?.(todo.category);
                  }}
                  title={`Filter by category: ${todo.category}`}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer ${getCategoryStyles(todo.category)}`}
                >
                  {todo.category}
                </button>

                {/* Clickable Priority tag */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPriorityClick?.(todo.priority);
                  }}
                  title={`Filter by priority: ${todo.priority}`}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer ${getPriorityStyles(todo.priority)}`}
                >
                  {todo.priority}
                </button>
                
                {/* Time created */}
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium select-none">
                  {new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 mt-3 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              title="Edit Task"
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all duration-200 cursor-pointer"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              title="Delete Task"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
