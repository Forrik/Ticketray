import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { register, isAuthenticated, user } = useAuth();
  
  // Состояние формы
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Состояние загрузки, ошибки и успеха
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Редирект если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
  }, [isAuthenticated, user]);

  // Функция редиректа в зависимости от роли
  const redirectBasedOnRole = (role: string) => {
    if (role === 'admin') {
      window.location.href = '/users';
    } else {
      // Для пользователей и менеджеров
      window.location.href = '/tickets';
    }
  };

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Проверка заполнения полей
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Вызываем функцию регистрации из контекста авторизации
      await register(formData.username, formData.email, formData.password);
      
      // Показываем сообщение об успехе на 2 секунды перед редиректом
      setSuccess('Регистрация успешна! Вы уже авторизованы, перенаправление через мгновение...');
      
      // Делаем небольшую задержку, чтобы показать сообщение об успехе
      setTimeout(() => {
        // Делаем мануальный редирект, чтобы не полагаться на useEffect
        if (user && user.role) {
          redirectBasedOnRole(user.role);
        } else {
          // Если роль неизвестна, перенаправляем на страницу тикетов по умолчанию
          window.location.href = '/tickets';
        }
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      
      // Обработка разных типов ошибок
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const errorObj = err as any;
        if (errorObj.response?.data) {
          // Получение сообщения об ошибке из ответа API
          if (errorObj.response.data.username) {
            setError(`Пользователь с таким именем уже существует`);
          } else if (errorObj.response.data.email) {
            setError(`Email уже используется`);
          } else if (errorObj.response.data.detail) {
            setError(errorObj.response.data.detail); 
          } else {
            setError('Ошибка при регистрации');
          }
        } else {
          setError('Ошибка при регистрации');
        }
      } else {
        setError('Ошибка при регистрации');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Подтверждение пароля</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || (formData.password !== formData.confirmPassword)}
          className={`w-full py-2 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            loading || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || (formData.password !== formData.confirmPassword)
              ? 'bg-green-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
