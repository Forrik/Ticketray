import api from './api';
import { Ticket } from '../types';

// Сервис для работы с тикетами
export const TicketsService = {
  // Получение всех тикетов
  getAll: async (): Promise<Ticket[]> => {
    const response = await api.get<Ticket[]>('tickets/');
    return response.data;
  },

  // Получение тикета по ID
  getById: async (id: number): Promise<Ticket> => {
    const response = await api.get<Ticket>(`tickets/${id}/`);
    return response.data;
  },

  // Создание нового тикета
  create: async (ticketData: Partial<Ticket>): Promise<Ticket> => {
    const response = await api.post<Ticket>('tickets/', ticketData);
    return response.data;
  },

  // Обновление тикета
  update: async (id: number, ticketData: Partial<Ticket>): Promise<Ticket> => {
    const response = await api.put<Ticket>(`tickets/${id}/`, ticketData);
    return response.data;
  },

  // Удаление тикета
  delete: async (id: number): Promise<void> => {
    await api.delete(`tickets/${id}/`);
  }
};
