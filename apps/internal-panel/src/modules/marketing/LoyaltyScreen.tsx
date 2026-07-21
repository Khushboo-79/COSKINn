import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { Crown, Star, Plus, Loader2, Save, Trash2, Edit, IndianRupee } from 'lucide-react';

export const LoyaltyScreen = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'tiers' | 'ledger'>('tiers');

  // Tier Form State
  const [isAddingTier, setIsAddingTier] = useState(false);
  const [name, setName] = useState('');
  const [minSpend, setMinSpend] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1.0);

  const { data: tiers, isLoading: isLoadingTiers } = useQuery({
    queryKey: ['marketing', 'membershipTiers'],
    queryFn: () => marketingApi.getMembershipTiers()
  });

  const { data: ledger, isLoading: isLoadingLedger } = useQuery({
    queryKey: ['marketing', 'pointsLedger'],
    queryFn: () => marketingApi.getPointsLedger()
  });

  const addTierMutation = useMutation({
    mutationFn: () => marketingApi.createMembershipTier({ name, minSpend, multiplier }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'membershipTiers'] });
      setIsAddingTier(false);
      setName('');
      setMinSpend(0);
      setMultiplier(1.0);
    }
  });

  const deleteTierMutation = useMutation({
    mutationFn: (id: string) => marketingApi.deleteMembershipTier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'membershipTiers'] });
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Loyalty & Rewards</h1>
          <p className="text-slate-500 text-sm mt-1">Manage membership tiers and view points distribution.</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tiers')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'tiers' ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Crown className="inline-block h-4 w-4 mr-2" /> Membership Tiers
        </button>
        <button
          onClick={() => setActiveTab('ledger')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'ledger' ? 'border-amber-500 text-amber-700 bg-amber-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Star className="inline-block h-4 w-4 mr-2" /> Global Points Ledger
        </button>
      </div>

      {activeTab === 'tiers' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm text-slate-600">
              Tiers are re-calculated automatically every night based on customers' lifetime spend.
            </div>
            <button 
              onClick={() => setIsAddingTier(true)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Tier
            </button>
          </div>

          {isAddingTier && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-amber-900 mb-4">New Membership Tier</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Tier Name <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Platinum VIP"
                    className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Min Lifetime Spend (₹) <span className="text-rose-500">*</span></label>
                  <input 
                    type="number" 
                    value={minSpend}
                    onChange={e => setMinSpend(Number(e.target.value))}
                    className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Points Multiplier (e.g. 1.5x) <span className="text-rose-500">*</span></label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={multiplier}
                    onChange={e => setMultiplier(Number(e.target.value))}
                    className="w-full border-amber-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-amber-200 pt-4">
                <button 
                  onClick={() => setIsAddingTier(false)}
                  className="px-4 py-2 text-sm font-medium text-amber-800 bg-white border border-amber-300 rounded-lg hover:bg-amber-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => addTierMutation.mutate()}
                  disabled={!name || addTierMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center"
                >
                  {addTierMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Tier
                </button>
              </div>
            </div>
          )}

          {isLoadingTiers ? (
            <div className="p-12 text-center text-slate-500"><Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-500 mb-2" />Loading tiers...</div>
          ) : !tiers || tiers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
              <Crown className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="font-medium text-slate-900">No membership tiers configured.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.map((tier: any) => (
                <div key={tier.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col relative group">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                      onClick={() => {
                        if(window.confirm('Delete this tier?')) deleteTierMutation.mutate(tier.id);
                      }}
                      className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-4">
                      <Crown className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
                    <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                      Spend {formatCurrency(tier.minSpend)}+
                    </div>

                    <div className="w-full pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Multiplier</p>
                        <p className="text-lg font-bold text-amber-600">{tier.multiplier}x</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Members</p>
                        <p className="text-lg font-bold text-slate-900">-</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'ledger' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoadingLedger ? (
            <div className="p-12 text-center text-slate-500">Loading ledger...</div>
          ) : !ledger || ledger.length === 0 ? (
            <div className="p-12 text-center">
              <Star className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="font-medium text-slate-900">No reward points issued yet.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Points</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ledger.map((entry: any) => (
                  <tr key={entry.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6 text-sm text-slate-500">{new Date(entry.createdAt).toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-900 truncate max-w-[150px]">{entry.userId}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        entry.type === 'EARN' ? 'bg-emerald-100 text-emerald-800' :
                        entry.type === 'REDEEM' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {entry.type}
                      </span>
                    </td>
                    <td className={`py-4 px-6 text-right font-bold ${
                        entry.type === 'EARN' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                      {entry.type === 'EARN' ? '+' : '-'}{entry.points}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{entry.reference || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

    </div>
  );
};
