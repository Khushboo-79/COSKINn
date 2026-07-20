import client from './client';

export const hrApi = {
  // Employees
  getEmployees: async () => {
    const res = await client.get('/admin/hr/employees');
    return res.data;
  },

  getEmployee: async (id: string) => {
    const res = await client.get(`/admin/hr/employees/${id}`);
    return res.data;
  },

  createEmployee: async (data: any) => {
    const res = await client.post('/admin/hr/employees', data);
    return res.data;
  },

  // Overview
  getOverview: async () => {
    const res = await client.get('/admin/hr/overview');
    return res.data;
  },

  // Leaves
  getLeaveRequests: async () => {
    const res = await client.get('/admin/hr/leaves');
    return res.data;
  },

  updateLeaveStatus: async (id: string, status: 'Approved' | 'Rejected') => {
    const res = await client.post(`/admin/hr/leaves/${id}/status`, { status });
    return res.data;
  },

  // Payroll
  getPayrollSummary: async () => {
    const res = await client.get('/admin/hr/payroll');
    return res.data;
  },

  // Attendance
  markAttendance: async (employeeId: string, status: 'PRESENT' | 'ABSENT' | 'LEAVE') => {
    const res = await client.post(`/admin/hr/attendance`, { employeeId, status });
    return res.data;
  }
};
