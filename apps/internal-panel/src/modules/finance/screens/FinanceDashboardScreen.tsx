import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import StatCard from '../../../components/StatCard';
import { 
  TrendingUp, TrendingDown, Wallet, Receipt, ShoppingBag, Landmark,
  PieChart as PieChartIcon, FileText, CheckCircle2, Clock, XCircle, FileSignature
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  PieChart, Pie, Cell 
} from 'recharts';


const useFinanceOverview = () => useQuery({
  queryKey: ['financeOverview'],
  queryFn: async () => {
    const res = await api.get('/admin/finance/overview');
    return res.data;
  }
});

const revenueData = [
  { day: '01 May', revenue: 2000000, orders: 1500000 },
  { day: '06 May', revenue: 2400000, orders: 1800000 },
  { day: '11 May', revenue: 2200000, orders: 1600000 },
  { day: '16 May', revenue: 3100000, orders: 2200000 },
  { day: '21 May', revenue: 2800000, orders: 2100000 },
  { day: '26 May', revenue: 4200000, orders: 3200000 },
  { day: '31 May', revenue: 4500000, orders: 3500000 },
];

const sourceData = [
  { name: 'Online Payments', value: 60, color: '#f43f5e' },
  { name: 'COD', value: 25, color: '#fb7185' },
  { name: 'Wallet', value: 8, color: '#a78bfa' },
  { name: 'Coupons', value: 5, color: '#8b5cf6' },
  { name: 'Others', value: 2, color: '#cbd5e1' },
];

const recentInvoices = [
  { id: 'INV-2025-156', date: '18 May 2025', amount: 24560, status: 'Paid' },
  { id: 'INV-2025-155', date: '17 May 2025', amount: 18750, status: 'Paid' },
  { id: 'INV-2025-154', date: '16 May 2025', amount: 32890, status: 'Pending' },
  { id: 'INV-2025-153', date: '15 May 2025', amount: 11230, status: 'Overdue' },
  { id: 'INV-2025-152', date: '14 May 2025', amount: 9870, status: 'Paid' },
];

const expensesData = [
  { name: 'Marketing Expenses', amount: 245000, percentage: 32, icon: TrendingUp },
  { name: 'Salary & Benefits', amount: 380000, percentage: 28, icon: Wallet },
  { name: 'Packaging & Supplies', amount: 125000, percentage: 18, icon: ShoppingBag },
  { name: 'Logistics & Shipping', amount: 95000, percentage: 12, icon: Receipt },
  { name: 'Other Expenses', amount: 80000, percentage: 10, icon: FileText },
];

export default function FinanceDashboardScreen() {
  const { data: _overview, isLoading: _isLoading } = useFinanceOverview();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>Finance Dashboard</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Revenue" value="28,94,510" prefix="₹" subtitle="↑ 22.5% from last month" icon={Wallet} />
        <StatCard label="Total Orders" value="3,782" subtitle="↑ 18.3% from last month" icon={ShoppingBag} />
        <StatCard label="Net Profit" value="7,82,210" prefix="₹" subtitle="↑ 24.7% from last month" icon={PieChartIcon} />
        <StatCard label="Total Payouts" value="18,45,600" prefix="₹" subtitle="↑ 16.8% from last month" icon={Landmark} />
        <StatCard label="Outstanding Amount" value="2,34,560" prefix="₹" subtitle="↓ 8.6% from last month" icon={TrendingDown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Overview Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Revenue Overview</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis 
                  axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10}
                  tickFormatter={(value) => `₹${value / 100000}L`} 
                />
                <Tooltip cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#f43f5e" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="orders" name="Orders" stroke="#fb7185" strokeWidth={3} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f43f5e]" /> Revenue (₹)</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#fb7185]" /> Orders</span>
          </div>
        </div>

        {/* Revenue by Source Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-800">Revenue by Source</h3>
          </div>
          <div className="flex items-center justify-center h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-slate-800">₹28.94L</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {sourceData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Invoices Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50 col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Invoices Overview</h3>
            <span className="text-xs text-brand font-semibold cursor-pointer">View All</span>
          </div>
          <div className="space-y-4">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-rose-300" />
                  <div>
                    <p className="font-semibold text-slate-700">{inv.id}</p>
                    <p className="text-xs text-slate-400">{inv.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">₹{inv.amount.toLocaleString('en-IN')}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    inv.status === 'Paid' ? 'text-emerald-500' : inv.status === 'Pending' ? 'text-orange-500' : 'text-red-500'
                  }`}>{inv.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payouts Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50 col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Payouts Summary</h3>
              <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
                <option>This Month</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <Wallet className="w-4 h-4 text-slate-400" /> Total Payouts
                </div>
                <span className="font-bold text-slate-800">₹18,45,600</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Successful Payouts
                </div>
                <span className="font-bold text-slate-800">₹17,92,300</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <Clock className="w-4 h-4 text-orange-400" /> Pending Payouts
                </div>
                <span className="font-bold text-slate-800">₹53,300</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <XCircle className="w-4 h-4 text-red-500" /> Failed Payouts
                </div>
                <span className="font-bold text-slate-800">₹0</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 bg-rose-50 text-brand font-semibold rounded-xl hover:bg-rose-100 transition-colors">
            Manage Payouts
          </button>
        </div>

        {/* Expenses Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50 col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Expenses Overview</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
              <option>This Month</option>
            </select>
          </div>
          <div className="space-y-4">
            {expensesData.map((exp, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                    <exp.icon className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{exp.name}</p>
                    <p className="text-[10px] font-bold text-slate-400">{exp.percentage}%</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-800">₹{exp.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-sm">
              <span className="font-bold text-rose-800">Total Expenses</span>
              <span className="font-bold text-rose-800">₹8,25,000</span>
            </div>
          </div>
        </div>

        {/* Tax Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100/50 col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Tax Summary</h3>
              <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
                <option>This Month</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <FileSignature className="w-4 h-4 text-slate-400" /> GST Collected
                </div>
                <span className="font-bold text-slate-800">₹2,34,560</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <FileSignature className="w-4 h-4 text-slate-400" /> GST Paid
                </div>
                <span className="font-bold text-slate-800">₹1,89,450</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <FileSignature className="w-4 h-4 text-slate-400" /> TDS
                </div>
                <span className="font-bold text-slate-800">₹35,600</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-brand">Net Tax Payable</span>
                <span className="font-bold text-brand">₹9,510</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 bg-rose-50 text-brand font-semibold rounded-xl hover:bg-rose-100 transition-colors">
            View Tax Report
          </button>
        </div>
        
      </div>
    </div>
  );
}
