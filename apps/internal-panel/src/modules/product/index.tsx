import { Routes, Route, NavLink, Navigate, useLocation, Link } from 'react-router-dom';
import { Layers, PackageSearch, Home, Tags, FileText, Image as ImageIcon, BarChart2, Star, PieChart as PieChartIcon, Settings, Search, Bell } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoryManager } from './CategoryManager';
import ProductManager from './ProductManager';
import ProductDashboard from './ProductDashboard';

import VariantScreen from './VariantScreen';
import IngredientScreen from './IngredientScreen';
import MediaScreen from './MediaScreen';
import PricingManager from './PricingManager';
import ReviewManager from './ReviewManager';
import ReportDashboard from './ReportDashboard';
import ProductSettings from './ProductSettings';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';

const queryClient = new QueryClient();

export const ProductModuleRoutes = () => {

  const navItems = [
    { name: 'Dashboard', path: '/product', icon: Home },
    { name: 'Products', path: '/product/list', icon: PackageSearch },
    { name: 'Categories', path: '/product/categories', icon: Layers },
    { name: 'Variants', path: '/product/variants', icon: Tags },
    { name: 'Ingredients', path: '/product/ingredients', icon: FileText },
    { name: 'Media Library', path: '/product/media', icon: ImageIcon },
    { name: 'Pricing', path: '/product/pricing', icon: BarChart2 },
    { name: 'Reviews', path: '/product/reviews', icon: Star },
    { name: 'Reports', path: '/product/reports', icon: PieChartIcon },
    { name: 'Settings', path: '/product/settings', icon: Settings },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full">
        {/* Module Sidebar Nav */}
        <nav className="w-56 bg-white/50 backdrop-blur-md border-r border-rose-100 p-4 space-y-2 shrink-0 rounded-l-2xl shadow-sm overflow-y-auto hidden md:block">
          <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-4 pl-3">
            Product Management
          </h3>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/product'}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 font-semibold shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sub-routes */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#fff5f7] rounded-r-2xl border-y border-r border-rose-100 overflow-hidden">
          
          {/* Top Header & Search Bar matching screenshot */}
          <div className="bg-white/80 backdrop-blur-md border-b border-rose-100/50 p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-10 shrink-0">
            <div className="relative flex-1 max-w-xl">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, SKU, categories..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 text-sm transition-all"
              />
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link to="/product/notifications" className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
              </Link>
              <Link to="/product/profile" className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm shadow-sm ring-2 ring-white">
                  AD
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-700">Product Manager</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<ProductDashboard />} />
              <Route path="/list" element={<ProductManager />} />
              <Route path="/categories" element={<CategoryManager />} />
              <Route path="/variants" element={<VariantScreen />} />
              <Route path="/ingredients" element={<IngredientScreen />} />
              <Route path="/media" element={<MediaScreen />} />
              <Route path="/pricing" element={<PricingManager />} />
              <Route path="/reviews" element={<ReviewManager />} />
              <Route path="/reports" element={<ReportDashboard />} />
              <Route path="/settings" element={<ProductSettings />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/notifications" element={<NotificationScreen />} />
              <Route path="*" element={<Navigate to="/product" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};
