import { apiClient } from './client';

export const authApi = {
  login: async (data: { email?: string; username?: string; password: string }) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  verifyTwoFactor: async (data: { code: string; nextStep?: string; userId?: string; phone?: string }) => {
    if (data.nextStep === 'verify-otp') {
      const response = await apiClient.post('/auth/verify-otp', { phone: data.phone, otp: data.code });
      return response.data;
    } else {
      const response = await apiClient.post('/auth/verify-totp', { userId: data.userId, totp: data.code });
      return response.data;
    }
  },
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
