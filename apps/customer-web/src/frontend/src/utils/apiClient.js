import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Read the session from localStorage (matching AuthContext logic)
    const sessionStr = localStorage.getItem('coskinn_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        // Assuming the backend requires a token and it is stored in the session object. 
        // If the token is not there, it will at least pass the headers if we add them later.
        if (session.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }
      } catch (error) {
        console.error("Failed to parse session", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Trigger a global logout event that AuthContext can listen to
        window.dispatchEvent(new CustomEvent('auth:logout'));
      } else if (error.response.status >= 500) {
        // Trigger a global toast event that ToastContext can listen to
        window.dispatchEvent(new CustomEvent('toast:error', {
          detail: { message: error.response.data?.message || 'A server error occurred. Please try again later.' }
        }));
      }
    } else if (error.request) {
      // Network error (backend might be down)
      window.dispatchEvent(new CustomEvent('toast:error', {
        detail: { message: 'Network error. Please check your connection.' }
      }));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
