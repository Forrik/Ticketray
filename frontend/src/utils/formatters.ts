// Утилиты для форматирования данных

/**
 * Форматирует дату в читаемый формат
 * @param dateString - строка с датой от API
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Преобразует статус тикета в читаемый формат с цветовым классом
 * @param status - статус тикета (open, in_progress, closed)
 */
export const getStatusInfo = (status: string): { label: string, className: string } => {
  switch (status) {
    case 'open':
      return { label: 'Открыт', className: 'bg-green-100 text-green-800' };
    case 'in_progress':
      return { label: 'В работе', className: 'bg-blue-100 text-blue-800' };
    case 'closed':
      return { label: 'Закрыт', className: 'bg-gray-100 text-gray-800' };
    default:
      return { label: 'Неизвестно', className: 'bg-gray-100 text-gray-800' };
  }
};
