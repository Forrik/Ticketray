import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { AuthService } from './services/auth';

function App() {
  // Инициализируем токен авторизации при запуске приложения
  useEffect(() => {
    // Вызываем инициализацию сервиса авторизации
    AuthService.init();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
