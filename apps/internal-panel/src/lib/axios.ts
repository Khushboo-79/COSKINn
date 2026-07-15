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

// Response Interceptor: Handle 401 Unauthorized globally for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('internal_panel_refresh_token');
      
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:3000/api/auth/refresh', {
            refreshToken,
          });
          
          if (res.data.access_token) {
            localStorage.setItem('internal_panel_token', res.data.access_token);
            // Optionally update refresh token if the backend rotates it
            if (res.data.refresh_token) {
              localStorage.setItem('internal_panel_refresh_token', res.data.refresh_token);
            }
            
            // Retry the original request with new token
            originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          localStorage.removeItem('internal_panel_token');
          localStorage.removeItem('internal_panel_refresh_token');
          window.dispatchEvent(new Event('auth-expired'));
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, emit event
        window.dispatchEvent(new Event('auth-expired'));
      }
    }
    
    return Promise.reject(error);
  }
);
