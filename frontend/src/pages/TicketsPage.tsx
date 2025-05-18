import React from 'react';
import { Link } from 'react-router-dom';

const TicketsPage: React.FC = () => {
  // Примеры тикетов для отображения (в реальности будут загружаться с API)
  const mockTickets = [
    { id: 1, title: 'Проблема с входом в систему', status: 'open', created_at: '2025-05-18', priority: 'high' },
    { id: 2, title: 'Не работает отчет продаж', status: 'in_progress', created_at: '2025-05-17', priority: 'medium' },
    { id: 3, title: 'Добавить новый функционал', status: 'closed', created_at: '2025-05-16', priority: 'low' },
  ];

  // Функция для определения цвета метки статуса тикета
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Функция для отображения статуса на русском
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Открыт';
      case 'in_progress':
        return 'В работе';
      case 'closed':
        return 'Закрыт';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Тикеты</h1>
        <Link
          to="/tickets/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Создать тикет
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockTickets.map((ticket) => (
            <li key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {ticket.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Приоритет: {ticket.priority === 'high' ? 'Высокий' : ticket.priority === 'medium' ? 'Средний' : 'Низкий'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Создан: {ticket.created_at}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketsPage;
