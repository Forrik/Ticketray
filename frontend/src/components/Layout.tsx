import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Базовый компонент макета для обертывания всех страниц
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children || <Outlet />}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <div className="container mx-auto">
          <p className="text-sm">
            Ticketray &copy; {new Date().getFullYear()} - Система управления заявками
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
