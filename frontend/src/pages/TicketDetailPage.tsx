import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TicketDetailPage: React.FC = () => {
  // Получаем id тикета из URL
  const { id } = useParams<{ id: string }>();
  
  // В реальном приложении здесь будет запрос к API для получения данных о тикете
  const ticket = {
    id: Number(id),
    title: 'Проблема с входом в систему',
    description: 'Пользователи не могут войти в систему после последнего обновления. Ошибка возникает на странице входа после ввода корректных учетных данных.',
    status: 'in_progress',
    priority: 'high',
    created_at: '2025-05-18',
    created_by: 'user@example.com',
    assigned_to: 'support@example.com'
  };
  
  // Пример комментариев к тикету
  const comments = [
    { id: 1, author: 'support@example.com', content: 'Начал работу над тикетом. Проверяю логи авторизации.', created_at: '2025-05-18 12:30' },
    { id: 2, author: 'user@example.com', content: 'Спасибо! Жду результатов.', created_at: '2025-05-18 13:45' }
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
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/tickets" className="text-indigo-600 hover:text-indigo-900 mb-2 inline-block">
            &larr; Назад к списку тикетов
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
        </div>
        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeColor(ticket.status)}`}>
          {getStatusText(ticket.status)}
        </span>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Детали тикета</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Приоритет</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticket.priority === 'high' ? 'Высокий' : ticket.priority === 'medium' ? 'Средний' : 'Низкий'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Создан</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.created_at}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Создан пользователем</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.created_by}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Назначен</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.assigned_to}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Описание</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.description}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Комментарии</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <li key={comment.id} className="px-4 py-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{comment.author}</h3>
                      <p className="text-sm text-gray-500">{comment.created_at}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Добавить комментарий</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="mt-1">
            <textarea
              id="comment"
              name="comment"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Ваш комментарий..."
            />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketDetailPage;
