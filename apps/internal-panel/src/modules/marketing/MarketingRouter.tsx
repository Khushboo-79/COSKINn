import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Megaphone, Image as ImageIcon, Tag, Send, Crown, ShoppingCart, Search } from 'lucide-react';
import { BannerManagementScreen } from './BannerManagementScreen';
import { CouponManagementScreen } from './CouponManagementScreen';
import { CampaignsScreen } from './CampaignsScreen';
import { LoyaltyScreen } from './LoyaltyScreen';
import { AbandonedCartScreen } from './AbandonedCartScreen';
import { SeoSettingsScreen } from './SeoSettingsScreen';

const MarketingNav = () => {
  const location = useLocation();
  const tabs = [
    { name: 'Dashboard', path: '/marketing/dashboard', icon: Megaphone },
    { name: 'Banners', path: '/marketing/banners', icon: ImageIcon },
    { name: 'Coupons', path: '/marketing/coupons', icon: Tag },
    { name: 'Campaigns', path: '/marketing/campaigns', icon: Send },
    { name: 'Loyalty', path: '/marketing/loyalty', icon: Crown },
    { name: 'Abandoned Carts', path: '/marketing/abandoned-carts', icon: ShoppingCart },
    { name: 'Global SEO', path: '/marketing/seo', icon: Search },
  ];

  return (
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export const MarketingRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <MarketingNav />
      <Routes>
        <Route path="/" element={<Navigate to="/marketing/dashboard" replace />} />
        <Route path="/dashboard" element={
          <div className="p-12 text-center text-slate-500">
            <Megaphone className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-slate-900 mb-2">Marketing Dashboard Coming Soon</h2>
            <p>Phase 2 will introduce campaign analytics and ROI metrics.</p>
          </div>
        } />
        <Route path="/banners" element={<BannerManagementScreen />} />
        <Route path="/coupons" element={<CouponManagementScreen />} />
        <Route path="/campaigns" element={<CampaignsScreen />} />
        <Route path="/loyalty" element={<LoyaltyScreen />} />
        <Route path="/abandoned-carts" element={<AbandonedCartScreen />} />
        <Route path="/seo" element={<SeoSettingsScreen />} />
        <Route path="*" element={<Navigate to="/marketing/dashboard" replace />} />
      </Routes>
    </div>
  );
};
