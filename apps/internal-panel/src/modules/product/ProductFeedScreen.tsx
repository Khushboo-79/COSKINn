import { useState } from 'react';
import { Search, Filter, Download, Box, PlusCircle } from 'lucide-react';

// Mock data for the product feed
const MOCK_FEED = [
  { id: 'PRD-001', name: 'Niacinamide Face Serum', sku: 'CSK-NIA-30ML', category: 'Serum', fruit: 'Watermelon', status: 'LIVE', stock: 150 },
  { id: 'PRD-002', name: 'Vitamin C Glow Moisturizer', sku: 'CSK-VITC-50G', category: 'Moisturizer', fruit: 'Orange', status: 'LIVE', stock: 85 },
  { id: 'PRD-003', name: 'Ruby Red Lip Tint', sku: 'CSK-LIP-RED', category: 'Makeup', fruit: 'Cherry', status: 'DRAFT', stock: 0 },
];

export const ProductFeedScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketing Product Feed</h1>
          <p className="text-slate-500 mt-1">Live catalog data for CRM and campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center border border-slate-200">
            <Download className="h-4 w-4 mr-2" />
            Export Feed (XML/CSV)
          </button>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search SKUs, names, or fruits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fruit Tag</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {MOCK_FEED.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <Box className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{product.name}</div>
                        <div className="text-sm text-slate-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.fruit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'LIVE' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
