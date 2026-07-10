import { useState, useEffect } from 'react';
import { Search, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

export default function ReturnsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [returns, setReturns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null);
  const [processAction, setProcessAction] = useState('APPROVED');

  const fetchReturns = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/returns');
      setReturns(data);
    } catch (err) {
      toast.error('Failed to load returns');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleProcessReturn = async () => {
    if (!selectedReturnId) return;
    try {
      await api.put(`/returns/${selectedReturnId}/process`, {
        action: processAction,
        adminNotes: 'Processed via Inventory Panel'
      });
      toast.success(`Return ${selectedReturnId} processed successfully!`);
      setShowProcessModal(false);
      fetchReturns();
    } catch (error) {
      toast.error('Failed to process return');
    }
  };

  const filteredReturns = returns.filter(ret => 
    ret.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Returns</h2>
          <p className="text-sm text-slate-500 mt-1">Process customer returns, perform QA, and restock or dispose of items.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-amber-700 font-medium">Pending QA</p>
            <p className="text-2xl font-bold text-amber-900">{returns.filter(r => r.status === 'PENDING').length}</p>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-emerald-700 font-medium">Restocked</p>
            <p className="text-2xl font-bold text-emerald-900">{returns.filter(r => r.status === 'APPROVED').length}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-red-700 font-medium">Disposed / Rejected</p>
            <p className="text-2xl font-bold text-red-900">{returns.filter(r => r.status === 'REJECTED').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-slate-400" /> Recent Returns
          </h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by Return ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-72 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Return ID</th>
              <th className="px-6 py-4">Order Ref</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8 text-slate-500">Loading returns...</td></tr>
            ) : filteredReturns.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-slate-500">No returns found.</td></tr>
            ) : filteredReturns.map(ret => (
              <tr key={ret.id} className="hover:bg-slate-50/50 group transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-700">{ret.id}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{ret.orderId}</td>
                <td className="px-6 py-4 text-slate-600">{ret.reason}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(ret.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    ret.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700' : 
                    ret.status === 'PENDING' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {ret.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {ret.status === 'PENDING' || ret.status === 'REQUESTED' ? (
                    <button 
                      onClick={() => {
                        setSelectedReturnId(ret.id);
                        setShowProcessModal(true);
                      }}
                      className="text-sm font-semibold text-rose-600 hover:text-rose-700">
                      Process
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowLogModal(true)}
                      className="text-sm font-semibold text-slate-400 hover:text-slate-600">
                      View Log
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Process Return Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Process Return #{selectedReturnId?.slice(-6) || '---'}</h3>
              <button 
                onClick={() => setShowProcessModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Action to Take</label>
                <select 
                  value={processAction}
                  onChange={(e) => setProcessAction(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                  <option value="APPROVED">Restock Item (Approve)</option>
                  <option value="REJECTED">Dispose / Write-off (Reject)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">QA Notes (Optional)</label>
                <textarea rows={3} placeholder="Condition of the item upon return..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowProcessModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleProcessReturn}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Return Log #RET-1092</h3>
              <button 
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="relative border-l-2 border-slate-200 pl-4 space-y-6">
                <div className="relative">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-4 ring-white"></div>
                  <p className="font-bold text-slate-800 text-sm">Item Restocked</p>
                  <p className="text-xs text-slate-500 mt-0.5">QA passed, returned to WH-01 inventory.</p>
                  <p className="text-[10px] text-slate-400 mt-1">Today, 2:45 PM</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></div>
                  <p className="font-bold text-slate-800 text-sm">Return Initiated</p>
                  <p className="text-xs text-slate-500 mt-0.5">Customer requested return due to "Wrong Item".</p>
                  <p className="text-[10px] text-slate-400 mt-1">Yesterday, 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
