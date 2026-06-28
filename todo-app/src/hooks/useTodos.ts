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
        text: 'Welcome to your premium Todo App! 🚀',
        completed: false,
        createdAt: Date.now() - 3600000 * 2,
        category: 'Personal',
        priority: 'medium'
      },
      {
        id: '2',
        text: 'Click the checkbox to complete a task',
        completed: true,
        createdAt: Date.now() - 3600000,
        category: 'Work',
        priority: 'low'
      },
      {
        id: '3',
        text: 'Double-click a task or click the edit icon to make changes',
        completed: false,
        createdAt: Date.now(),
        category: 'Work',
        priority: 'high'
      }
    ] as Todo[];
  });

  const [filter, setFilter] = useState<FilterType>('all');

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

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

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

  return {
    todos,
    filter,
    setFilter,
    filteredTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted
  };
}
