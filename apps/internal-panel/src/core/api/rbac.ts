import { apiClient } from './client';

export const rbacApi = {
  getRoles: async () => {
    const response = await apiClient.get('/rbac/roles');
    return response.data;
  },
  createRole: async (data: any) => {
    const response = await apiClient.post('/rbac/roles', data);
    return response.data;
  },
  updateRole: async (roleId: string, data: any) => {
    const response = await apiClient.put(`/rbac/roles/${roleId}`, data);
    return response.data;
  },
  getUsers: async () => {
    const response = await apiClient.get('/rbac/users');
    return response.data;
  },
  updateUserRole: async (userId: string, data: any) => {
    const response = await apiClient.put(`/rbac/users/${userId}/role`, data);
    return response.data;
  },
};
