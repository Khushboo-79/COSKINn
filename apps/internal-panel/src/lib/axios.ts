import axios from 'axios';

// Mock interceptor for UI development
// This fakes the backend response so we can build the UI before APIs are ready
export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(async (config) => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return config;
});

// Mock Responses for Admin RBAC
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    
    // Mock Roles
    if (config.url === '/admin/config/roles' && config.method === 'get') {
      return Promise.resolve({
        data: [
          { id: '1', name: 'super-admin', description: 'Full system access', userCount: 2 },
          { id: '2', name: 'product-manager', description: 'Manage catalog and stock intake', userCount: 4 },
          { id: '3', name: 'finance', description: 'Access to reports and tax settings', userCount: 1 },
          { id: '4', name: 'inventory-staff', description: 'Manage stock adjustments', userCount: 8 }
        ]
      });
    }

    // Mock Users
    if (config.url === '/admin/config/users' && config.method === 'get') {
      return Promise.resolve({
        data: [
          { id: 'u1', name: 'Admin One', email: 'admin@coskinn.com', roleId: '1', roleName: 'super-admin', status: 'ACTIVE' },
          { id: 'u2', name: 'PM User', email: 'pm@coskinn.com', roleId: '2', roleName: 'product-manager', status: 'ACTIVE' },
          { id: 'u3', name: 'Finance User', email: 'finance@coskinn.com', roleId: '3', roleName: 'finance', status: 'INACTIVE' }
        ]
      });
    }
    
    // Return mock success for mutations
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      return Promise.resolve({ data: { success: true } });
    }

    return Promise.reject(error);
  }
);
