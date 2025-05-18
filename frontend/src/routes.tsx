import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';

// Импорт компонентов страниц
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TicketsPage from "./pages/TicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import UsersPage from "./pages/UsersPage";

// Используем существующие компоненты для защиты маршрутов

// Компонент для защищенных маршрутов, доступных только вошедшим пользователям
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    window.location.href = '/login';
    return null;
  }
  
  return <>{children}</>;
};

// Компонент для маршрутов, доступных только администраторам
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    window.location.href = '/login';
    return null;
  }
  
  if (user?.role !== 'admin') {
    // Если пользователь не администратор, перенаправляем на страницу тикетов
    window.location.href = '/tickets';
    return null;
  }
  
  return <>{children}</>;
};

// Компонент для публичных маршрутов, доступных только неавторизованным пользователям
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    // Если пользователь авторизован, перенаправляем на соответствующую страницу
    window.location.href = user.role === 'admin' ? '/users' : '/tickets';
    return null;
  }
  
  return <>{children}</>;
};

// Компонент для перенаправления на соответствующую страницу в зависимости от роли
const RedirectByRole: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      window.location.href = '/login';
    } else if (user && user.role === 'admin') {
      // Если пользователь - администратор, перенаправляем на страницу управления пользователями
      window.location.href = '/users';
    } else {
      // Всех остальных направляем на страницу тикетов
      window.location.href = '/tickets';
    }
  }, [isAuthenticated, user]);
  
  return null;
};

// Основные маршруты приложения
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Перенаправление с корневого маршрута в зависимости от роли */}
        <Route path="/" element={<RedirectByRole />} />

        {/* Публичные маршруты, доступные только неавторизованным пользователям */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Маршруты для работы с тикетами - доступны всем зарегистрированным пользователям */}
        <Route path="/tickets" element={
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/tickets/:id" element={
          <ProtectedRoute>
            <TicketDetailPage />
          </ProtectedRoute>
        } />
        
        {/* Маршрут для создания новых тикетов */}
        <Route path="/tickets/new" element={
          <ProtectedRoute>
            <div className="p-8 text-center">Создание тикета (будет реализовано позже)</div>
          </ProtectedRoute>
        } />
        
        {/* Маршрут для управления пользователями - доступен только администраторам */}
        <Route path="/users" element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        } />
        
        {/* Маршрут по умолчанию - перенаправление на главную страницу */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
