
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Megaphone, Image as ImageIcon, Tag } from 'lucide-react';
import BannerManager from './BannerManager';
import CouponManager from './CouponManager';

export default function MarketingPanel() {
  const location = useLocation();

  const tabs = [
    { name: 'Banners', path: '/marketing/banners', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Coupons', path: '/marketing/coupons', icon: <Tag className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Megaphone className="w-6 h-6 text-rose-600" />
        <h2 className="text-2xl font-bold text-gray-900">Marketing & Promotions</h2>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {tabs.map(tab => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <Link 
              key={tab.name}
              to={tab.path}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                isActive 
                  ? 'border-rose-600 text-rose-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.name}
            </Link>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto bg-white/40 rounded-xl p-4">
        <Routes>
          <Route path="/" element={<Navigate to="banners" replace />} />
          <Route path="banners" element={<BannerManager />} />
          <Route path="coupons" element={<CouponManager />} />
        </Routes>
      </div>
    </div>
  );
}
