import api from './api';
import { LoginCredentials, RegisterData, User } from '../types';

// Сервис для работы с авторизацией
export const AuthService = {
  // Проверка наличия токена и добавление в заголовки
  setAuthToken: (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      // Устанавливаем токен глобально для всех запросов
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  },
  
  // При инициализации приложения, проверяем и устанавливаем токен из локального хранилища
  init: () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  },
  
  // Регистрация пользователя
  register: async (data: RegisterData) => {
    try {
      // Сначала регистрируем пользователя
      const response = await api.post<{ user: User; token: string }>('register/', data);
      
      // Сохраняем токен и устанавливаем его для всех будущих запросов
      AuthService.setAuthToken(response.data.token);
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Вход пользователя
  login: async (credentials: LoginCredentials) => {
    try {
      // Получаем токен
      const response = await api.post<{ token: string }>('token/', credentials);
      
      // Сохраняем токен и устанавливаем его для всех будущих запросов
      AuthService.setAuthToken(response.data.token);
      
      // Получаем данные пользователя
      const userResponse = await AuthService.getCurrentUser();
      
      return {
        token: response.data.token,
        user: userResponse
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Выход пользователя
  logout: () => {
    AuthService.setAuthToken(null);
  },

  // Получение информации о текущем пользователе
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
      
      // Получаем данные пользователя с сервера
      const response = await api.get<User>('users/me/'); // Обновленный путь к апи
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user', error);
      // Если не удается получить пользователя, удаляем токен
      AuthService.setAuthToken(null);
      return null;
    }
  },

  // Проверка, авторизован ли пользователь
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
