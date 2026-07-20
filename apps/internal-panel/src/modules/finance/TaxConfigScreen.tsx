import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../core/api/finance';
import { Plus, Percent, Loader2, Save } from 'lucide-react';

export const TaxConfigScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [cgst, setCgst] = useState<number>(0);
  const [sgst, setSgst] = useState<number>(0);
  const [igst, setIgst] = useState<number>(0);

  const { data: taxRates, isLoading } = useQuery({
    queryKey: ['tax', 'rates'],
    queryFn: () => financeApi.getTaxRates()
  });

  const addMutation = useMutation({
    mutationFn: () => financeApi.createTaxRate(name, cgst, sgst, igst),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax', 'rates'] });
      setIsAdding(false);
      setName('');
      setCgst(0);
      setSgst(0);
      setIgst(0);
    }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tax Configurations</h1>
          <p className="text-slate-500 text-sm mt-1">Configure GST rates for product compliance.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Tax Rate
        </button>
      </div>

      {isAdding && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-amber-900 mb-4">Create Tax Rate</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="col-span-1 md:col-span-4">
              <label className="block text-sm font-medium text-amber-900 mb-1">Rate Name <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. GST 18%"
                className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">CGST (%)</label>
              <input 
                type="number" 
                value={cgst}
                onChange={e => setCgst(Number(e.target.value))}
                min="0"
                step="0.1"
                className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">SGST (%)</label>
              <input 
                type="number" 
                value={sgst}
                onChange={e => setSgst(Number(e.target.value))}
                min="0"
                step="0.1"
                className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">IGST (%)</label>
              <input 
                type="number" 
                value={igst}
                onChange={e => setIgst(Number(e.target.value))}
                min="0"
                step="0.1"
                className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">Total GST</label>
              <div className="w-full bg-slate-100 rounded-lg p-2 font-bold text-slate-700">
                {cgst + sgst}% (or {igst}% IGST)
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-amber-700 bg-white border border-amber-200 rounded-lg hover:bg-amber-100"
            >
              Cancel
            </button>
            <button 
              onClick={() => addMutation.mutate()}
              disabled={!name || addMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Tax Rate
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading tax rates...</div>
        ) : !taxRates || taxRates.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Percent className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium">No tax rates configured.</p>
            <p className="text-sm mt-1">Click "Add Tax Rate" to create one.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rate Name</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">CGST</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">SGST</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">IGST</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {taxRates.map((rate: any) => (
                <tr key={rate.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-slate-900">{rate.name}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 text-right">{rate.cgst}%</td>
                  <td className="py-4 px-6 text-sm text-slate-600 text-right">{rate.sgst}%</td>
                  <td className="py-4 px-6 text-sm text-slate-600 text-right">{rate.igst}%</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-900 text-right">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">{rate.cgst + rate.sgst}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
