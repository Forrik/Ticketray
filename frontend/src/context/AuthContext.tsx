import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthState } from '../types';
import { AuthService } from '../services/auth';

// Создаем контекст для авторизации
interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Создаем контекст с начальными значениями
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Хук для использования контекста авторизации
export const useAuth = () => useContext(AuthContext);

// Провайдер контекста авторизации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
  });

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      if (authState.token) {
        try {
          const user = await AuthService.getCurrentUser();
          if (user) {
            setAuthState({
              isAuthenticated: true,
              user,
              token: authState.token,
            });
          } else {
            // Если не удалось получить пользователя, сбрасываем состояние
            localStorage.removeItem('token');
            setAuthState({
              isAuthenticated: false,
              user: null,
              token: null,
            });
          }
        } catch (error) {
          console.error('Authentication check failed', error);
          localStorage.removeItem('token');
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
          });
        }
      }
    };

    checkAuth();
  }, [authState.token]);

  // Функция входа
  const login = async (username: string, password: string) => {
    try {
      const { token } = await AuthService.login({ username, password });
      const user = await AuthService.getCurrentUser();
      setAuthState({
        isAuthenticated: true,
        user,
        token,
      });
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  // Функция регистрации
  const register = async (username: string, email: string, password: string) => {
    try {
      const { user, token } = await AuthService.register({ username, email, password });
      setAuthState({
        isAuthenticated: true,
        user,
        token,
      });
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  // Функция выхода
  const logout = () => {
    AuthService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  // Предоставляем контекст всем дочерним компонентам
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
