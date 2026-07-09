import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Search, Package, Tags } from 'lucide-react';
import TagManager from './TagManager';

export default function IngredientScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      const { data } = await api.get('/product', { params: { search: searchTerm } });
      return data;
    },
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Tags className="w-6 h-6 text-rose-500" />
          Ingredients & Tag Manager
        </h1>
        <p className="text-slate-500 text-sm mt-1">Select a product to manage its ingredients, skin concerns, skin types, and benefits.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Product Selector Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-rose-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-slate-500">Loading products...</div>
            ) : products?.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">No products found.</div>
            ) : (
              products?.map((product: any) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                    selectedProductId === product.id 
                      ? 'bg-rose-50 border border-rose-200 shadow-sm' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedProductId === product.id ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${selectedProductId === product.id ? 'text-rose-700' : 'text-slate-700'}`}>
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{product.sku}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-rose-100 p-6 overflow-y-auto">
          {selectedProductId ? (
            <TagManager 
              productId={selectedProductId} 
              onClose={() => setSelectedProductId(null)} 
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                <Tags className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm font-medium">Select a product from the list to manage its ingredients and tags</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
