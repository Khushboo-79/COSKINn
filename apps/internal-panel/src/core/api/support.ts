import { apiClient } from './client';

export const supportApi = {
  getTickets: async (status?: string) => {
    const params = status ? { status } : {};
    const { data } = await apiClient.get('/support/admin/tickets', { params });
    return data;
  },

  getTicketMessages: async (ticketId: string) => {
    const { data } = await apiClient.get(`/support/tickets/${ticketId}/messages`);
    return data;
  },

  replyToTicket: async (ticketId: string, payload: { adminId: string, message: string }) => {
    const { data } = await apiClient.post(`/support/admin/tickets/${ticketId}/reply`, payload);
    return data;
  },

  closeTicket: async (ticketId: string) => {
    const { data } = await apiClient.post(`/support/admin/tickets/${ticketId}/close`);
    return data;
  },

  escalateTicket: async (ticketId: string) => {
    const { data } = await apiClient.post(`/support/admin/tickets/${ticketId}/escalate`);
    return data;
  },

  assignTicket: async (ticketId: string, payload: { adminId: string }) => {
    const { data } = await apiClient.post(`/support/admin/tickets/${ticketId}/assign`, payload);
    return data;
  },

  getSlaStats: async () => {
    const { data } = await apiClient.get('/support/admin/tickets/stats/sla');
    return data;
  }
};
