import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

/**
 * Компонент для защиты маршрутов
 * - Проверяет, авторизован ли пользователь
 * - Проверяет, соответствует ли роль пользователя разрешенным
 * - Если не авторизован, редирект на /login
 * - Если роль не разрешена, редирект на /tickets
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // Если требуются определенные роли и роль пользователя не соответствует разрешенным
    if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      navigate('/tickets', { replace: true });
      return;
    }
  }, [isAuthenticated, user, allowedRoles, navigate]);

  // Если все проверки пройдены, показываем дочерние компоненты
  return <>{children}</>;
};

export default PrivateRoute;
