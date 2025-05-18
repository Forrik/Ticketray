import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { useAuth } from './context/AuthContext';

// Компонент для защищенных маршрутов, доступных только вошедшим пользователям
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
        <Route path="/login" element={<div className="p-8 text-center">Страница входа (будет реализована позже)</div>} />
        <Route path="/register" element={<div className="p-8 text-center">Страница регистрации (будет реализована позже)</div>} />

        {/* Защищенные маршруты */}
        <Route path="/tickets" element={
          <ProtectedRoute>
            <div className="p-8 text-center">Список тикетов (будет реализован позже)</div>
          </ProtectedRoute>
        } />
        
        <Route path="/tickets/new" element={
          <ProtectedRoute>
            <div className="p-8 text-center">Создание тикета (будет реализовано позже)</div>
          </ProtectedRoute>
        } />
        
        {/* Маршрут по умолчанию - перенаправление на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
