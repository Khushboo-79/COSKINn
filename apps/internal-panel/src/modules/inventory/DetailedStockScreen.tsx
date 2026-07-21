import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { Search, Filter, Box, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DetailedStockScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'BATCH' | 'WAREHOUSE'>('WAREHOUSE');

  const { data: stockList, isLoading } = useQuery({
    queryKey: ['inventory', 'stock'],
    queryFn: () => inventoryApi.getGlobalStock(),
  });

  const { data: warehouses } = useQuery({
    queryKey: ['inventory', 'warehouses'],
    queryFn: inventoryApi.getWarehouses,
  });

  // Simple client-side filter
  const filteredStock = stockList?.filter(item => 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Detailed Stock View</h1>
          <p className="text-slate-500 text-sm mt-1">Breakdowns by Warehouse and Batch Number</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex bg-slate-200/50 p-1 rounded-xl">
            <button
              onClick={() => setViewType('WAREHOUSE')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center transition-all ${viewType === 'WAREHOUSE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Warehouse Pivot
            </button>
            <button
              onClick={() => setViewType('BATCH')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center transition-all ${viewType === 'BATCH' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Box className="h-4 w-4 mr-2" />
              Batch Pivot
            </button>
          </div>

          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Filter by SKU or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Loading breakdown data...</div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  {viewType === 'WAREHOUSE' ? (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Warehouse</th>
                  ) : (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch Number</th>
                  )}
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Reserved</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredStock?.map((item: any, idx: number) => {
                  // MOCKING the pivot expansion for UI purposes
                  // In a real scenario, this data would come grouped from the backend
                  const mockSplitLabel = viewType === 'WAREHOUSE' 
                    ? (warehouses && warehouses.length > 0 ? warehouses[0].name : 'Main Fulfillment Center')
                    : `BCH-${new Date().getFullYear()}-${idx + 100}`;
                    
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                        <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                          {mockSplitLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600">{item.available}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-amber-600">{item.reserved}</td>
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
