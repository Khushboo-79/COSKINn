import { useQuery } from '@tanstack/react-query';
import { hrApi } from '../../core/api/hr';
import { Building2, Users, IndianRupee } from 'lucide-react';

export const DepartmentManagementScreen = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['hr', 'payroll-summary'],
    queryFn: () => hrApi.getPayrollSummary()
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
          <p className="text-slate-500 text-sm mt-1">Overview of organizational structure and department-level headcount.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading departments...</div>
        ) : !summary || summary.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-medium text-slate-900">No departments found.</p>
            <p className="text-sm text-slate-500 mt-1">Departments are automatically created when employees are assigned to them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {summary.map((dept: any) => (
              <div key={dept.department} className="border border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-slate-100/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{dept.department}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Users className="h-4 w-4 mr-2" /> Headcount</span>
                    <span className="font-bold text-slate-900">{dept.headcount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Total Monthly CTC</span>
                    <span className="font-bold text-slate-900">₹{dept.totalCTC.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><IndianRupee className="h-4 w-4 mr-2 text-slate-300" /> Avg Salary</span>
                    <span className="font-medium text-slate-700">₹{dept.avgSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
