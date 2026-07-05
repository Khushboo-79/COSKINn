import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Layers, Tags, PackageSearch } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrandManager } from './BrandManager';
import { CategoryManager } from './CategoryManager';

const queryClient = new QueryClient();

import ProductManager from './ProductManager';

export const ProductModuleRoutes = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Products', path: '/product', icon: PackageSearch },
    { name: 'Brands', path: '/product/brands', icon: Tags },
    { name: 'Categories', path: '/product/categories', icon: Layers },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full">
        {/* Module Sidebar Nav */}
        <nav className="w-56 bg-white/50 backdrop-blur-md border-r border-rose-100 p-4 space-y-2 shrink-0 rounded-l-2xl shadow-sm">
          <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-4 pl-3">
            Product Management
          </h3>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200 translate-x-1'
                    : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600 hover:translate-x-1'
                }`}
              >
                <Icon size={18} className={isActive ? 'animate-pulse' : ''} />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sub-routes */}
        <div className="flex-1 p-6 overflow-y-auto bg-white/30 backdrop-blur-sm rounded-r-2xl border-y border-r border-rose-100">
          <Routes>
            <Route path="/" element={<ProductManager />} />
            <Route path="/brands" element={<BrandManager />} />
            <Route path="/categories" element={<CategoryManager />} />
            <Route path="*" element={<Navigate to="/product" replace />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
};
