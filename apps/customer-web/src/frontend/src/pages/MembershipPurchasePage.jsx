import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Star, Gem, Truck, Gift, Zap, CheckCircle2, Lock,
  TrendingUp, ShoppingBag, Award, Sparkles, Info, AlertCircle,
  RefreshCw, ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import apiClient from "../utils/apiClient";

// PRD Tier Definitions
const PRD_TIERS = [
  {
    id: "member",
    name: "Member",
    minSpend: 1500,
    multiplier: 1.5,
    emoji: "⭐",
    colorFrom: "#C0C0C0",
    colorTo: "#A8A8A8",
    benefits: [
      { key: "points", label: "1.5x Reward Points", enabled: true },
      { key: "birthday_multi", label: "Birthday Point Multiplier", enabled: true },
      { key: "free_shipping", label: "Free Shipping", enabled: false },
      { key: "birthday_gift", label: "Birthday Gift", enabled: false },
      { key: "tier_offers", label: "Tier-Exclusive Offers", enabled: false },
      { key: "events", label: "Point-Multiplier Events", enabled: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    minSpend: 4000,
    multiplier: 2,
    emoji: "🏆",
    colorFrom: "#B8860B",
    colorTo: "#FFD700",
    benefits: [
      { key: "points", label: "2x Reward Points", enabled: true },
      { key: "birthday_multi", label: "Birthday Point Multiplier", enabled: true },
      { key: "free_shipping", label: "Free Shipping", enabled: true },
      { key: "birthday_gift", label: "Birthday Gift", enabled: true },
      { key: "tier_offers", label: "Tier-Exclusive Offers", enabled: true },
      { key: "events", label: "Point-Multiplier Events", enabled: false },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    minSpend: 8000,
    multiplier: 3,
    emoji: "💎",
    colorFrom: "#4A0E17",
    colorTo: "#8B1A32",
    benefits: [
      { key: "points", label: "3x Reward Points", enabled: true },
      { key: "birthday_multi", label: "Birthday Point Multiplier", enabled: true },
      { key: "free_shipping", label: "Free Shipping", enabled: true },
      { key: "birthday_gift", label: "Birthday Gift", enabled: true },
      { key: "tier_offers", label: "Tier-Exclusive Offers", enabled: true },
      { key: "events", label: "Point-Multiplier Events", enabled: true },
    ],
  },
];

const BENEFIT_ROWS = [
  { icon: "⭐", label: "Reward Points Earn Rate", values: ["1.5x", "2x", "3x"] },
  { icon: "🎂", label: "Birthday Point Multiplier", values: ["✓", "✓", "✓"] },
  { icon: "🚚", label: "Free Shipping", values: ["—", "✓", "✓"] },
  { icon: "🎁", label: "Birthday Gift", values: ["—", "✓", "✓"] },
  { icon: "⚡", label: "Tier-Exclusive Offers", values: ["—", "✓", "✓"] },
  { icon: "🌟", label: "Point-Multiplier Events", values: ["—", "—", "✓"] },
];

function mergeTiers(backendTiers) {
  if (!backendTiers || backendTiers.length === 0) return PRD_TIERS;
  return PRD_TIERS.map((prd) => {
    const found = backendTiers.find(
      (b) => b.name?.toLowerCase() === prd.name?.toLowerCase()
    );
    if (found) {
      return {
        ...prd,
        minSpend: found.minSpend ?? prd.minSpend,
        multiplier: found.multiplier ?? prd.multiplier,
        backendId: found.id,
      };
    }
    return prd;
  });
}

export default function MembershipPurchasePage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { type } = useParams();

  const [tiers, setTiers] = useState(PRD_TIERS);
  const [backendTier, setBackendTier] = useState(null);
  const [totalSpend, setTotalSpend] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const activeType = type === "skincare" || type === "cosmetics" ? type : theme;
  const isSkincare = activeType !== "cosmetics";

  useEffect(() => {
    if (type === "skincare" || type === "cosmetics") toggleTheme(type);
    window.scrollTo(0, 0);
  }, [type]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("👑 [MEMBERSHIP] Fetching public tiers from backend: GET /membership/tiers");
      const tiersRes = await apiClient.get("/membership/tiers").catch((err) => {
        console.warn("⚠️ [MEMBERSHIP] /membership/tiers request failed:", err);
        return null;
      });
      console.log("👑 [MEMBERSHIP] Public tiers response from backend:", tiersRes?.data);
      const merged = mergeTiers(tiersRes?.data || []);
      setTiers(merged);

      if (user) {
        console.log("👑 [MEMBERSHIP] Fetching current user tier from backend: GET /membership/my-tier");
        const tierRes = await apiClient.get("/membership/my-tier").catch((err) => {
          console.warn("⚠️ [MEMBERSHIP] /membership/my-tier request failed:", err);
          return null;
        });
        console.log("👑 [MEMBERSHIP] User tier response from backend:", tierRes?.data);
        if (tierRes?.data?.tier) setBackendTier(tierRes.data.tier);

        console.log("🛍️ [MEMBERSHIP] Fetching orders to compute 365-day qualifying spend: GET /orders?limit=500");
        const ordersRes = await apiClient.get("/orders?limit=500").catch((err) => {
          console.warn("⚠️ [MEMBERSHIP] /orders request failed:", err);
          return null;
        });
        const orders = ordersRes?.data?.data || ordersRes?.data || [];
        let spend = 0;
        if (Array.isArray(orders)) {
          orders.forEach((o) => {
            if (o.status === "DELIVERED") spend += Number(o.totalAmount || 0);
          });
        }
        console.log("🛍️ [MEMBERSHIP] Total DELIVERED orders spend computed:", spend);
        setTotalSpend(spend);
      } else {
        console.log("ℹ️ [MEMBERSHIP] Guest user — skipping user tier & spend fetch.");
      }
    } catch (err) {
      console.error("❌ [MEMBERSHIP] Error in fetchData:", err);
      setError("Could not load membership data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Computed values
  const currentTierIdx = backendTier
    ? tiers.findIndex((t) => t.name?.toLowerCase() === backendTier.name?.toLowerCase())
    : -1;
  const currentTier = currentTierIdx >= 0 ? tiers[currentTierIdx] : null;
  const nextTier = currentTierIdx >= 0 && currentTierIdx < tiers.length - 1 ? tiers[currentTierIdx + 1] : null;
  const isTopTier = currentTier && currentTierIdx >= tiers.length - 1;
  const spendToNext = nextTier ? Math.max(0, nextTier.minSpend - totalSpend) : 0;

  let progressPct = 0;
  let progressBarFrom = 0;
  let progressBarTo = tiers[0]?.minSpend || 1500;
  if (currentTier && nextTier) {
    progressBarFrom = currentTier.minSpend;
    progressBarTo = nextTier.minSpend;
    progressPct = Math.min(100, Math.round(((totalSpend - progressBarFrom) / (progressBarTo - progressBarFrom)) * 100));
  } else if (!currentTier && user) {
    progressPct = Math.min(100, Math.round((totalSpend / progressBarTo) * 100));
  } else if (isTopTier) {
    progressPct = 100;
  }

  const accentColor = isSkincare ? "#FF0069" : "#6B1426";
  const gradient = isSkincare
    ? "linear-gradient(135deg, #FF0069, #FFD498)"
    : "linear-gradient(135deg, #4A0E17, #8B1A32)";
  const heroBg = isSkincare ? "#FFF5F8" : "#FFF0F3";
  const fontHeading = isSkincare ? "'Exo 2', sans-serif" : "'Expletus Sans', cursive";

  const tabs = [
    { id: "overview", label: "Tier Overview" },
    { id: "benefits", label: "Benefits Table" },
    { id: "how", label: "How It Works" },
  ];

  const howItWorks = [
    {
      step: 1,
      icon: "🛍️",
      title: "Shop & Spend",
      desc: "Every eligible purchase counts toward your rolling 365-day spend. GST and delivery charges are excluded from the calculation.",
    },
    {
      step: 2,
      icon: "📈",
      title: "Auto-Upgrade",
      desc: "Once your qualifying spend crosses a tier threshold, you are automatically upgraded overnight. No action needed.",
    },
    {
      step: 3,
      icon: "👑",
      title: "Enjoy Perks",
      desc: "Earn boosted reward points, exclusive birthday gifts, free shipping, and member-only offers immediately on upgrade.",
    },
  ];

  const rules = [
    "Enrollment is completely free — no joining fee.",
    "You automatically join Member tier once you reach ₹1,500 in qualifying spend.",
    "Tier upgrades happen automatically the morning after the threshold is crossed.",
    "Qualifying spend is calculated on a rolling 365-day window.",
    "GST, delivery charges, and returned items are excluded from spend.",
    "Tiers are reviewed nightly — downgrade if rolling spend drops below threshold.",
    "You receive a notification on every tier upgrade.",
    "Birthday point multiplier applies for your entire birth month.",
  ];

  return (
    <div style={{ minHeight: "100vh", background: heroBg, paddingTop: "96px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 16px" }}>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-white rounded-3xl shadow-lg border border-white p-8 md:p-14 mb-10"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-50 pointer-events-none"
            style={{ background: isSkincare ? "#FFD498" : "#FFB3C1" }} />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: isSkincare ? "#FFCCE0" : "#FADADD" }} />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border mb-5"
                style={{ color: accentColor, borderColor: accentColor + "33", background: accentColor + "10" }}
              >
                <Crown size={13} /> COSKINn Loyalty Program
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight"
                style={{ fontFamily: fontHeading }}>
                COSKINn Membership
              </h1>
              <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed mb-2">
                A <strong style={{ color: accentColor }}>free, automatic</strong> tiered loyalty program.
                Shop more, earn more perks — no fee, no signup required.
              </p>
              <p className="text-sm text-gray-400">Tiers auto-update every night based on your last 365 days of qualifying spend.</p>

              {!user && (
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ background: gradient }}
                  onClick={() => window.dispatchEvent(new CustomEvent("open_auth_modal"))}
                >
                  Login to check your tier <ArrowRight size={18} />
                </motion.button>
              )}
            </div>

            {/* Tier Pills */}
            <div className="flex flex-row md:flex-col gap-3 flex-wrap">
              {tiers.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl text-white shadow-md min-w-[150px]"
                  style={{ background: `linear-gradient(135deg, ${t.colorFrom}, ${t.colorTo})` }}
                >
                  <span className="text-xl">{t.emoji}</span>
                  <div>
                    <div className="font-black text-sm tracking-wide">{t.name}</div>
                    <div className="text-xs opacity-75">₹{t.minSpend.toLocaleString("en-IN")}+ / yr</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* USER TIER CARD */}
        {user && (
          <div className="mb-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-12 h-12 border-4 border-pink-200 border-t-[#FF0069] rounded-full animate-spin"
                  style={{ borderTopColor: accentColor }} />
                <span className="text-gray-400 text-sm">Loading your membership…</span>
              </div>
            ) : error ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-red-100 text-center">
                <AlertCircle size={36} className="mx-auto text-red-400 mb-3" />
                <p className="text-gray-700 font-medium mb-4">{error}</p>
                <button
                  onClick={fetchData}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold text-sm"
                >
                  <RefreshCw size={15} /> Retry
                </button>
              </div>
            ) : currentTier ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl text-white p-8 md:p-10 shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${currentTier.colorFrom}, ${currentTier.colorTo})` }}
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{currentTier.emoji}</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70">Your Current Tier</p>
                        <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: fontHeading }}>
                          COSKINn {currentTier.name} Member
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold self-start">
                      <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse inline-block" />
                      Active
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                      <p className="text-xs opacity-70 mb-1 font-semibold uppercase tracking-wide">Points Multiplier</p>
                      <p className="text-2xl font-black">{currentTier.multiplier}x</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                      <p className="text-xs opacity-70 mb-1 font-semibold uppercase tracking-wide">Total Spend (365d)</p>
                      <p className="text-2xl font-black">₹{totalSpend.toLocaleString("en-IN")}</p>
                    </div>
                    {!isTopTier && nextTier ? (
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 col-span-2 sm:col-span-1">
                        <p className="text-xs opacity-70 mb-1 font-semibold uppercase tracking-wide">To reach {nextTier.name}</p>
                        <p className="text-2xl font-black">₹{spendToNext.toLocaleString("en-IN")}</p>
                      </div>
                    ) : (
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 col-span-2 sm:col-span-1 flex items-center gap-2">
                        <Crown size={20} />
                        <span className="font-bold text-sm">Top Tier Reached!</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold opacity-70 uppercase tracking-wide">
                        {isTopTier ? "You've reached the top tier!" : `Progress to ${nextTier?.name}`}
                      </span>
                      <span className="text-xs font-bold opacity-70">{progressPct}%</span>
                    </div>
                    <div className="h-3 bg-white/25 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                    {!isTopTier && (
                      <div className="flex justify-between mt-1.5 text-xs opacity-60 font-medium">
                        <span>₹{(currentTier.minSpend).toLocaleString("en-IN")}</span>
                        <span>₹{(nextTier?.minSpend || 0).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Not yet a member */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                        style={{ background: gradient }}>
                        <Award size={22} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Not Yet a Member</p>
                        <h2 className="text-xl font-black text-gray-900">Start Your Journey</h2>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      Spend <strong style={{ color: accentColor }}>₹{(tiers[0]?.minSpend || 1500).toLocaleString("en-IN")}</strong> in 365 days to automatically join the Member tier and unlock rewards.
                    </p>
                    <div>
                      <div className="flex justify-between mb-1.5 text-xs font-semibold text-gray-500">
                        <span>Spend: ₹{totalSpend.toLocaleString("en-IN")}</span>
                        <span>{progressPct}% to Member</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ background: gradient }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>₹0</span>
                        <span>₹{(tiers[0]?.minSpend || 1500).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(isSkincare ? "/skincare" : "/cosmetics")}
                    className="shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ background: gradient }}
                  >
                    <ShoppingBag size={18} /> Shop Now
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* TABS */}
        <div className="flex gap-1 p-1.5 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 w-full sm:inline-flex sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={activeTab === tab.id ? { background: gradient, color: "#fff" } : { color: "#6B7280" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">

          {/* OVERVIEW — Tier Cards */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tiers.map((tier, i) => {
                const isMyTier = currentTier?.name?.toLowerCase() === tier.name?.toLowerCase();
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300"
                    style={{ borderColor: isMyTier ? accentColor : "#F3F4F6", boxShadow: isMyTier ? `0 8px 30px ${accentColor}22` : undefined }}
                  >
                    <div className="p-6 relative overflow-hidden text-white"
                      style={{ background: `linear-gradient(135deg, ${tier.colorFrom}, ${tier.colorTo})` }}>
                      <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-8 -mt-8" />
                      <div className="relative z-10 flex items-center justify-between mb-3">
                        <span className="text-3xl">{tier.emoji}</span>
                        {isMyTier && (
                          <span className="bg-white/25 backdrop-blur-sm text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                            Your Tier
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-black" style={{ fontFamily: fontHeading }}>{tier.name}</h3>
                      <p className="text-xs opacity-75 mt-1 font-semibold">
                        ₹{tier.minSpend.toLocaleString("en-IN")}+ qualifying spend / year
                      </p>
                    </div>

                    <div className="p-6 space-y-3">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-black"
                        style={{ background: accentColor + "15", color: accentColor }}
                      >
                        <Sparkles size={14} /> {tier.multiplier}x Reward Points
                      </div>
                      <ul className="space-y-2">
                        {tier.benefits.map((b) => (
                          <li key={b.key} className="flex items-center gap-2.5 text-sm">
                            {b.enabled
                              ? <CheckCircle2 size={16} style={{ color: accentColor }} />
                              : <Lock size={16} className="text-gray-300" />
                            }
                            <span className={b.enabled ? "text-gray-700 font-medium" : "text-gray-300"}>
                              {b.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* BENEFITS TABLE */}
          {activeTab === "benefits" && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="p-5 text-left text-sm font-bold text-gray-500">Benefit</th>
                      {tiers.map((t) => {
                        const isMyTier = currentTier?.name?.toLowerCase() === t.name?.toLowerCase();
                        return (
                          <th key={t.id} className="p-5 text-center"
                            style={isMyTier ? { background: accentColor + "08" } : {}}>
                            <span className="text-2xl block mb-1">{t.emoji}</span>
                            <span className={`font-black text-sm ${isMyTier ? "" : "text-gray-700"}`}
                              style={isMyTier ? { color: accentColor } : {}}>
                              {t.name}
                            </span>
                            {isMyTier && (
                              <div className="text-xs mt-1 font-semibold" style={{ color: accentColor }}>
                                Your Tier
                              </div>
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {BENEFIT_ROWS.map((row, i) => (
                      <motion.tr
                        key={row.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}
                      >
                        <td className="p-4 sm:p-5">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <span>{row.icon}</span>
                            <span>{row.label}</span>
                          </div>
                        </td>
                        {row.values.map((val, vi) => (
                          <td key={vi} className="p-4 sm:p-5 text-center">
                            {val === "✓" ? (
                              <CheckCircle2 size={20} style={{ color: accentColor, margin: "0 auto" }} />
                            ) : val === "—" ? (
                              <span className="text-gray-200 text-lg font-bold">—</span>
                            ) : (
                              <span className="text-base font-black" style={{ color: accentColor }}>{val}</span>
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 bg-gray-50 text-xs text-gray-400 flex items-start gap-2">
                <Info size={14} className="mt-0.5 shrink-0" />
                <span>Qualifying spend = paid order value (excl. GST, delivery & returned items) in the last 365 days. Recalculated every night.</span>
              </div>
            </motion.div>
          )}

          {/* HOW IT WORKS */}
          {activeTab === "how" && (
            <motion.div
              key="how"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {howItWorks.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-5 text-7xl font-black text-gray-50 leading-none select-none">
                      {step.step}
                    </div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-md"
                      style={{ background: gradient }}>
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2" style={{ fontFamily: fontHeading }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Rules */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                <h3 className="font-black text-gray-900 text-lg mb-5 flex items-center gap-2"
                  style={{ fontFamily: fontHeading }}>
                  <Info size={18} style={{ color: accentColor }} /> Program Rules
                </h3>
                <ul className="space-y-3">
                  {rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: accentColor }} />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-3xl p-8 text-white text-center shadow-xl"
                style={{ background: gradient }}
              >
                <div className="text-4xl mb-3">
                  {currentTier ? currentTier.emoji : "🚀"}
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ fontFamily: fontHeading }}>
                  {currentTier ? `You're a ${currentTier.name} Member!` : "Start earning rewards today"}
                </h3>
                <p className="text-sm opacity-80 mb-5">
                  {!user
                    ? "Login to track your progress and unlock exclusive perks."
                    : currentTier
                      ? isTopTier
                        ? "You've reached the top tier! Keep shopping to maintain your Platinum status."
                        : `₹${spendToNext.toLocaleString("en-IN")} more to reach ${nextTier?.name} tier.`
                      : `₹${(tiers[0]?.minSpend || 1500).toLocaleString("en-IN")} qualifying spend automatically enrolls you in Member tier.`
                  }
                </p>
                <button
                  onClick={() => {
                    if (!user) window.dispatchEvent(new CustomEvent("open_auth_modal"));
                    else navigate(isSkincare ? "/skincare" : "/cosmetics");
                  }}
                  className="bg-white font-black px-8 py-3.5 rounded-2xl hover:bg-gray-50 transition-all shadow-md inline-flex items-center gap-2"
                  style={{ color: accentColor }}
                >
                  <ShoppingBag size={18} />
                  {!user ? "Login — It's Free" : "Shop Now"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
