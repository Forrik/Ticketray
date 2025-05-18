import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Компонент навигационной панели
const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">Ticketray</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/tickets" className="hover:text-blue-200">Тикеты</Link>
              {user?.role === 'admin' && (
                <Link to="/users" className="hover:text-blue-200">Пользователи</Link>
              )}
              <div className="ml-4 flex items-center">
                <span className="mr-2">{user?.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Выйти
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Войти</Link>
              <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
