import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/common/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load all pages for code splitting and faster initial load
const SkincarePage = React.lazy(() => import('./pages/SkincarePage'));
const CosmeticsPage = React.lazy(() => import('./pages/CosmeticsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const RoutinePage = React.lazy(() => import('./pages/RoutinePage'));
const JournalPage = React.lazy(() => import('./pages/JournalPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const NewArrivalsPage = React.lazy(() => import('./pages/NewArrivalsPage'));
const BestSellersPage = React.lazy(() => import('./pages/BestSellersPage'));
const AwardWinnersPage = React.lazy(() => import('./pages/AwardWinnersPage'));
const GiftSetsPage = React.lazy(() => import('./pages/GiftSetsPage'));
const RecommendedPage = React.lazy(() => import('./pages/RecommendedPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const MembershipPurchasePage = React.lazy(() => import('./pages/MembershipPurchasePage'));
const ProductDetailsPage = React.lazy(() => import('./pages/ProductDetailsPage'));
const OrderTrackingPage = React.lazy(() => import('./pages/OrderTrackingPage'));
const ShopAllSkincarePage = React.lazy(() => import('./pages/ShopAllSkincarePage'));
const SkinQuizPage = React.lazy(() => import('./pages/SkinQuizPage'));
const CleanserPage = React.lazy(() => import('./pages/CleanserPage'));
const CleansingBalmPage = React.lazy(() => import('./pages/CleansingBalmPage'));
const SunscreenPage = React.lazy(() => import('./pages/SunscreenPage'));
const FaceMistPage = React.lazy(() => import('./pages/FaceMistPage'));
const OvernightMaskPage = React.lazy(() => import('./pages/OvernightMaskPage'));
const UnderEyePatchesPage = React.lazy(() => import('./pages/UnderEyePatchesPage'));
const HandCreamPage = React.lazy(() => import('./pages/HandCreamPage'));
const LipBalmSPFPage = React.lazy(() => import('./pages/LipBalmSPFPage'));
const PocketPerfumePage = React.lazy(() => import('./pages/PocketPerfumePage'));
const GlowKitPage = React.lazy(() => import('./pages/GlowKitPage'));
const DailyEssentialsPage = React.lazy(() => import('./pages/DailyEssentialsPage'));
const AcneBlemishesPage = React.lazy(() => import('./pages/AcneBlemishesPage'));

const WeekendCollectionPage = React.lazy(() => import('./pages/WeekendCollectionPage'));
const MagneticLipstickCollectionPage = React.lazy(() => import('./pages/collections/MagneticLipstickCollectionPage'));
const PrecisionLipLinerCollectionPage = React.lazy(() => import('./pages/collections/PrecisionLipLinerCollectionPage'));
const LipBlurCollectionPage = React.lazy(() => import('./pages/collections/LipBlurCollectionPage'));
const MascaraCollectionPage = React.lazy(() => import('./pages/collections/MascaraCollectionPage'));
const EyeshadowCollectionPage = React.lazy(() => import('./pages/collections/EyeshadowCollectionPage'));
const SaleCollectionPage = React.lazy(() => import('./pages/collections/SaleCollectionPage'));

// Category Pages
const HydrationPage = React.lazy(() => import('./pages/categories/HydrationPage'));
const BrighteningPage = React.lazy(() => import('./pages/categories/BrighteningPage'));
const RepairPage = React.lazy(() => import('./pages/categories/RepairPage'));
const BarrierCarePage = React.lazy(() => import('./pages/categories/BarrierCarePage'));
const SunProtectionPage = React.lazy(() => import('./pages/categories/SunProtectionPage'));
const SensitiveSkinPage = React.lazy(() => import('./pages/categories/SensitiveSkinPage'));
const DrySkinPage = React.lazy(() => import('./pages/categories/DrySkinPage'));
const OilySkinPage = React.lazy(() => import('./pages/categories/OilySkinPage'));

// Routine Pages
const MorningRoutinePage = React.lazy(() => import('./pages/routines/MorningRoutinePage'));
const NightRoutinePage = React.lazy(() => import('./pages/routines/NightRoutinePage'));
const HydrationRoutinePage = React.lazy(() => import('./pages/routines/HydrationRoutinePage'));
const BrighteningRoutinePage = React.lazy(() => import('./pages/routines/BrighteningRoutinePage'));
const AcneCareRoutinePage = React.lazy(() => import('./pages/routines/AcneCareRoutinePage'));
const SensitiveSkinRoutinePage = React.lazy(() => import('./pages/routines/SensitiveSkinRoutinePage'));
const DrySkinRoutinePage = React.lazy(() => import('./pages/routines/DrySkinRoutinePage'));
const OilySkinRoutinePage = React.lazy(() => import('./pages/routines/OilySkinRoutinePage'));
const CombinationSkinRoutinePage = React.lazy(() => import('./pages/routines/CombinationSkinRoutinePage'));

// Journal Pages
const SkincareBlogsPage = React.lazy(() => import('./pages/journal/SkincareBlogsPage'));
const SkincareTipsPage = React.lazy(() => import('./pages/journal/SkincareTipsPage'));
const IngredientGuidesPage = React.lazy(() => import('./pages/journal/IngredientGuidesPage'));
const SkinEducationPage = React.lazy(() => import('./pages/journal/SkinEducationPage'));

// Policy Pages
const ShippingPolicyPage = React.lazy(() => import('./pages/policies/ShippingPolicyPage'));
const ReturnsRefundsPage = React.lazy(() => import('./pages/policies/ReturnsRefundsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/policies/PrivacyPolicyPage'));
const TermsConditionsPage = React.lazy(() => import('./pages/policies/TermsConditionsPage'));
const CookiePolicyPage = React.lazy(() => import('./pages/policies/CookiePolicyPage'));
const AccessibilityPage = React.lazy(() => import('./pages/policies/AccessibilityPage'));
const PaymentPolicyPage = React.lazy(() => import('./pages/policies/PaymentPolicyPage'));

// Support Pages
const HelpCenterPage = React.lazy(() => import('./pages/support/HelpCenterPage'));
const FAQsPage = React.lazy(() => import('./pages/support/FAQsPage'));
const TrackOrderPage = React.lazy(() => import('./pages/support/TrackOrderPage'));

// About Pages
const OurPromisePage = React.lazy(() => import('./pages/about/OurPromisePage'));
const SustainabilityPage = React.lazy(() => import('./pages/about/SustainabilityPage'));
const IngredientPhilosophyPage = React.lazy(() => import('./pages/about/IngredientPhilosophyPage'));
const CareersPage = React.lazy(() => import('./pages/about/CareersPage'));
const GlobalLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-black/10 border-t-theme-primary animate-spin mb-4"></div>
    <p className="font-heading font-bold text-sm text-black uppercase tracking-widest">Loading COSKINn</p>
  </div>
);

const PlaceholderPage = ({ title }) => (
  <div className="min-h-[70vh] bg-[#FFFDFD] pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
    <h1 className="text-4xl lg:text-5xl font-heading font-black text-[#1B1B1B] mb-6">{title}</h1>
    <p className="text-gray-500 font-medium max-w-lg mb-8">This page is currently under construction. Please check back later.</p>
  </div>
);

const MainLayout = () => {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <div className="relative min-h-screen flex flex-col">
      {!isCheckout && !isProductPage && <Navbar />}
      {!isCheckout && <CartDrawer />}
      <div className="flex-1">
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/skincare" replace />} />
            <Route path="/skincare" element={<SkincarePage />} />
            <Route path="/cosmetics" element={<CosmeticsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/routine" element={<RoutinePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/skincare-blogs" element={<SkincareBlogsPage />} />
            <Route path="/journal/skincare-tips" element={<SkincareTipsPage />} />
            <Route path="/journal/ingredient-guides" element={<IngredientGuidesPage />} />
            <Route path="/journal/skin-education" element={<SkinEducationPage />} />
            <Route path="/account/*" element={<AccountPage />} />
            
            {/* Footer Pages */}
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/returns-refunds" element={<ReturnsRefundsPage />} />
            <Route path="/our-promise" element={<OurPromisePage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/ingredient-philosophy" element={<IngredientPhilosophyPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/payment-policy" element={<PaymentPolicyPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/best-sellers" element={<BestSellersPage />} />
            <Route path="/award-winners" element={<AwardWinnersPage />} />
            <Route path="/gift-sets" element={<GiftSetsPage />} />
            <Route path="/recommended" element={<RecommendedPage />} />
            <Route path="/membership/:type" element={<MembershipPurchasePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/order/:orderId" element={<OrderTrackingPage />} />
            <Route path="/shop-all-skincare" element={<ShopAllSkincarePage />} />
            <Route path="/skin-quiz" element={<SkinQuizPage />} />
            <Route path="/skincare/cleansers" element={<CleanserPage />} />
            <Route path="/skincare/cleansing-balms" element={<CleansingBalmPage />} />
            <Route path="/skincare/sunscreens" element={<SunscreenPage />} />
            <Route path="/skincare/face-mist" element={<FaceMistPage />} />
            <Route path="/skincare/overnight-mask" element={<OvernightMaskPage />} />
            <Route path="/skincare/under-eye-patches" element={<UnderEyePatchesPage />} />
            <Route path="/shop/body-lips/hand-cream" element={<HandCreamPage />} />
            <Route path="/shop/body-lips/lip-balm-spf" element={<LipBalmSPFPage />} />
            <Route path="/shop/body-lips/pocket-perfume" element={<PocketPerfumePage />} />
            <Route path="/shop/bundles/glow-kit" element={<GlowKitPage />} />
            <Route path="/shop/collections/daily-essentials" element={<DailyEssentialsPage />} />
            <Route path="/collections/magnetic-lipstick" element={<MagneticLipstickCollectionPage />} />
            <Route path="/collections/precision-lip-liner" element={<PrecisionLipLinerCollectionPage />} />
            <Route path="/collections/lip-blur" element={<LipBlurCollectionPage />} />
            <Route path="/collections/lift-curl-mascara" element={<MascaraCollectionPage />} />
            <Route path="/collections/eyeshadow-palette" element={<EyeshadowCollectionPage />} />
            <Route path="/collections/sale" element={<SaleCollectionPage />} />
            <Route path="/categories/acne-blemishes" element={<AcneBlemishesPage />} />
            <Route path="/shop/collections/weekend-collection" element={<WeekendCollectionPage />} />
            <Route path="/categories/hydration" element={<HydrationPage />} />
            <Route path="/categories/brightening" element={<BrighteningPage />} />
            <Route path="/categories/repair" element={<RepairPage />} />
            <Route path="/categories/barrier-care" element={<BarrierCarePage />} />
            <Route path="/categories/sun-protection" element={<SunProtectionPage />} />
            <Route path="/categories/sensitive-skin" element={<SensitiveSkinPage />} />
            <Route path="/categories/dry-skin" element={<DrySkinPage />} />
            <Route path="/categories/oily-skin" element={<OilySkinPage />} />

            {/* Routine Pages */}
            <Route path="/routine/morning" element={<MorningRoutinePage />} />
            <Route path="/routine/night" element={<NightRoutinePage />} />
            <Route path="/routine/hydration" element={<HydrationRoutinePage />} />
            <Route path="/routine/brightening" element={<BrighteningRoutinePage />} />
            <Route path="/routine/acne-care" element={<AcneCareRoutinePage />} />
            <Route path="/routine/sensitive-skin" element={<SensitiveSkinRoutinePage />} />
            <Route path="/routine/dry-skin" element={<DrySkinRoutinePage />} />
            <Route path="/routine/oily-skin" element={<OilySkinRoutinePage />} />
            <Route path="/routine/combination" element={<CombinationSkinRoutinePage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

import SEO from './components/common/SEO';

export default function App() {
  return (
    <AuthProvider>
      <SEO />
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <BrowserRouter>
                <ScrollToTop />
                <MainLayout />
              </BrowserRouter>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
