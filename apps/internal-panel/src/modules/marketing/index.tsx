import { Routes, Route, Navigate } from 'react-router-dom';
import MarketingDashboardScreen from './screens/MarketingDashboardScreen';
import CampaignsScreen from './screens/CampaignsScreen';
import BannersScreen from './screens/BannersScreen';
import CouponsScreen from './screens/CouponsScreen';
import { PushNotificationsScreen } from './screens/PushNotificationsScreen';
import { EmailSMSScreen } from './screens/EmailSMSScreen';
import InfluencersScreen from './screens/InfluencersScreen';
import { MarketingRequestsScreen } from './screens/MarketingRequestsScreen';
import { MarketingAnalyticsScreen } from './screens/MarketingAnalyticsScreen';
import { MarketingSettingsScreen } from './screens/MarketingSettingsScreen';

export default function MarketingModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MarketingDashboardScreen />} />
      <Route path="/campaigns" element={<CampaignsScreen />} />
      <Route path="/banners" element={<BannersScreen />} />
      <Route path="/coupons" element={<CouponsScreen />} />
      <Route path="/push" element={<PushNotificationsScreen />} />
      <Route path="/emails" element={<EmailSMSScreen />} />
      <Route path="/influencers" element={<InfluencersScreen />} />
      <Route path="/requests" element={<MarketingRequestsScreen />} />
      <Route path="/analytics" element={<MarketingAnalyticsScreen />} />
      <Route path="/settings" element={<MarketingSettingsScreen />} />
      <Route path="*" element={<Navigate to="/marketing" replace />} />
    </Routes>
  );
}
