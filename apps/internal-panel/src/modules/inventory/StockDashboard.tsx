
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Box, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StockDashboard() {
  const { data: stockList = [], isLoading } = useQuery({
    queryKey: ['inventory', 'stock'],
    queryFn: async () => {
      const res = await api.get('/inventory/stock');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading inventory data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
          Inventory Overview
        </h2>
        <div className="flex gap-3">
          <Link
            to="/inventory/intake"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            Stock Intake
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-3 mb-2 text-indigo-600">
            <Box className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide text-slate-500">Total Unique SKUs</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mt-auto">{stockList.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-3 mb-2 text-emerald-600">
            <Box className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide text-slate-500">Total Available Units</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mt-auto">
            {stockList.reduce((acc: number, cur: any) => acc + cur.quantity, 0)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-3 mb-2 text-amber-500">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide text-slate-500">Reserved for Orders</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mt-auto">
            {stockList.reduce((acc: number, cur: any) => acc + cur.reservedQty, 0)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-3 mb-2 text-rose-500">
            <Clock className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide text-slate-500">Near Expiry (Dummy)</span>
          </div>
          <div className="text-3xl font-bold text-slate-800 mt-auto">0</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800">
          Stock Ledger Summary
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4">Available Qty</th>
                <th className="px-6 py-4">Reserved Qty</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stockList.map((stock: any) => (
                <tr key={stock.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{stock.sku}</td>
                  <td className="px-6 py-4">{stock.warehouse?.name || stock.warehouseId}</td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">{stock.quantity}</td>
                  <td className="px-6 py-4">{stock.reservedQty}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs flex items-center gap-1 justify-end w-full">
                      View Ledger <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {stockList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No stock found. Try intaking some stock!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
