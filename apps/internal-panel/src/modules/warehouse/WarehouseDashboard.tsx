import { useQuery } from '@tanstack/react-query';
import { warehouseApi } from '../../core/api/warehouse';
import { orderApi } from '../../core/api/orders';
import { Package, Truck, ClipboardCheck, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WarehouseDashboard = () => {
  const { data: pos } = useQuery({
    queryKey: ['admin', 'warehouse', 'pos'],
    queryFn: () => warehouseApi.getPurchaseOrders(),
  });

  const { data: processingOrders } = useQuery({
    queryKey: ['admin', 'orders', { status: 'PROCESSING' }],
    queryFn: () => orderApi.getAdminOrders({ status: 'PROCESSING' }),
  });

  const { data: returns } = useQuery({
    queryKey: ['admin', 'returns'],
    queryFn: () => orderApi.getAllReturns(),
  });

  const pendingInbound = pos?.filter((po: any) => po.status === 'PENDING').length || 0;
  const pendingOutbound = processingOrders?.length || 0;
  // Look for returns that are RECEIVED by courier and pending QC (or just APPROVED and waiting physical arrival)
  const pendingReturns = returns?.filter((r: any) => r.status === 'APPROVED' || r.status === 'RECEIVED').length || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Operations Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time overview of warehouse workloads and queues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ArrowDownRight className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Inbound (POs)</p>
              <h2 className="text-3xl font-bold text-slate-900">{pendingInbound}</h2>
            </div>
          </div>
          <Link to="/warehouse/grn" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center relative z-10">
            View GRN Queue &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ArrowUpRight className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="h-12 w-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Outbound (Pick)</p>
              <h2 className="text-3xl font-bold text-slate-900">{pendingOutbound}</h2>
            </div>
          </div>
          <Link to="/warehouse/outbound" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center relative z-10">
            View Pack Queue &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Activity className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Returns (QC)</p>
              <h2 className="text-3xl font-bold text-slate-900">{pendingReturns}</h2>
            </div>
          </div>
          <Link to="/warehouse/returns-qc" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center relative z-10">
            View QC Queue &rarr;
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center text-slate-500 mt-8">
        <Activity className="h-16 w-16 text-slate-200 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Throughput Analytics</h3>
        <p>Daily throughput charts (Received vs Picked vs Shipped) will populate here once enough historical data is gathered.</p>
      </div>
    </div>
  );
};
