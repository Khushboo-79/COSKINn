import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Megaphone, Image as ImageIcon, Tag, Send, Crown, ShoppingCart, Search } from 'lucide-react';
import { BannerManagementScreen } from './BannerManagementScreen';
import { CouponManagementScreen } from './CouponManagementScreen';
import { CampaignsScreen } from './CampaignsScreen';
import { LoyaltyScreen } from './LoyaltyScreen';
import { AbandonedCartScreen } from './AbandonedCartScreen';
import { SeoSettingsScreen } from './SeoSettingsScreen';
import { MarketingDashboardScreen } from './MarketingDashboardScreen';

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
              key={tab.name || tab.path}
              to={tab.path}
              className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
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
        <Route path="/dashboard" element={<MarketingDashboardScreen />} />
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
