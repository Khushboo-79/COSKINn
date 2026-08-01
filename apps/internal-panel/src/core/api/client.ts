import axios, { type AxiosInstance } from 'axios';

// Base URL for API
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookies if needed
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors / token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // E.g., token refresh logic can go here on 401
    // if (error.response?.status === 401) { ... }
    return Promise.reject(error);
  }
);
