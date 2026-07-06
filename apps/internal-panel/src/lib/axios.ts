import axios from 'axios';

// Create a custom axios instance
export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust if backend runs on a different port/prefix
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('internal_panel_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized globally if desired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Handle token expiration globally
      // localStorage.removeItem('internal_panel_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
