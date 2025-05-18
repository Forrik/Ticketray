import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { useAuth } from './context/AuthContext';

// Импорт компонентов страниц (они будут созданы позже)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TicketsPage from "./pages/TicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import UsersPage from "./pages/UsersPage";

// Компонент для защищенных маршрутов, доступных только вошедшим пользователям
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Компонент для маршрутов, доступных только администраторам
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Основные маршруты приложения
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Публичные маршруты */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Защищенные маршруты */}
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
        
        <Route path="/tickets/new" element={
          <ProtectedRoute>
            <div className="p-8 text-center">Создание тикета (будет реализовано позже)</div>
          </ProtectedRoute>
        } />
        
        {/* Маршрут, доступный только для администраторов */}
        <Route path="/users" element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        } />
        
        {/* Маршрут по умолчанию - перенаправление на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
