import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Импорт компонентов страниц
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TicketsPage from "./pages/TicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import TicketCreatePage from "./pages/TicketCreatePage";
import UsersPage from "./pages/UsersPage";

// Импорт компонентов маршрутизации
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import RedirectByRole from "./components/RedirectByRole";

// Модуль для работы с правами администратора
const AdminRoles = ['admin'];

// Модуль для работы с правами пользователей и менеджеров
const UserManagerRoles = ['user', 'manager'];

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
          <PrivateRoute>
            <TicketsPage />
          </PrivateRoute>
        } />
        
        <Route path="/tickets/:id" element={
          <PrivateRoute>
            <TicketDetailPage />
          </PrivateRoute>
        } />
        
        {/* Маршрут для создания новых тикетов - доступен только для пользователей и менеджеров */}
        <Route path="/tickets/new" element={
          <PrivateRoute allowedRoles={UserManagerRoles}>
            <TicketCreatePage />
          </PrivateRoute>
        } />
        
        {/* Маршрут для управления пользователями - доступен только администраторам */}
        <Route path="/users" element={
          <PrivateRoute allowedRoles={AdminRoles}>
            <UsersPage />
          </PrivateRoute>
        } />
        
        {/* Маршрут по умолчанию - перенаправление на главную страницу */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
