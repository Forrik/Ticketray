import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Компонент навигационной панели
const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <header>
      <nav className="bg-indigo-600 shadow-lg text-white">
        <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ticketray
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/tickets" 
                  className="text-indigo-100 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Тикеты
                </NavLink>
                
                {user?.role === 'admin' && (
                  <NavLink 
                    to="/users" 
                    className="text-indigo-100 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Пользователи
                  </NavLink>
                )}
                
                <div className="ml-4 flex items-center border-l pl-4 border-indigo-500">
                  <span className="mr-2 text-sm font-medium">
                    {user?.username || user?.email}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Выйти
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className="text-indigo-100 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Войти
                </NavLink>
                
                <NavLink 
                  to="/register" 
                  className="bg-indigo-50 text-indigo-600 hover:bg-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Регистрация
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
