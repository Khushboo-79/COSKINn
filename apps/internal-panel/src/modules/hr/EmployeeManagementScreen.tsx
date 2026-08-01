import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '../../core/api/hr';
import { Users, UserPlus, Save, Loader2, MoreVertical, IndianRupee, Phone, Mail } from 'lucide-react';

export const EmployeeManagementScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Staff');
  const [department, setDepartment] = useState('Operations');
  const [salary, setSalary] = useState<number>(50000);

  const { data: employees, isLoading } = useQuery({
    queryKey: ['hr', 'employees'],
    queryFn: () => hrApi.getEmployees()
  });

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setRole('Staff');
    setDepartment('Operations');
    setSalary(50000);
    setIsAdding(false);
  };

  const addMutation = useMutation({
    mutationFn: () => hrApi.createEmployee({ name, email, phone, role, department, salary }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr', 'employees'] });
      resetForm();
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage staff records, roles, and employment status.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 transition-colors"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add Employee
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900">Onboard New Employee</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-rose-500">*</span></label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <input 
                type="text" 
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Role / Title</label>
              <input 
                type="text" 
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Salary (CTC)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 sm:text-sm">₹</span>
                </div>
                <input 
                  type="number" 
                  value={salary}
                  onChange={e => setSalary(Number(e.target.value))}
                  className="w-full border-slate-300 rounded-lg py-2 pl-8 pr-3 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => addMutation.mutate()}
              disabled={!name || !email || addMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Employee
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300 mb-2" />
            Loading employees...
          </div>
        ) : !employees || employees.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-medium text-slate-900">No employees found.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role / Dept</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp: any) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {emp.avatar || emp.name.substring(0,2).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{emp.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-900 flex items-center"><Mail className="h-3 w-3 mr-1.5 text-slate-400" /> {emp.email}</div>
                    <div className="text-xs text-slate-500 flex items-center mt-1"><Phone className="h-3 w-3 mr-1.5 text-slate-400" /> {emp.phone || 'N/A'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-slate-900">{emp.role}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{emp.department}</div>
                  </td>
                  <td className="py-4 px-6">
                    {emp.status === 'Active' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    ) : emp.status === 'On Leave' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        On Leave
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                        Terminated
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
