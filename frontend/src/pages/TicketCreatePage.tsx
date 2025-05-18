import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TicketsService } from '../services/tickets';

const TicketCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  // Состояние формы
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  
  // Состояние загрузки и ошибки
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!formData.title.trim()) {
      setError('Заголовок обязателен');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Описание обязательно');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Создание тикета
      await TicketsService.create({
        title: formData.title,
        description: formData.description
      });
      
      // Перенаправление на список тикетов
      navigate('/tickets');
    } catch (err) {
      console.error('Ошибка при создании тикета:', err);
      setError('Не удалось создать тикет. Пожалуйста, попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Создание тикета</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Введите заголовок тикета"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Подробно опишите проблему или запрос"
            required
          />
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Создание...' : 'Создать тикет'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketCreatePage;
