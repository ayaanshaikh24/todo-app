export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: string;
  priority: Priority;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoStatsData {
  total: number;
  completedCount: number;
  activeCount: number;
  completionPercentage: number;
}
