// Основные типы данных для приложения

// Типы пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'manager' | 'admin';
}

// Типы тикета
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  created_by: User | number;
  assigned_to?: User | number;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

// Типы комментария
export interface Comment {
  id: number;
  content: string;
  author: User | number;
  ticket: Ticket | number;
  created_at: string;
}

// Типы для авторизации
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
