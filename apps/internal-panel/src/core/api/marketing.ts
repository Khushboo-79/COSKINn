import { apiClient as client } from './client';

export const marketingApi = {
  // Banners
  getBanners: async () => {
    const res = await client.get('/home/admin/banners');
    return res.data;
  },

  createBanner: async (data: any) => {
    const res = await client.post('/home/admin/banners', data);
    return res.data;
  },

  updateBanner: async (id: string, data: any) => {
    const res = await client.put(`/home/admin/banners/${id}`, data);
    return res.data;
  },

  deleteBanner: async (id: string) => {
    const res = await client.delete(`/home/admin/banners/${id}`);
    return res.data;
  },

  // Coupons
  getCoupons: async () => {
    const res = await client.get('/admin/coupons');
    return res.data;
  },

  createCoupon: async (data: any) => {
    const res = await client.post('/admin/coupons', data);
    return res.data;
  },

  updateCoupon: async (id: string, data: any) => {
    const res = await client.put(`/admin/coupons/${id}`, data);
    return res.data;
  },

  deleteCoupon: async (id: string) => {
    const res = await client.delete(`/admin/coupons/${id}`);
    return res.data;
  },

  // Campaigns
  getCampaigns: async () => {
    const res = await client.get('/marketing/campaigns');
    return res.data;
  },

  createCampaign: async (data: { name: string; type: string; audience?: string; scheduledAt?: Date }) => {
    const res = await client.post('/marketing/campaigns', data);
    return res.data;
  },

  // Abandoned Carts
  getAbandonedCarts: async () => {
    const res = await client.get('/marketing/abandoned-carts');
    return res.data;
  },

  // Reward Points Ledger (Admin)
  getPointsLedger: async () => {
    const res = await client.get('/reward-point/admin/ledger');
    return res.data;
  },

  // Membership Tiers
  getMembershipTiers: async () => {
    const res = await client.get('/admin/membership/tiers');
    return res.data;
  },

  createMembershipTier: async (data: any) => {
    const res = await client.post('/admin/membership/tiers', data);
    return res.data;
  },

  updateMembershipTier: async (id: string, data: any) => {
    const res = await client.put(`/admin/membership/tiers/${id}`, data);
    return res.data;
  },

  deleteMembershipTier: async (id: string) => {
    const res = await client.delete(`/admin/membership/tiers/${id}`);
    return res.data;
  },

  // Global SEO
  getGlobalSeo: async () => {
    const res = await client.get('/seo/admin/global');
    return res.data;
  },

  updateGlobalSeo: async (data: any) => {
    const res = await client.put('/seo/admin/global', data);
    return res.data;
  },

  // Dashboard
  getDashboard: async () => {
    const res = await client.get('/marketing/dashboard');
    return res.data;
  }
};
