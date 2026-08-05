import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { adminApi } from '../../core/api/admin';
import { inventoryApi } from '../../core/api/inventory';
import { Search, Package, User, ShoppingBag, ArrowRight, Clock, Box, ShoppingCart, Tag, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GlobalSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Data Fetching
  const { data: orders } = useQuery({ queryKey: ['admin', 'orders'], queryFn: () => orderApi.getAdminOrders() });
  const { data: users } = useQuery({ queryKey: ['admin', 'users'], queryFn: () => adminApi.getUsers() });
  const { data: inventory } = useQuery({ queryKey: ['admin', 'inventory'], queryFn: () => inventoryApi.getGlobalStock() });

  const getFilteredResults = () => {
    if (!query || query.length < 2) return { orders: [], users: [], products: [] };
    const lowerQuery = query.toLowerCase();
    
    const matchedOrders = orders?.filter((o: any) => 
      o.id?.toLowerCase().includes(lowerQuery) || 
      o.customerName?.toLowerCase().includes(lowerQuery)
    ) || [];

    const matchedUsers = users?.filter((u: any) => 
      u.name?.toLowerCase().includes(lowerQuery) || 
      u.email?.toLowerCase().includes(lowerQuery)
    ) || [];

    const matchedProducts = inventory?.filter((i: any) => 
      i.name?.toLowerCase().includes(lowerQuery) || 
      i.sku?.toLowerCase().includes(lowerQuery)
    ) || [];

    return { 
      orders: activeFilter === 'All' || activeFilter === 'Orders' ? matchedOrders : [], 
      users: activeFilter === 'All' || activeFilter === 'Users' ? matchedUsers : [], 
      products: activeFilter === 'All' || activeFilter === 'Products' ? matchedProducts : [] 
    };
  };

  const results = getFilteredResults();
  const hasResults = results.orders.length > 0 || results.users.length > 0 || results.products.length > 0;

  const filters = ['All', 'Orders', 'Users', 'Products'];
  
  const recentSearches = ['Order #ORD-2938', 'Vitamin C Serum', 'jane.doe@example.com', 'SKU-8392'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col items-center justify-center pt-8 pb-2">
        <div className="inline-flex items-center justify-center p-3 bg-primary-50 text-primary-600 rounded-2xl mb-4">
          <Search className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Global Search</h1>
        <p className="text-slate-500 text-base font-medium">Search across Orders, Users, and Products instantly.</p>
      </div>

      {/* 1. The Aura Search Bar & 2. Quick Filter Chips */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="relative group mx-4 md:mx-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-primary-200 rounded-[2rem] blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative bg-white rounded-[2rem] flex items-center p-2 shadow-sm border border-slate-200 focus-within:border-primary-400 focus-within:shadow-md transition-all">
            <div className="pl-5 pr-3">
              <Search className="h-6 w-6 text-primary-500" />
            </div>
            <input
              type="text"
              className="w-full bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none text-lg text-slate-800 placeholder-slate-400 py-4 px-2"
              placeholder="Enter order ID, customer name, email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="pr-5 hidden md:flex items-center">
              <span className="font-sans font-bold text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm whitespace-nowrap">Enter</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 flex-wrap px-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === filter 
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Recent Searches & Quick Links (Before typing) */}
      {query.length < 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((rs, i) => (
                <button key={i} onClick={() => setQuery(rs)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 rounded-xl text-sm font-medium transition-colors border border-slate-100 hover:border-primary-200">
                  <Search className="h-3.5 w-3.5 opacity-50" />
                  {rs}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <Tag className="h-4 w-4 mr-2" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/orders" className="flex items-center p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#FF7F50] hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-4 w-4 text-[#FF7F50]" />
                </div>
                <span className="text-sm font-bold text-slate-700">Find Order</span>
              </Link>
              <Link to="/admin/users" className="flex items-center p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#FF7F50] hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="h-8 w-8 rounded-full bg-[#FF7F50]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 text-[#FF7F50]" />
                </div>
                <span className="text-sm font-bold text-slate-700">Search Email</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Live Results Section */}
      {query.length >= 2 && (
        <div className="max-w-5xl mx-auto">
          {/* 5. Animated Empty State */}
          {!hasResults ? (
            <div className="bg-white rounded-3xl p-16 text-center text-slate-500 flex flex-col items-center justify-center border border-slate-100 shadow-sm min-h-[400px]">
              <div className="relative mb-6">
                <Search className="h-16 w-16 text-slate-200 animate-bounce absolute -top-8 -right-8 z-10" />
                <Box className="h-24 w-24 text-slate-100" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-2">No matches found</h2>
              <p className="text-base text-slate-500 font-medium">We couldn't find anything matching "{query}". <br/>Try checking for typos or searching by ID.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column (Users & Orders) */}
              <div className="md:col-span-7 space-y-6">
                
                {/* 4. Categorized Live Results - Users */}
                {results.users.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <User className="h-4 w-4 mr-2 text-indigo-400" /> Customers & Users
                    </h3>
                    <div className="grid gap-3">
                      {results.users.map((user: any) => (
                        <Link key={user.id} to="/admin/users" className="flex items-center p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 group transition-all">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold mr-4 shrink-0 shadow-inner">
                            {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{user.name || 'Unnamed User'}</p>
                            <p className="text-sm text-slate-500 truncate">{user.email}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Categorized Live Results - Orders */}
                {results.orders.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-emerald-500" /> Recent Orders
                    </h3>
                    <div className="grid gap-3">
                      {results.orders.map((order: any) => (
                        <Link key={order.id} to={`/orders`} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:-translate-y-1 bg-white group transition-all">
                          <div className="mb-2 sm:mb-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-extrabold text-slate-900 font-mono text-sm tracking-tight">{order.id}</p>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">{order.status}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-500">{order.customerName || 'Unknown Customer'}</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                            <span className="font-extrabold text-slate-800 text-lg sm:mr-4">₹{order.totalAmount}</span>
                            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (Products) */}
              <div className="md:col-span-5 space-y-6">
                {results.products.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <Package className="h-4 w-4 mr-2 text-[#FF7F50]" /> Products & Inventory
                    </h3>
                    <div className="grid gap-4">
                      {results.products.map((item: any) => (
                        <Link key={item.id} to="/inventory" className="flex items-start p-3 rounded-2xl hover:bg-[#FF7F50]/5 border border-transparent hover:border-[#FF7F50]/20 group transition-all">
                          <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center mr-4 shrink-0 overflow-hidden shadow-inner group-hover:shadow-md transition-shadow">
                            {/* In a real app we'd have thumbnail URLs. Fallback to icon */}
                            <Package className="h-6 w-6 text-slate-400 group-hover:text-[#FF7F50] group-hover:scale-110 transition-all" />
                          </div>
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-[#FF7F50] transition-colors line-clamp-2">{item.name}</p>
                            <p className="text-[11px] font-mono font-bold text-slate-400">{item.sku}</p>
                            <div className="mt-2 flex items-center">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.available < 50 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {item.available} in stock
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};
