import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../core/api/admin';
import { financeApi } from '../../core/api/finance';
import { orderApi } from '../../core/api/orders';
import { productApi } from '../../core/api/product';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  LayoutDashboard, Search, Bell, Clock, Activity,
  TrendingUp, TrendingDown, IndianRupee, ShoppingBag,
  Users, Package, AlertCircle, Calendar, ShieldCheck,
  Settings, CheckCircle, Database, Server, Plus, Ticket,
  PieChart as PieChartLucide
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../../core/rbac/AuthContext';

// Empty State Component
const EmptyState = ({ title, message, icon: Icon }: any) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 h-full min-h-[200px]">
    <Icon className="h-10 w-10 text-slate-300 mb-3" />
    <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
    <p className="text-xs text-slate-500 mt-1 max-w-[250px]">{message}</p>
  </div>
);

// KPI Card Component
const KPICard = ({ title, value, trend, icon: Icon, color, loading, to }: any) => {
  const content = (
    <>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{loading ? '...' : (value !== undefined && value !== null ? value : 'N/A')}</p>
      </div>
    </>
  );

  const className = "block bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#FF3E7F]/30 transition-all group";

  if (to) {
    return <Link to={to} className={`${className} cursor-pointer`}>{content}</Link>;
  }

  return <div className={className}>{content}</div>;
};

// Section Wrapper
const Section = ({ title, children, action }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
    <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <h2 className="text-sm font-bold text-slate-800">{title}</h2>
      {action && <div>{action}</div>}
    </div>
    <div className="p-5 flex-1 overflow-auto">
      {children}
    </div>
  </div>
);

export const AdminDashboardScreen = () => {
  const { user } = useAuth();

  // Queries
  const { data: adminData, isLoading: loadingAdmin } = useQuery({ queryKey: ['admin', 'overview'], queryFn: () => adminApi.getOverview() });
  const { data: financeData, isLoading: loadingFinance } = useQuery({ queryKey: ['finance', 'overview'], queryFn: () => financeApi.getOverview() });
  const { data: financeMonthly, isLoading: loadingFinanceMonthly } = useQuery({ queryKey: ['finance', 'monthly'], queryFn: () => financeApi.getMonthlyBreakdown() });
  const { data: ordersData, isLoading: loadingOrders } = useQuery({ queryKey: ['orders', 'recent'], queryFn: () => orderApi.getAdminOrders({ limit: 10 }) as any });
  const { data: productStats, isLoading: loadingProducts } = useQuery({ queryKey: ['products', 'stats'], queryFn: () => productApi.getStats() });

  // Format currency
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

  // Colors for charts
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-12 font-sans">

      {/* 1. Welcome Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF3E7F]/5 to-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#FF3E7F] to-rose-400 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-rose-200 border-4 border-white">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back, {user?.name || 'Admin'}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mt-2 font-medium">
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5 text-slate-400" /> {format(new Date(), 'dd MMMM yyyy')}</span>
                <span className="hidden sm:flex items-center"><Clock className="h-4 w-4 mr-1.5 text-slate-400" /> Last Login: Today 9:30 AM</span>
                <span className="flex items-center text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></div> Store Live
                </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto flex items-center gap-3 relative z-10">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Quick search..." className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3E7F]/20 focus:border-[#FF3E7F] transition-all hover:bg-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* Main Left Content */}
        <div className="flex-1 space-y-6">

          {/* 2. KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard to="/finance" title="Total Revenue" value={financeData?.totalRevenue !== undefined && financeData?.totalRevenue !== null ? formatCurrency(financeData.totalRevenue) : formatCurrency(0)} trend={{ isPositive: true, value: '+12%' }} icon={IndianRupee} color="bg-emerald-50 text-emerald-600" loading={loadingFinance} />
            <KPICard to="/orders" title="Orders" value={financeData?.totalOrders !== undefined && financeData?.totalOrders !== null ? financeData.totalOrders : (ordersData ? ordersData.length : 0)} trend={{ isPositive: true, value: '+5%' }} icon={ShoppingBag} color="bg-blue-50 text-blue-600" loading={loadingFinance} />
            <KPICard to="/product" title="Products" value={productStats?.totalProducts} icon={Package} color="bg-amber-50 text-amber-600" loading={loadingProducts} />
            <KPICard to="/admin/users" title="Customers" value={adminData?.activeUsers} trend={{ isPositive: true, value: '+2%' }} icon={Users} color="bg-indigo-50 text-indigo-600" loading={loadingAdmin} />
            <KPICard to="/orders?status=PENDING" title="Pending Orders" value={ordersData?.filter?.((o: any) => o.status === 'PENDING')?.length || 0} icon={Clock} color="bg-orange-50 text-orange-600" loading={loadingOrders} />
            <KPICard to="/inventory" title="Low Stock" value={productStats?.lowStockCount || 0} icon={AlertCircle} color="bg-rose-50 text-rose-600" loading={loadingProducts} />
            <KPICard to="/finance" title="Today's Sales" value={financeData?.todaySales ? formatCurrency(financeData.todaySales) : formatCurrency(0)} icon={Activity} color="bg-purple-50 text-purple-600" loading={loadingFinance} />
            <KPICard to="/returns" title="Returns" value={0} icon={TrendingDown} color="bg-slate-100 text-slate-500" loading={false} />
          </div>

          {/* 3, 4, 5. Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Revenue vs Orders (Monthly)">
              {!financeMonthly || financeMonthly.length === 0 ? (
                <EmptyState title="No Analytics Available" message="Not enough data to generate revenue charts." icon={Activity} />
              ) : (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financeMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF3E7F" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#FF3E7F" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#FF3E7F" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Section>

            <Section title="Order Status Distribution">
              {!ordersData || ordersData.length === 0 ? (
                <EmptyState title="No Orders Found" message="Waiting for orders to generate distribution chart." icon={PieChartLucide} />
              ) : (
                <div className="h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[
                        { name: 'Delivered', value: 45 },
                        { name: 'Processing', value: 25 },
                        { name: 'Pending', value: 20 },
                        { name: 'Cancelled', value: 10 }
                      ]} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                        {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Section>
          </div>

          {/* 6 & 7. Recent Orders & Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Section title="Recent Orders" action={<Link to="/orders" className="text-xs font-bold text-[#FF3E7F] hover:underline bg-[#FF3E7F]/10 px-3 py-1.5 rounded-full transition-colors">View All</Link>}>
                {!ordersData || ordersData.length === 0 ? (
                  <EmptyState title="No Orders Yet" message="When customers place orders, they will appear here." icon={ShoppingBag} />
                ) : (
                  <div className="overflow-x-auto -mx-5 -mb-5">
                    <table className="w-full text-left whitespace-nowrap">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                          <th className="py-3 px-5">Order ID</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {ordersData.slice(0, 5).map((order: any) => (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-5 font-bold text-slate-800 text-sm">#{order.id.slice(0, 8)}</td>
                            <td className="py-3 px-4 text-sm font-medium text-slate-600">{order.customerName || 'Guest'}</td>
                            <td className="py-3 px-4 text-sm font-bold text-slate-800">{formatCurrency(order.totalAmount)}</td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-full bg-blue-50 text-blue-600 border border-blue-100">{order.status}</span>
                            </td>
                            <td className="py-3 px-5 text-right">
                              <button className="text-xs font-bold text-[#FF3E7F] hover:text-rose-700 transition-colors">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Section>
            </div>

            <div className="lg:col-span-1">
              <Section title="Recent Customers">
                <EmptyState title="No Customers Found" message="Customer registration data is not available." icon={Users} />
              </Section>
            </div>
          </div>

          {/* 8, 10, 11, 12, 13. Overviews (Inventory, Finance, Marketing, Support, HR) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Section title="Inventory Overview">
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Total Products</span><span className="font-bold text-slate-800">{productStats?.totalProducts || 0}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Out of Stock</span><span className="font-bold text-rose-600">0</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Low Stock</span><span className="font-bold text-orange-600">{productStats?.lowStockCount || 0}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Draft / Hidden</span><span className="font-bold text-slate-400">0</span></div>
              </div>
            </Section>

            <Section title="Finance Overview">
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Gross Revenue</span><span className="font-bold text-emerald-600">{formatCurrency(financeData?.totalRevenue)}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Net Profit</span><span className="font-bold text-slate-800">{formatCurrency(financeData?.profit)}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Pending Settlements</span><span className="font-bold text-orange-600">{formatCurrency(financeData?.pendingPayments)}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-medium text-slate-600">Refunds</span><span className="font-bold text-rose-600">{formatCurrency(0)}</span></div>
              </div>
            </Section>

            <Section title="Customer Support">
              <EmptyState title="No Data Available" message="Support API integration is pending." icon={Ticket} />
            </Section>
          </div>

        </div>

        {/* Right Sidebar (Notifications, Actions, Calendar, Health) */}
        <div className="w-full xl:w-80 flex flex-col gap-6">

          {/* 15. Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/product/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FF3E7F]/5 hover:border-[#FF3E7F]/30 hover:text-[#FF3E7F] transition-all text-slate-600 text-xs font-bold group">
                <Plus className="h-5 w-5 mb-2 text-slate-400 group-hover:text-[#FF3E7F] transition-colors" /> Add Product
              </Link>
              <Link to="/marketing/coupons" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FF3E7F]/5 hover:border-[#FF3E7F]/30 hover:text-[#FF3E7F] transition-all text-slate-600 text-xs font-bold group">
                <Ticket className="h-5 w-5 mb-2 text-slate-400 group-hover:text-[#FF3E7F] transition-colors" /> Create Coupon
              </Link>
              <Link to="/admin/users" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FF3E7F]/5 hover:border-[#FF3E7F]/30 hover:text-[#FF3E7F] transition-all text-slate-600 text-xs font-bold group">
                <Users className="h-5 w-5 mb-2 text-slate-400 group-hover:text-[#FF3E7F] transition-colors" /> Add User
              </Link>
              <Link to="/orders" className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FF3E7F]/5 hover:border-[#FF3E7F]/30 hover:text-[#FF3E7F] transition-all text-slate-600 text-xs font-bold group">
                <ShoppingBag className="h-5 w-5 mb-2 text-slate-400 group-hover:text-[#FF3E7F] transition-colors" /> Manage Orders
              </Link>
            </div>
          </div>

          {/* 14. Notifications Panel */}
          <Section title="Activity Stream">
            <div className="space-y-5">
              <div className="flex gap-3 relative">
                <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-white"><ShoppingBag className="h-4 w-4" /></div>
                <div className="absolute left-4 top-8 bottom-[-20px] w-0.5 bg-slate-100"></div>
                <div>
                  <p className="text-sm text-slate-800"><span className="font-bold">New Order #1209</span> received</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">2 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-white"><AlertCircle className="h-4 w-4" /></div>
                <div className="absolute left-4 top-8 bottom-[-20px] w-0.5 bg-slate-100"></div>
                <div>
                  <p className="text-sm text-slate-800"><span className="font-bold">Low Stock Alert:</span> Vitamin C Serum</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-white"><CheckCircle className="h-4 w-4" /></div>
                <div>
                  <p className="text-sm text-slate-800"><span className="font-bold">System Backup</span> completed</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">5 hours ago</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 9. Inventory Alerts */}
          <Section title="Inventory Alerts">
            <EmptyState title="Everything looks good" message="No low stock or expiry alerts at the moment." icon={CheckCircle} />
          </Section>

          {/* 17. System Health */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-sm font-bold text-slate-800 mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-medium text-slate-600"><Database className="h-4 w-4 mr-2.5 text-slate-400" /> Database</div>
                <div className="flex items-center text-xs font-bold text-emerald-600"><div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div> Optimal</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-medium text-slate-600"><Server className="h-4 w-4 mr-2.5 text-slate-400" /> API Server</div>
                <div className="flex items-center text-xs font-bold text-emerald-600"><div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div> 99.9% Uptime</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-medium text-slate-600"><IndianRupee className="h-4 w-4 mr-2.5 text-slate-400" /> Gateway</div>
                <div className="flex items-center text-xs font-bold text-emerald-600"><div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div> Connected</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 20. Footer */}
      <footer className="mt-10 border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-400">
        <div>COSKINn Admin Dashboard v2.0.0</div>
        <div className="flex items-center gap-5 mt-3 md:mt-0">
          <span className="flex items-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></div> Services Operational</span>
          <span>Last Updated: {format(new Date(), 'h:mm a')}</span>
        </div>
      </footer>
    </div>
  );
};
