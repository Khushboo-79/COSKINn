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
        if (session.token || session.access_token) {
          config.headers.Authorization = `Bearer ${session.token || session.access_token}`;
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const sessionStr = localStorage.getItem('coskinn_session');
          if (sessionStr) {
            const session = JSON.parse(sessionStr);
            if (session.refreshToken) {
              const res = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {
                refreshToken: session.refreshToken
              });
              
              if (res.data && res.data.access_token) {
                // Update session
                session.token = res.data.access_token;
                session.refreshToken = res.data.refresh_token;
                localStorage.setItem('coskinn_session', JSON.stringify(session));
                
                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
                return apiClient(originalRequest);
              }
            }
          }
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
        }
        
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
      // Suppressed during frontend UI development
      console.warn("Network error suppressed:", error);
      /* window.dispatchEvent(new CustomEvent('toast:error', {
        detail: { message: 'Network error. Please check your connection.' }
      })); */
    }
    return Promise.reject(error);
  }
);

export default apiClient;
