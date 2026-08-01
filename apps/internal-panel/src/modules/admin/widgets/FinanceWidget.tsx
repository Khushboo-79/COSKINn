import { useQuery } from '@tanstack/react-query';
import { financeApi } from '../../../core/api/finance';
import { Landmark, ArrowUpRight, ArrowDownRight, Loader2, CreditCard } from 'lucide-react';

export const FinanceWidget = () => {
  const { data: plSummary, isLoading: plLoading } = useQuery({
    queryKey: ['admin', 'finance-pl'],
    queryFn: () => financeApi.getPLSummary()
  });

  const { data: settlements, isLoading: stLoading } = useQuery({
    queryKey: ['admin', 'finance-settlements'],
    queryFn: () => financeApi.getRazorpaySettlements()
  });

  if (plLoading || stLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300 mb-2" />
        <span className="text-slate-500 text-sm">Loading finance data...</span>
      </div>
    );
  }

  // Extract total revenue / expenses
  const totalRevenue = plSummary?.reduce((sum: number, item: any) => sum + (item.type === 'Revenue' ? item.amount : 0), 0) || 0;
  const totalExpense = plSummary?.reduce((sum: number, item: any) => sum + (item.type === 'Expense' ? item.amount : 0), 0) || 0;
  const netIncome = totalRevenue - totalExpense;

  // Pending settlements
  const pendingSettlements = settlements?.filter((s: any) => s.status === 'PENDING') || [];
  const pendingAmount = pendingSettlements.reduce((sum: number, s: any) => sum + s.amount, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center">
            <Landmark className="h-5 w-5 mr-2 text-emerald-600" />
            Finance & Tax
          </h3>
          <p className="text-xs text-slate-500 mt-1">P&L summary and Gateway settlements</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        
        {/* P&L Mini Snapshot */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Net Income (Period)</p>
          <div className="flex items-end mb-3">
            <span className={`text-2xl font-black ${netIncome >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ₹{netIncome.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm border-t border-slate-200 pt-3">
            <div>
              <p className="text-xs text-slate-500 flex items-center"><ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500"/> Revenue</p>
              <p className="font-semibold text-slate-900">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 flex items-center"><ArrowDownRight className="h-3 w-3 mr-1 text-rose-500"/> Expense</p>
              <p className="font-semibold text-slate-900">₹{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Razorpay Settlements */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
            <CreditCard className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> Pending Settlements
          </h4>
          {pendingSettlements.length === 0 ? (
            <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">All gateway payments are settled.</p>
          ) : (
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <div>
                <p className="text-sm font-bold text-slate-900">{pendingSettlements.length} batches pending</p>
                <p className="text-xs text-amber-700 mt-0.5">Awaiting bank transfer</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-amber-600">₹{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
