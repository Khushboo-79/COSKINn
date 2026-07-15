import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { Search, Mail, Building2, Award } from 'lucide-react';
import { AddEmployeeModal } from '../components/AddEmployeeModal';

const useEmployees = () => useQuery({
  queryKey: ['employees'],
  queryFn: async () => {
    const { data } = await api.get('/admin/hr/employees');
    return data;
  }
});

export const EmployeesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: employees, isLoading } = useEmployees();

  const departments = ['All', ...new Set(employees?.map((e: any) => e.department) || [])] as string[];
  
  const filteredEmployees = employees?.filter((e: any) => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || e.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>Employee Directory</h2>
          <p className="text-sm text-slate-500">Manage all employee profiles and details.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand/90 transition-all shadow-md shadow-brand/20"
        >
          + Add Employee
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:border-brand/30 focus:ring-brand/30 rounded-xl text-sm"
          />
        </div>
        <select 
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="bg-slate-50 border-transparent focus:border-brand/30 focus:ring-brand/30 rounded-xl text-sm min-w-[150px]"
        >
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="flex-1 overflow-auto bg-white rounded-2xl shadow-sm border border-rose-100">
        {isLoading ? (
          <div className="p-8 text-center text-rose-500">Loading Employees...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredEmployees?.map((emp: any) => (
              <div key={emp.id} className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand to-rose-300 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{emp.name}</h3>
                    <p className="text-sm text-brand font-medium">{emp.designation}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>CTC: ₹{(emp.ctc / 100000).toFixed(1)} LPA</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {emp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isAddModalOpen && <AddEmployeeModal isOpen={true} onClose={() => setIsAddModalOpen(false)} />}
    </div>
  );
};
