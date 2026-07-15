import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { Wallet, Download } from 'lucide-react';

const usePayrollSummary = () => useQuery({
  queryKey: ['payrollSummary'],
  queryFn: async () => {
    const { data } = await api.get('/admin/hr/payroll');
    return data;
  }
});

export const PayrollScreen = () => {
  const { data: payroll, isLoading } = usePayrollSummary();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>Payroll Overview</h2>
          <p className="text-sm text-slate-500">Department-wise payroll summary.</p>
        </div>
        <button className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand/90 transition-all shadow-md shadow-brand/20 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
        {isLoading ? (
          <div className="text-center text-rose-500">Loading Payroll...</div>
        ) : (
          <div className="max-w-4xl">
            <div className="bg-rose-50/50 rounded-xl p-6 border border-rose-100 mb-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-rose-800 uppercase tracking-wider mb-1">Total Monthly Liability</p>
                <p className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                  <Wallet className="text-brand w-8 h-8" />
                  ₹{payroll?.reduce((a: any, b: any) => a + b.totalCTC, 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-500 mb-1">Total Headcount</p>
                <p className="text-2xl font-bold text-slate-800">{payroll?.reduce((a: any, b: any) => a + b.headcount, 0)}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-rose-100 shadow-sm">
              <table className="min-w-full divide-y divide-rose-100">
                <thead className="bg-rose-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider">Department</th>
                    <th className="px-5 py-3 text-center text-xs font-bold text-rose-800 uppercase tracking-wider">Headcount</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-rose-800 uppercase tracking-wider">Monthly CTC</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-rose-800 uppercase tracking-wider w-1/3">Share</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-rose-50">
                  {payroll?.map((dept: any) => {
                    const maxCTC = Math.max(...payroll.map((d: any) => d.totalCTC));
                    const percentage = (dept.totalCTC / maxCTC) * 100;
                    
                    return (
                      <tr key={dept.department} className="hover:bg-rose-50/30 transition-colors">
                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">{dept.department}</td>
                        <td className="px-5 py-4 text-sm text-center font-medium text-slate-600">{dept.headcount}</td>
                        <td className="px-5 py-4 text-sm text-right font-bold text-brand">₹{dept.totalCTC.toLocaleString('en-IN')}</td>
                        <td className="px-5 py-4">
                          <div className="w-full bg-rose-100 rounded-full h-2.5">
                            <div className="bg-brand-gradient h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
