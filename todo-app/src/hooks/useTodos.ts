import { useState, useEffect, useMemo } from 'react';
import { Todo, FilterType, Priority, TodoStatsData } from '../types/todo';

const LOCAL_STORAGE_KEY = 'premium_todo_app_tasks';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to parse todos from localStorage:', error);
    }
    return [
      {
        id: '1',
        text: 'Welcome to FocusList! 🚀 Add a new task above.',
        completed: false,
        createdAt: Date.now() - 3600000 * 2,
        category: 'Personal',
        priority: 'medium'
      },
      {
        id: '2',
        text: 'Click the circle checkbox to complete tasks.',
        completed: true,
        createdAt: Date.now() - 3600000,
        category: 'Work',
        priority: 'low'
      },
      {
        id: '3',
        text: 'Double-click this text or click the edit icon to change me!',
        completed: false,
        createdAt: Date.now(),
        category: 'Work',
        priority: 'high'
      }
    ] as Todo[];
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (text: string, category: string, priority: Priority) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      category: category.trim() || 'General',
      priority
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string, category: string, priority: Priority) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: text.trim(), category: category.trim() || 'General', priority }
          : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Get all unique categories
  const categories = useMemo(() => {
    const set = new Set(todos.map((t) => t.category));
    return Array.from(set).filter(Boolean);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // 1. Status Filter
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      // 2. Search Query Filter
      if (searchQuery.trim() && !todo.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategory && todo.category !== selectedCategory) {
        return false;
      }

      // 4. Priority Filter
      if (selectedPriority && todo.priority !== selectedPriority) {
        return false;
      }

      return true;
    });
  }, [todos, filter, searchQuery, selectedCategory, selectedPriority]);

  const stats = useMemo<TodoStatsData>(() => {
    const total = todos.length;
    const completedCount = todos.filter((todo) => todo.completed).length;
    const activeCount = total - completedCount;
    const completionPercentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    return {
      total,
      completedCount,
      activeCount,
      completionPercentage
    };
  }, [todos]);

  const clearAllFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedPriority(null);
  };

  return {
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
  };
}
