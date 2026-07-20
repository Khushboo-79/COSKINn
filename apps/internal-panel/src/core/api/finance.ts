import client from './client';

export const financeApi = {
  // Finance Reports
  getOverview: async () => {
    const res = await client.get('/admin/finance/overview');
    return res.data;
  },
  
  getTransactions: async () => {
    const res = await client.get('/admin/finance/transactions');
    return res.data;
  },
  
  getMonthlyBreakdown: async () => {
    const res = await client.get('/admin/finance/monthly-breakdown');
    return res.data;
  },
  
  getLedgers: async () => {
    const res = await client.get('/admin/finance/ledgers');
    return res.data;
  },

  createLedger: async (accountName: string) => {
    const res = await client.post('/admin/finance/ledgers', { accountName });
    return res.data;
  },

  addJournalEntry: async (ledgerId: string, type: 'CREDIT' | 'DEBIT', amount: number, reference?: string) => {
    const res = await client.post('/admin/finance/journal-entries', { ledgerId, type, amount, reference });
    return res.data;
  },

  syncSettlements: async (settlements: any[]) => {
    const res = await client.post('/admin/finance/settlements/sync', { settlements });
    return res.data;
  },

  // Tax Configurations
  getHsnCodes: async () => {
    const res = await client.get('/admin/tax/hsn');
    return res.data;
  },

  createHsnCode: async (code: string, description?: string) => {
    const res = await client.post('/admin/tax/hsn', { code, description });
    return res.data;
  },

  getTaxRates: async () => {
    const res = await client.get('/admin/tax/rates');
    return res.data;
  },

  createTaxRate: async (name: string, cgst: number, sgst: number, igst: number) => {
    const res = await client.post('/admin/tax/rates', { name, cgst, sgst, igst });
    return res.data;
  }
};
