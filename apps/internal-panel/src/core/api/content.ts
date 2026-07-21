import client from './client';

export const contentApi = {
  // Articles (Blogs, Tips, Routines, Legal)
  getAdminArticles: async (type?: 'BLOG' | 'TIP' | 'ROUTINE' | 'LEGAL' | 'PAGE') => {
    const url = type ? `/content/admin/articles?type=${type}` : '/content/admin/articles';
    const res = await client.get(url);
    return res.data;
  },

  createArticle: async (data: any) => {
    const res = await client.post('/content/admin/articles', data);
    return res.data;
  },

  updateArticle: async (id: string, data: any) => {
    const res = await client.put(`/content/admin/articles/${id}`, data);
    return res.data;
  },

  deleteArticle: async (id: string) => {
    const res = await client.delete(`/content/admin/articles/${id}`);
    return res.data;
  },

  // Ingredients from Catalog
  getIngredients: async () => {
    // Using catalog endpoint for ingredients
    const res = await client.get('/catalog/admin/ingredients');
    return res.data;
  },

  // FAQs
  getFaqs: async () => {
    const res = await client.get('/content/faqs');
    return res.data;
  },

  createFaq: async (data: any) => {
    const res = await client.post('/content/admin/faqs', data);
    return res.data;
  },

  updateFaq: async (id: string, data: any) => {
    const res = await client.put(`/content/admin/faqs/${id}`, data);
    return res.data;
  },

  deleteFaq: async (id: string) => {
    const res = await client.delete(`/content/admin/faqs/${id}`);
    return res.data;
  }
};
