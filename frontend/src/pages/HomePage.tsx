import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto text-center py-10">
      <h1 className="text-4xl font-bold mb-6">Добро пожаловать в Ticketray</h1>
      <p className="text-xl mb-8">
        Система управления заявками для эффективной работы команды поддержки
      </p>
      
      {isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Здравствуйте, {user?.username}!
          </h2>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/tickets" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Мои тикеты
            </Link>
            <Link 
              to="/tickets/new" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Создать тикет
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-6">
            Войдите или зарегистрируйтесь, чтобы начать работу с системой
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Войти
            </Link>
            <Link 
              to="/register" 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
            >
              Регистрация
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
