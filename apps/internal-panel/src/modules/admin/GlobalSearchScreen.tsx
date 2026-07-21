import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { adminApi } from '../../core/api/admin';
import { inventoryApi } from '../../core/api/inventory';
import { Search, Package, User, ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GlobalSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // We pre-fetch data for demonstration to allow client-side filtering.
  // In a production app, the backend would have a dedicated /search endpoint.
  const { data: orders } = useQuery({ queryKey: ['admin', 'orders'], queryFn: () => orderApi.getAdminOrders() });
  const { data: users } = useQuery({ queryKey: ['admin', 'users'], queryFn: () => adminApi.getUsers() });
  const { data: inventory } = useQuery({ queryKey: ['admin', 'inventory'], queryFn: () => inventoryApi.getGlobalStock() });

  const getFilteredResults = () => {
    if (!query || query.length < 2) return { orders: [], users: [], products: [] };
    
    const lowerQuery = query.toLowerCase();
    
    const matchedOrders = orders?.filter((o: any) => 
      o.id.toLowerCase().includes(lowerQuery) || 
      o.customerName?.toLowerCase().includes(lowerQuery)
    ) || [];

    const matchedUsers = users?.filter((u: any) => 
      u.name?.toLowerCase().includes(lowerQuery) || 
      u.email.toLowerCase().includes(lowerQuery)
    ) || [];

    const matchedProducts = inventory?.filter((i: any) => 
      i.name.toLowerCase().includes(lowerQuery) || 
      i.sku.toLowerCase().includes(lowerQuery)
    ) || [];

    return { orders: matchedOrders, users: matchedUsers, products: matchedProducts };
  };

  const results = getFilteredResults();
  const hasResults = results.orders.length > 0 || results.users.length > 0 || results.products.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Global Search</h1>
        <p className="text-slate-500 text-sm">Search across Orders, Users, and Products instantly.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg focus:ring-0 focus:border-indigo-500 shadow-sm transition-colors"
          placeholder="Enter order ID, customer name, email, or product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query.length >= 2 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
          {!hasResults ? (
            <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center h-full">
              <Search className="h-12 w-12 text-slate-200 mb-4" />
              <p className="text-lg font-medium text-slate-900">No results found for "{query}"</p>
              <p className="text-sm mt-1">Try checking for typos or using different keywords.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              
              {/* Users Results */}
              {results.users.length > 0 && (
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center">
                    <User className="h-4 w-4 mr-1.5" /> Users ({results.users.length})
                  </h3>
                  <div className="space-y-1">
                    {results.users.map((user: any) => (
                      <Link 
                        key={user.id} 
                        to="/admin/users" 
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl group transition-colors"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{user.name || 'Unnamed User'}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Results */}
              {results.orders.length > 0 && (
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-1.5" /> Orders ({results.orders.length})
                  </h3>
                  <div className="space-y-1">
                    {results.orders.map((order: any) => (
                      <Link 
                        key={order.id} 
                        to="/orders" 
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl group transition-colors"
                      >
                        <div>
                          <p className="font-bold text-slate-900 font-mono text-sm">{order.id}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-slate-600">{order.customerName || 'Unknown Customer'}</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">{order.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-slate-900 mr-4">₹{order.totalAmount}</span>
                          <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products/Inventory Results */}
              {results.products.length > 0 && (
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center">
                    <Package className="h-4 w-4 mr-1.5" /> Inventory & Products ({results.products.length})
                  </h3>
                  <div className="space-y-1">
                    {results.products.map((item: any) => (
                      <Link 
                        key={item.id} 
                        to="/inventory" 
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl group transition-colors"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500 font-mono mt-0.5 text-xs">{item.sku}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium mr-4 px-2 py-1 rounded ${item.available < 50 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            Stock: {item.available}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  );
};
