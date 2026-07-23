import { toast } from 'sonner';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseApi } from '../../core/api/warehouse';
import { Search, Plus, MapPin, Grid2X2, Loader2, Save, X } from 'lucide-react';

export const BinManagementScreen = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBin, setNewBin] = useState({ code: '', description: '' });

  const { data: bins, isLoading } = useQuery({
    queryKey: ['admin', 'warehouse', 'bins'],
    queryFn: () => warehouseApi.getBins(),
  });

  const createMutation = useMutation({
    mutationFn: () => warehouseApi.createBin({ 
      warehouseId: 'default-warehouse', // Standardized for MVP
      code: newBin.code,
      description: newBin.description
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'warehouse', 'bins'] });
      setIsModalOpen(false);
      setNewBin({ code: '', description: '' });
    },
    onError: (err: any) => {
      toast.error();
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  const filteredBins = bins?.filter((b: any) => 
    b.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bin Management</h1>
          <p className="text-slate-500 text-sm mt-1">Configure and manage physical storage locations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Bin
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search bins by code (e.g. A1-01)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 text-primary-500 animate-spin" /></div>
      ) : !filteredBins || filteredBins.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
          <Grid2X2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No storage bins found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBins.map((bin: any) => (
            <div key={bin.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-primary-200 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded">BIN</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-mono tracking-wider">{bin.code}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{bin.description || 'No description provided'}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Create Storage Bin</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bin Code (e.g. A1-01)</label>
                <input
                  type="text"
                  required
                  value={newBin.code}
                  onChange={e => setNewBin({ ...newBin, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-mono uppercase"
                  placeholder="A1-01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={newBin.description}
                  onChange={e => setNewBin({ ...newBin, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="E.g. Aisle 1, Rack 1"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={createMutation.isPending} className="px-6 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors flex items-center">
                  {createMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Bin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
