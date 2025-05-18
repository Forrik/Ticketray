import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated, user } = useAuth();
  
  // Состояние для редиректа - используем window.location вместо React Router
  
  // Состояние формы
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  // Состояние загрузки и ошибки
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Редирект если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated && user) {
      redirectBasedOnRole(user.role);
    }
  }, [isAuthenticated, user]);

  // Функция редиректа в зависимости от роли
  // Временно отключаем авторедирект для предотвращения циклической переадресации
  const redirectBasedOnRole = (role: string) => {
    // Проверка на наличие флага в localStorage, чтобы избежать циклического редиректа
    const redirectFlag = localStorage.getItem('isRedirecting');
    if (redirectFlag === 'true') {
      return;
    }
    
    // Устанавливаем флаг для предотвращения циклического редиректа
    localStorage.setItem('isRedirecting', 'true');
    
    // Сбрасываем флаг через 5 секунд
    setTimeout(() => {
      localStorage.removeItem('isRedirecting');
    }, 5000);
    
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
    if (!formData.username || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      setLoading(true);
      // Вызываем функцию из контекста авторизации
      await login(formData.username, formData.password);
      
      // После успешного входа редирект произойдет в useEffect благодаря изменению состояния авторизации
    } catch (err) {
      console.error('Login error:', err);
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };
  
  // Используем window.location для редиректа, поэтому не нужно ничего рендерить
  
  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Вход в систему</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !formData.username || !formData.password}
          className={`w-full py-2 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading || !formData.username || !formData.password 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
