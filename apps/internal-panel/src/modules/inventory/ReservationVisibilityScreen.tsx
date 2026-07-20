import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ArrowLeft, Search, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReservationVisibilityScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: stockList, isLoading } = useQuery({
    queryKey: ['inventory', 'stock'],
    queryFn: () => inventoryApi.getGlobalStock(),
  });

  // Filter for items that actually have reserved stock, then by search term
  const reservedStock = stockList?.filter(item => item.reserved > 0)
    .filter(item => 
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stock Reservations</h1>
          <p className="text-slate-500 text-sm mt-1">View inventory currently locked by Order Management.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center text-slate-700 font-medium">
            <Lock className="h-5 w-5 text-amber-500 mr-2" />
            Currently Reserved: {reservedStock.length} SKUs
          </div>

          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search locked SKUs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Loading reservation data...</div>
          ) : reservedStock.length === 0 ? (
            <div className="p-16 text-center text-slate-500 bg-slate-50">
              <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-green-500 opacity-80" />
              <p className="text-lg font-medium text-slate-700">No active reservations.</p>
              <p className="mt-1">All stock is currently available for allocation.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Physical</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-amber-600 uppercase tracking-wider">Locked (Reserved)</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-green-600 uppercase tracking-wider">Sellable (Available)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {reservedStock.map((item: any, idx: number) => {
                  const total = item.available + item.reserved;
                  const lockedPercentage = Math.round((item.reserved / total) * 100);
                  
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-700 font-medium">{total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-amber-600">
                        {item.reserved}
                        <span className="text-xs font-normal text-amber-500/70 ml-1">({lockedPercentage}%)</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600">{item.available}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
