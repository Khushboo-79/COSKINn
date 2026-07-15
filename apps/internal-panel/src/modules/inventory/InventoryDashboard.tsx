import { 
  Package, PackageSearch, AlertTriangle, Ban, ShoppingBag,
  TrendingUp, TrendingDown, ArrowDownToLine, ArrowUpFromLine,
  ArrowRightLeft, RotateCcw, Users, FileText, Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA ---
const kpisMock = {
  totalSkus: { value: 256, trend: '+12 this month', trendUp: true },
  inStock: { value: '20,842', trend: '+8.4% vs last month', trendUp: true },
  lowStock: { value: 38, trend: '-5 vs last month', trendUp: true }, // Lower is better here, so green trend
  outOfStock: { value: 12, trend: '-3 vs last month', trendUp: true },
  pendingPos: { value: 17, subtext: '₹6,24,500 value' }
};

const stockOverviewData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1} May`,
  stock: Math.floor(Math.random() * 15000) + 5000
}));

const stockStatusDataMock = [
  { name: 'In Stock', value: 79, color: '#f43f5e' }, // rose-500
  { name: 'Low Stock', value: 14, color: '#f59e0b' }, // amber-500
  { name: 'Out of Stock', value: 6, color: '#ef4444' }, // red-500
  { name: 'Discontinued', value: 1, color: '#8b5cf6' }, // violet-500
];

const recentActivityMock = [
  { id: 1, name: 'Vitamin C Serum', desc: 'Stock In • WH-01', qty: '+120', time: '2h ago', type: 'in' },
  { id: 2, name: 'Niacinamide Cleanser', desc: 'Stock Out • Online Order', qty: '-35', time: '3h ago', type: 'out' },
  { id: 3, name: 'Sunscreen SPF 50', desc: 'Stock In • PO-1042', qty: '+200', time: '5h ago', type: 'in' },
  { id: 4, name: 'Hydrating Toner', desc: 'Transfer • WH-02 → WH-01', qty: '+80', time: '1d ago', type: 'transfer' },
  { id: 5, name: 'Mango Face Mask', desc: 'Return • Damaged', qty: '-15', time: '1d ago', type: 'return' },
];

const productStockOverview = [
  { sku: 'CSK-VC-001', name: 'Vitamin C Serum', category: 'Serums', qty: 1250, threshold: 200, status: 'In Stock' },
  { sku: 'CSK-NC-002', name: 'Niacinamide Cleanser', category: 'Cleansers', qty: 820, threshold: 150, status: 'In Stock' },
  { sku: 'CSK-SS-003', name: 'Sunscreen SPF 50', category: 'Suncare', qty: 430, threshold: 100, status: 'In Stock' },
  { sku: 'CSK-HT-004', name: 'Hydrating Toner', category: 'Toners', qty: 95, threshold: 120, status: 'Low Stock' },
  { sku: 'CSK-MF-005', name: 'Mango Face Mask', category: 'Masks', qty: 32, threshold: 80, status: 'Low Stock' },
  { sku: 'CSK-BM-006', name: 'Blueberry Moisturizer', category: 'Moisturizers', qty: 0, threshold: 60, status: 'Out of Stock' },
];

const lowStockAlerts = [
  { name: 'Hydrating Toner', available: 95, threshold: 120, color: 'text-rose-500 bg-rose-50' },
  { name: 'Mango Face Mask', available: 32, threshold: 80, color: 'text-amber-500 bg-amber-50' },
  { name: 'Aloe Vera Gel', available: 48, threshold: 100, color: 'text-emerald-500 bg-emerald-50' },
  { name: 'Retinol Night Cream', available: 55, threshold: 90, color: 'text-indigo-500 bg-indigo-50' },
];

const warehousesMock = [
  { id: 'WH-01', name: 'Main Warehouse', items: '8,420 items' },
  { id: 'WH-02', name: 'North Warehouse', items: '5,310 items' },
  { id: 'WH-03', name: 'South Warehouse', items: '4,125 items' },
  { id: 'WH-04', name: 'East Warehouse', items: '3,037 items' },
];
// -------------------

const KpiCard = ({ title, value, icon: Icon, trend, trendUp, subtext, colorClass }: any) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {trend && (
        <p className={`text-xs mt-1 font-medium flex items-center gap-1 ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </p>
      )}
      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const useInventoryStats = () => useQuery({
  queryKey: ['inventoryStats'],
  queryFn: async () => {
    const res = await api.get('/inventory/dashboard-stats');
    return res.data;
  }
});

export default function InventoryDashboard() {
  const { data: dashboardData, isLoading } = useInventoryStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const kpis = dashboardData?.kpis || kpisMock;
  const stockStatusData = dashboardData?.stockStatusData || stockStatusDataMock;
  const recentActivity = dashboardData?.recentActivity || recentActivityMock;
  const warehouseSummary = dashboardData?.warehouseSummary || warehousesMock;
  const suppliersData = dashboardData?.suppliersData || { totalSuppliers: 24, openPos: 17, goodsInTransit: 8 };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      
      {/* 1. KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard title="Total SKUs" value={kpis.totalSkus.value} trend={kpis.totalSkus.trend} trendUp={kpis.totalSkus.trendUp} icon={PackageSearch} colorClass="bg-slate-50 text-slate-600 border border-slate-200" />
        <KpiCard title="In Stock" value={kpis.inStock.value} trend={kpis.inStock.trend} trendUp={kpis.inStock.trendUp} icon={Package} colorClass="bg-rose-50 text-rose-600 border border-rose-100" />
        <KpiCard title="Low Stock Items" value={kpis.lowStock.value} trend={kpis.lowStock.trend} trendUp={kpis.lowStock.trendUp} icon={AlertTriangle} colorClass="bg-amber-50 text-amber-600 border border-amber-100" />
        <KpiCard title="Out of Stock" value={kpis.outOfStock.value} trend={kpis.outOfStock.trend} trendUp={kpis.outOfStock.trendUp} icon={Ban} colorClass="bg-red-50 text-red-600 border border-red-100" />
        <KpiCard title="Pending POs" value={kpis.pendingPos.value} subtext={kpis.pendingPos.subtext} icon={ShoppingBag} colorClass="bg-pink-50 text-pink-600 border border-pink-100" />
      </div>

      {/* 2. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Stock Overview</h3>
            <select className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockOverviewData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}K`} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="stock" fill="#fb7185" radius={[4, 4, 0, 0]} name="Stock on Hand" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-2">Stock Status</h3>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {stockStatusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-slate-800">20,892</span>
              <span className="text-xs text-slate-500 font-medium">Total Items</span>
            </div>
          </div>
          <div className="space-y-2">
            {stockStatusData.map((item: any) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Recent Stock Activity</h3>
            <Link to="/inventory/activity" className="text-xs font-semibold text-rose-600 hover:text-rose-700">View All</Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === 'in' ? 'bg-emerald-50 text-emerald-600' :
                    activity.type === 'out' ? 'bg-slate-100 text-slate-600' :
                    activity.type === 'transfer' ? 'bg-blue-50 text-blue-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {activity.type === 'in' ? <ArrowDownToLine className="w-4 h-4" /> :
                     activity.type === 'out' ? <ArrowUpFromLine className="w-4 h-4" /> :
                     activity.type === 'transfer' ? <ArrowRightLeft className="w-4 h-4" /> :
                     <RotateCcw className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors">{activity.name}</p>
                    <p className="text-[10px] font-medium text-slate-400">{activity.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${activity.qty.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{activity.qty}</p>
                  <p className="text-[10px] font-medium text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. LISTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Product Stock Overview */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Product Stock Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 font-semibold">SKU</th>
                  <th className="px-5 py-3 font-semibold">Product Name</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold text-right">Available Qty</th>
                  <th className="px-5 py-3 font-semibold text-right">Threshold</th>
                  <th className="px-5 py-3 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {productStockOverview.map((row: any) => (
                  <tr key={row.sku} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">{row.sku}</td>
                    <td className="px-5 py-3 font-semibold text-slate-800">{row.name}</td>
                    <td className="px-5 py-3 text-slate-500">{row.category}</td>
                    <td className="px-5 py-3 text-right font-semibold text-slate-700">{row.qty.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-slate-400">{row.threshold}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                        row.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        row.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm">
            <span className="text-slate-500">Showing 1 to 6 of 256 items</span>
            <Link to="/inventory/products" className="font-semibold text-rose-600 hover:text-rose-700">View All Products</Link>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">Low Stock Alerts</h3>
          </div>
          <div className="p-4 flex-1 space-y-4">
            {lowStockAlerts.map((alert: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${alert.color}`}>
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{alert.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Available: {alert.available}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-medium text-slate-400">Threshold: {alert.threshold}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <Link to="/inventory/alerts" className="text-xs font-semibold text-rose-600 hover:text-rose-700">View All Alerts</Link>
          </div>
        </div>

        {/* Suppliers & POs */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Suppliers / Purchase Orders</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Suppliers</p>
                  <p className="text-xl font-bold text-slate-800">{suppliersData.totalSuppliers}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Open POs</p>
                  <p className="text-xl font-bold text-slate-800">{suppliersData.openPos}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-600">₹6,24,500</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Goods in Transit</p>
                  <p className="text-xl font-bold text-slate-800">{suppliersData.goodsInTransit}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-600">₹2,18,300</p>
            </div>

          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <Link to="/inventory/purchase-orders" className="text-xs font-semibold text-rose-600 hover:text-rose-700">View All POs</Link>
          </div>
        </div>

        {/* Warehouse Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Warehouse Summary</h3>
          </div>
          <div className="p-5 border-b border-slate-50">
            <p className="text-xs text-slate-500 font-medium">Total Warehouses</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">4</p>
          </div>
          <div className="p-5 flex-1 space-y-4">
            {warehouseSummary.map((wh: any) => (
              <div key={wh.id} className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium"><span className="text-slate-400 font-mono text-xs mr-1">{wh.id}</span> - {wh.name}</span>
                <span className="font-bold text-slate-800 text-xs">{wh.items}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 text-center">
            <Link to="/inventory/warehouses" className="text-xs font-semibold text-rose-600 hover:text-rose-700">View All Warehouses</Link>
          </div>
        </div>

      </div>



    </div>
  );
}
