import api from './api';
import { LoginCredentials, RegisterData, User } from '../types';

// Сервис для работы с авторизацией
export const AuthService = {
  // Регистрация пользователя
  register: async (data: RegisterData) => {
    const response = await api.post<{ user: User; token: string }>('register/', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  // Вход пользователя
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ token: string }>('token/', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  // Выход пользователя
  logout: () => {
    localStorage.removeItem('token');
  },

  // Получение информации о текущем пользователе
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
      
      // Этот эндпоинт нужно будет создать на бэкенде
      const response = await api.get<User>('me/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user', error);
      return null;
    }
  },

  // Проверка, авторизован ли пользователь
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
