import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TicketsService } from '../services/tickets';
import { Ticket, User } from '../types';

// Типы для табов и статусов
type StatusFilter = 'all' | 'open' | 'in_progress' | 'closed';

const TicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка тикетов при монтировании компонента
  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const data = await TicketsService.getAll();
        setTickets(data);

        // Если обычный пользователь, показываем только его тикеты
        if (user?.role === 'user') {
          const userTickets = data.filter(
            ticket => typeof ticket.created_by === 'object' 
              ? ticket.created_by.id === user.id 
              : ticket.created_by === user.id
          );
          setFilteredTickets(applyStatusFilter(userTickets, statusFilter));
        } else {
          // Для администраторов и менеджеров - все тикеты
          setFilteredTickets(applyStatusFilter(data, statusFilter));
        }

        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке тикетов:', err);
        setError('Не удалось загрузить тикеты. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    loadTickets();
  }, [user]);

  // Фильтрация тикетов при изменении статуса фильтра
  useEffect(() => {
    const userTickets = user?.role === 'user'
      ? tickets.filter(
          ticket => typeof ticket.created_by === 'object' 
            ? ticket.created_by.id === user.id 
            : ticket.created_by === user.id
        )
      : tickets;
      
    setFilteredTickets(applyStatusFilter(userTickets, statusFilter));
  }, [statusFilter, tickets, user]);

  // Функция для применения фильтра по статусу
  const applyStatusFilter = (ticketList: Ticket[], status: StatusFilter): Ticket[] => {
    if (status === 'all') return ticketList;
    return ticketList.filter(ticket => ticket.status === status);
  };

  // Обработчик изменения таба
  const handleTabChange = (status: StatusFilter) => {
    setStatusFilter(status);
  };

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

  // Функция форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  // Отображение в зависимости от роли
  const getPageTitle = () => {
    if (user?.role === 'user') {
      return 'Мои тикеты';
    }
    return 'Все тикеты';
  };

  // Компонент для рендеринга табов
  const TabsComponent = () => (
    <div className="mb-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => handleTabChange('all')}
          className={`py-2 px-4 font-medium ${statusFilter === 'all' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Все
        </button>
        <button
          onClick={() => handleTabChange('open')}
          className={`py-2 px-4 font-medium ${statusFilter === 'open' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Открытые
        </button>
        <button
          onClick={() => handleTabChange('in_progress')}
          className={`py-2 px-4 font-medium ${statusFilter === 'in_progress' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          В процессе
        </button>
        <button
          onClick={() => handleTabChange('closed')}
          className={`py-2 px-4 font-medium ${statusFilter === 'closed' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Закрытые
        </button>
      </div>
    </div>
  );

  // Компонент для отображения списка тикетов
  const TicketsList = () => {
    if (loading) {
      return (
        <div className="flex justify-center p-8">
          <div className="animate-pulse flex flex-col w-full space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 p-4 rounded-md h-24"></div>
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      );
    }

    if (filteredTickets.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          Нет тикетов{statusFilter !== 'all' ? ` со статусом "${getStatusText(statusFilter)}"` : ''}
        </div>
      );
    }

    return (
      <ul className="divide-y divide-gray-200">
        {filteredTickets.map((ticket) => (
          <li key={ticket.id} className="border-b hover:bg-gray-50">
            <Link to={`/tickets/${ticket.id}`} className="block">
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
                      Автор: {typeof ticket.created_by === 'object' ? ticket.created_by.username : 'Неизвестно'}
                    </p>
                    {ticket.assigned_to && (
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        Исполнитель: {typeof ticket.assigned_to === 'object' ? ticket.assigned_to.username : 'Неизвестно'}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Создан: {formatDate(ticket.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
        {/* Кнопка создания тикета (только для пользователей и менеджеров) */}
        {(user?.role === 'user' || user?.role === 'manager') && (
          <Link
            to="/tickets/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Создать тикет
          </Link>
        )}
      </div>

      {/* Табы для фильтрации */}
      <TabsComponent />

      {/* Список тикетов */}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <TicketsList />
      </div>
    </div>
  );
};

export default TicketsPage;
