import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Компонент для публичных маршрутов (доступных только неавторизованным пользователям)
 * - Если пользователь авторизован, перенаправляет в зависимости от роли
 * - Если не авторизован, показывает дочерние компоненты
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Если пользователь авторизован, перенаправляем в зависимости от роли
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/users' : '/tickets', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Если пользователь не авторизован, показываем дочерние компоненты
  return <>{children}</>;
};

export default PublicRoute;
