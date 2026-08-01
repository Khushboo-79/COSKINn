import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Users, ShoppingBag, LayoutDashboard, Settings, Boxes, Receipt, HeadphonesIcon, Megaphone, FileText, UserCircle, Activity } from 'lucide-react';

const SEARCH_ROUTES = [
  { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard, keywords: 'home overview dashboard' },
  { name: 'User Management', path: '/admin/users', icon: Users, keywords: 'admin users roles permissions' },
  { name: 'Catalog', path: '/product/catalog', icon: Package, keywords: 'products catalog items' },
  { name: 'Brands', path: '/product/brands', icon: Package, keywords: 'brands manufacturers' },
  { name: 'Ingredients', path: '/product/ingredients', icon: Package, keywords: 'ingredients components' },
  { name: 'Inventory Tracking', path: '/inventory/tracking', icon: Boxes, keywords: 'stock inventory levels' },
  { name: 'Orders', path: '/orders/list', icon: ShoppingBag, keywords: 'sales orders purchases' },
  { name: 'Shipping', path: '/orders/shipping', icon: ShoppingBag, keywords: 'shipping delivery logistics' },
  { name: 'Warehouse', path: '/warehouse/locations', icon: Boxes, keywords: 'warehouse locations storage' },
  { name: 'Suppliers', path: '/warehouse/suppliers', icon: Users, keywords: 'suppliers vendors partners' },
  { name: 'Purchase Orders', path: '/warehouse/po', icon: Receipt, keywords: 'purchase orders po' },
  { name: 'Customers', path: '/admin/customers', icon: Users, keywords: 'crm customers users clients' },
  { name: 'Support Tickets', path: '/support/tickets', icon: HeadphonesIcon, keywords: 'support tickets helpdesk' },
  { name: 'Live Chat', path: '/support/chat', icon: HeadphonesIcon, keywords: 'chat live messages support' },
  { name: 'Finance Dashboard', path: '/finance/dashboard', icon: Receipt, keywords: 'finance dashboard money revenue' },
  { name: 'Tax Config', path: '/finance/tax', icon: Receipt, keywords: 'taxes config rates' },
  { name: 'Master Ledger', path: '/finance/ledger', icon: Receipt, keywords: 'ledger journal entries accounting' },
  { name: 'Settlements', path: '/finance/settlements', icon: Receipt, keywords: 'settlements payouts' },
  { name: 'Coupons', path: '/marketing/coupons', icon: Megaphone, keywords: 'coupons discounts promo' },
  { name: 'Banners', path: '/marketing/banners', icon: Megaphone, keywords: 'banners hero images promos' },
  { name: 'Campaigns', path: '/marketing/campaigns', icon: Megaphone, keywords: 'campaigns marketing email' },
  { name: 'SEO Settings', path: '/marketing/seo', icon: Settings, keywords: 'seo settings search engine' },
  { name: 'Loyalty & Rewards', path: '/marketing/loyalty', icon: Megaphone, keywords: 'loyalty rewards points tiers' },
  { name: 'Abandoned Carts', path: '/marketing/abandoned-carts', icon: ShoppingBag, keywords: 'abandoned carts recovery' },
  { name: 'Blog Editor', path: '/content/blogs', icon: FileText, keywords: 'blog articles content posts' },
  { name: 'Skin Routines', path: '/content/routines', icon: FileText, keywords: 'routines skincare steps' },
  { name: 'Beauty Tips', path: '/content/tips', icon: FileText, keywords: 'tips beauty content' },
  { name: 'Legal Pages', path: '/content/legal', icon: FileText, keywords: 'legal terms privacy pages' },
  { name: 'FAQ Management', path: '/content/faqs', icon: FileText, keywords: 'faqs questions help' },
  { name: 'HR Dashboard', path: '/hr/dashboard', icon: UserCircle, keywords: 'hr human resources dashboard' },
  { name: 'Employees', path: '/hr/employees', icon: Users, keywords: 'employees staff team' },
  { name: 'Leave Management', path: '/hr/leaves', icon: UserCircle, keywords: 'leave time off vacation' },
  { name: 'Payroll', path: '/hr/payroll', icon: Receipt, keywords: 'payroll salary wages' },
  { name: 'Attendance', path: '/hr/attendance', icon: UserCircle, keywords: 'attendance clock in out' },
  { name: 'Audit Logs', path: '/audit/activity', icon: Activity, keywords: 'audit logs activity history tracking' }
];

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredRoutes = SEARCH_ROUTES.filter((route) => {
    const searchString = `${route.name} ${route.keywords}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  }).slice(0, 8); // Show top 8 results

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-slate-900/50 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-slate-200">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent border-0 py-4 pl-3 pr-4 text-slate-900 focus:ring-0 text-lg outline-none placeholder:text-slate-400"
            placeholder="Search modules, pages, or settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">ESC</div>
        </div>

        {query && filteredRoutes.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">
            No results found for "{query}". Try searching for "Orders", "Settings", or "Users".
          </div>
        )}

        {filteredRoutes.length > 0 && (
          <div className="max-h-96 overflow-y-auto py-2">
            <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">
              Modules & Pages
            </div>
            {filteredRoutes.map((route, i) => (
              <button
                key={route.path}
                className="w-full flex items-center px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 group transition-colors text-left"
                onClick={() => handleSelect(route.path)}
              >
                <route.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 mr-3" />
                <span className="font-medium text-slate-700 group-hover:text-indigo-700">{route.name}</span>
                <span className="ml-auto text-xs text-slate-400 font-mono group-hover:text-indigo-400">
                  {route.path}
                </span>
              </button>
            ))}
          </div>
        )}
        
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 flex justify-between items-center">
          <div>
            <span className="font-semibold text-slate-700">Tip:</span> Press <kbd className="font-mono bg-white border border-slate-200 rounded px-1">Esc</kbd> to close.
          </div>
          <div>COSKIN Enterprise ERP</div>
        </div>
      </div>
    </div>
  );
};
