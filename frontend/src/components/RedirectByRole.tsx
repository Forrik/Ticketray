import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Компонент для перенаправления пользователей в зависимости от роли
 * - Если пользователь не авторизован, перенаправляет на страницу входа
 * - Если пользователь имеет роль admin, перенаправляет на страницу управления пользователями
 * - Всех остальных пользователей перенаправляет на страницу тикетов
 */
const RedirectByRole: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.role === 'admin') {
    return <Navigate to="/users" replace />;
  }

  return <Navigate to="/tickets" replace />;
};

export default RedirectByRole;
