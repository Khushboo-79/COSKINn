import { apiClient } from './client';

export const rbacApi = {
  getRoles: async () => {
    const response = await apiClient.get('/admin/config/roles');
    return response.data;
  },
  createRole: async (data: any) => {
    const response = await apiClient.post('/admin/config/roles', data);
    return response.data;
  },
  updateRole: async (roleId: string, data: any) => {
    const response = await apiClient.put(`/admin/config/roles/${roleId}`, data);
    return response.data;
  },
  getUsers: async () => {
    const response = await apiClient.get('/admin/config/users');
    return response.data;
  },
  createUser: async (data: any) => {
    const response = await apiClient.post('/admin/config/users', data);
    return response.data;
  },
  updateUserRole: async (userId: string, data: any) => {
    const response = await apiClient.put(`/admin/config/users/${userId}/role`, data);
    return response.data;
  },
};
