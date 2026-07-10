import { PackageSearch, Search, Filter, Plus, DownloadCloud, MoreVertical } from 'lucide-react';

import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';

export default function ProductsListScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [productsRes, stockRes] = await Promise.all([
          api.get('/product'),
          api.get('/inventory/stock')
        ]);
        
        // Merge product info with stock info by sku
        const stockMap = new Map();
        stockRes.data.forEach((stockItem: any) => {
          if (!stockMap.has(stockItem.sku)) {
            stockMap.set(stockItem.sku, { qty: 0, reserved: 0, reorderThreshold: stockItem.reorderThreshold || 100 });
          }
          const current = stockMap.get(stockItem.sku);
          current.qty += stockItem.availableQty;
          current.reserved += stockItem.reservedQty;
        });

        const mergedProducts = (productsRes.data.data || productsRes.data).map((p: any) => {
          const stock = stockMap.get(p.sku) || { qty: 0, reorderThreshold: 100 };
          let status = 'Out of Stock';
          if (stock.qty > stock.reorderThreshold) status = 'In Stock';
          else if (stock.qty > 0) status = 'Low Stock';

          return {
            sku: p.sku,
            name: p.name,
            category: p.category?.name || 'Uncategorized',
            price: `₹${p.price || 0}`,
            qty: stock.qty,
            threshold: stock.reorderThreshold,
            status: status
          };
        });
        
        setProducts(mergedProducts);
      } catch (error) {
        console.error('Failed to fetch products catalog', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Products Catalog</h2>
          <p className="text-sm text-slate-500 mt-1">Manage SKUs, view stock levels, and set reorder thresholds.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
            <DownloadCloud className="w-4 h-4" /> Export
          </button>
          <button className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm shadow-sm">
            <Plus className="w-4 h-4" /> New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Product Name & SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Retail Price</th>
                <th className="px-6 py-4 font-semibold text-right">Available Qty</th>
                <th className="px-6 py-4 font-semibold text-right">Threshold</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Loading catalog...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.sku} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                        <PackageSearch className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{product.name}</p>
                        <p className="text-xs font-mono text-slate-500 mt-0.5">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{product.price}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-slate-800">{product.qty.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 font-medium">{product.threshold}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      product.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                      product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                      'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm">
          <span className="text-slate-500">Showing 1 to 8 of 256 products</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
