import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PanelHeader from '../../components/PanelHeader';
import StatCard from '../../components/StatCard';
import { Truck,  MapPin, ArrowUpRight, ArrowDownRight,
  Search,  AlertTriangle,  Clock,
  Warehouse as WarehouseIcon, Box } from 'lucide-react';

const useWarehouseOverview = () => useQuery({
  queryKey: ['warehouseOverview'],
  queryFn: async () => ({
    totalLocations: 4,
    totalStock: 12_450,
    inboundToday: 32,
    outboundToday: 27,
    lowStockAlerts: 8,
    pendingReceival: 14,
  })
});

const useLocations = () => useQuery({
  queryKey: ['warehouseLocations'],
  queryFn: async () => ([
    { id: 'WH-001', name: 'Mumbai Central Hub', city: 'Mumbai', capacity: 5000, used: 3850, status: 'Active' },
    { id: 'WH-002', name: 'Delhi North Depot', city: 'New Delhi', capacity: 3000, used: 2100, status: 'Active' },
    { id: 'WH-003', name: 'Bangalore Tech Park', city: 'Bangalore', capacity: 2500, used: 2400, status: 'Near Full' },
    { id: 'WH-004', name: 'Hyderabad Logistics', city: 'Hyderabad', capacity: 2000, used: 1200, status: 'Active' },
  ])
});

const useShipments = () => useQuery({
  queryKey: ['warehouseShipments'],
  queryFn: async () => ([
    { id: 'SHP-3001', type: 'Inbound', from: 'Supplier - BeautyWholesale', to: 'Mumbai Central Hub', items: 120, status: 'In Transit', eta: '2026-07-07' },
    { id: 'SHP-3002', type: 'Outbound', from: 'Delhi North Depot', to: 'Customer Orders', items: 85, status: 'Dispatched', eta: '2026-07-06' },
    { id: 'SHP-3003', type: 'Inbound', from: 'Supplier - SkinCare Ltd', to: 'Bangalore Tech Park', items: 200, status: 'Pending', eta: '2026-07-08' },
    { id: 'SHP-3004', type: 'Outbound', from: 'Mumbai Central Hub', to: 'Customer Orders', items: 56, status: 'Delivered', eta: '2026-07-05' },
    { id: 'SHP-3005', type: 'Transfer', from: 'Hyderabad Logistics', to: 'Mumbai Central Hub', items: 45, status: 'In Transit', eta: '2026-07-07' },
    { id: 'SHP-3006', type: 'Inbound', from: 'Supplier - OrganicCo', to: 'Delhi North Depot', items: 150, status: 'In Transit', eta: '2026-07-08' },
  ])
});

const useLowStock = () => useQuery({
  queryKey: ['lowStockItems'],
  queryFn: async () => ([
    { sku: 'CSK-SERUM-001', name: 'Vitamin C Serum 30ml', location: 'Mumbai', qty: 5, minQty: 50 },
    { sku: 'CSK-CREAM-012', name: 'Night Repair Cream', location: 'Delhi', qty: 8, minQty: 30 },
    { sku: 'CSK-MASK-005', name: 'Charcoal Face Mask', location: 'Bangalore', qty: 3, minQty: 25 },
    { sku: 'CSK-TONE-008', name: 'Rose Water Toner', location: 'Mumbai', qty: 12, minQty: 40 },
  ])
});

export default function WarehousePanel() {
  const [activeTab, setActiveTab] = useState<'locations' | 'shipments' | 'lowstock'>('locations');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: overview, isLoading: overviewLoading } = useWarehouseOverview();
  const { data: locations } = useLocations();
  const { data: shipments } = useShipments();
  const { data: lowStock } = useLowStock();

  const tabs = [
    { key: 'locations' as const, label: 'Locations', icon: MapPin },
    { key: 'shipments' as const, label: 'Shipments', icon: Truck },
    { key: 'lowstock' as const, label: 'Low Stock Alerts', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Warehouse Management"
        subtitle="Inventory locations, shipments, and stock tracking"
        icon={WarehouseIcon}
      />

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />
          ))}
        </div>
      ) : overview && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Warehouse Locations" value={overview.totalLocations} icon={MapPin} />
          <StatCard label="Total Stock Units" value={overview.totalStock} icon={Box} />
          <StatCard label="Inbound Today" value={overview.inboundToday} icon={ArrowDownRight} />
          <StatCard label="Outbound Today" value={overview.outboundToday} icon={ArrowUpRight} />
          <StatCard label="Low Stock Alerts" value={overview.lowStockAlerts} icon={AlertTriangle} />
          <StatCard label="Pending Receival" value={overview.pendingReceival} icon={Clock} />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? 'border-[#FF0069] text-[#FF0069]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Locations Tab */}
      {activeTab === 'locations' && locations && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {locations.map(loc => {
            const usagePercent = Math.round((loc.used / loc.capacity) * 100);
            return (
              <div key={loc.id} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{loc.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> {loc.city}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    loc.status === 'Near Full' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {loc.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capacity Usage</span>
                    <span className="font-semibold text-gray-700">{loc.used.toLocaleString()} / {loc.capacity.toLocaleString()} units</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        usagePercent > 90 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                        usagePercent > 70 ? 'bg-gradient-to-r from-orange-400 to-[#FFD498]' :
                        'bg-gradient-to-r from-[#FF0069] to-[#FFD498]'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-right">{usagePercent}% used</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Shipments Tab */}
      {activeTab === 'shipments' && shipments && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shipments..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF0069]/30 focus:border-[#FF0069] outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">From</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">To</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Items</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shipments
                  .filter(s => !searchTerm || s.id.toLowerCase().includes(searchTerm.toLowerCase()) || s.from.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(s => (
                  <tr key={s.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-mono text-gray-700">{s.id}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        s.type === 'Inbound' ? 'bg-blue-100 text-blue-700' :
                        s.type === 'Outbound' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {s.type === 'Inbound' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                        {s.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 max-w-[180px] truncate">{s.from}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 max-w-[180px] truncate">{s.to}</td>
                    <td className="px-5 py-3.5 text-sm text-center font-semibold text-gray-700">{s.items}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        s.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        s.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        s.status === 'Dispatched' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Low Stock Tab */}
      {activeTab === 'lowstock' && lowStock && (
        <div className="space-y-3">
          {lowStock.map(item => (
            <div key={item.sku} className="bg-white/60 backdrop-blur-xl border border-red-100 rounded-2xl p-5 shadow-md flex items-center justify-between hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{item.sku} • {item.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-500">{item.qty} left</p>
                <p className="text-xs text-gray-400">Min: {item.minQty} units</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
