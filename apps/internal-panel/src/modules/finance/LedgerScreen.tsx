import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../core/api/finance';
import { Plus, BookOpen, FileMinus, FilePlus, Loader2, Save } from 'lucide-react';

export const LedgerScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedLedgerId, setSelectedLedgerId] = useState('');
  const [entryType, setEntryType] = useState<'CREDIT' | 'DEBIT'>('CREDIT');
  const [amount, setAmount] = useState<number>(0);
  const [reference, setReference] = useState('');

  const { data: ledgers, isLoading } = useQuery({
    queryKey: ['finance', 'ledgers'],
    queryFn: () => financeApi.getLedgers()
  });

  const entryMutation = useMutation({
    mutationFn: () => financeApi.addJournalEntry(selectedLedgerId, entryType, amount, reference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'ledgers'] });
      setIsAdding(false);
      setAmount(0);
      setReference('');
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">General Ledger</h1>
          <p className="text-slate-500 text-sm mt-1">Track financial accounts and post manual journal entries.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Post Journal Entry
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">New Journal Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account / Ledger <span className="text-rose-500">*</span></label>
              <select 
                value={selectedLedgerId}
                onChange={e => setSelectedLedgerId(e.target.value)}
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="">Select an account...</option>
                {ledgers?.map((l: any) => (
                  <option key={l.id} value={l.id}>{l.accountName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type <span className="text-rose-500">*</span></label>
              <select 
                value={entryType}
                onChange={e => setEntryType(e.target.value as any)}
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white font-medium"
              >
                <option value="CREDIT">CREDIT (+)</option>
                <option value="DEBIT">DEBIT (-)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (INR) <span className="text-rose-500">*</span></label>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                min="1"
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reference / Note</label>
              <input 
                type="text" 
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder="e.g. Supplier adjustment"
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button 
              onClick={() => entryMutation.mutate()}
              disabled={!selectedLedgerId || amount <= 0 || entryMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center"
            >
              {entryMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Post Entry
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading ledgers...</div>
      ) : !ledgers || ledgers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No ledgers found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ledgers.map((ledger: any) => (
            <div key={ledger.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{ledger.accountName}</h2>
                  <p className="text-xs text-slate-500">ID: {ledger.id}</p>
                </div>
                <div className={`text-xl font-bold px-3 py-1 rounded-xl ${ledger.balance >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {formatCurrency(ledger.balance)}
                </div>
              </div>
              <div className="p-0 overflow-y-auto max-h-80">
                {ledger.entries && ledger.entries.length > 0 ? (
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-white border-b border-slate-100 shadow-sm z-10">
                      <tr>
                        <th className="py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ref</th>
                        <th className="py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Debit</th>
                        <th className="py-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {ledger.entries.map((entry: any) => (
                        <tr key={entry.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-500 text-xs">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {entry.reference || '-'}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-rose-600">
                            {entry.type === 'DEBIT' ? (
                              <div className="flex items-center justify-end">
                                <FileMinus className="h-3 w-3 mr-1" /> {formatCurrency(entry.amount)}
                              </div>
                            ) : '-'}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-emerald-600">
                            {entry.type === 'CREDIT' ? (
                              <div className="flex items-center justify-end">
                                <FilePlus className="h-3 w-3 mr-1" /> {formatCurrency(entry.amount)}
                              </div>
                            ) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    No entries in this ledger yet.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
