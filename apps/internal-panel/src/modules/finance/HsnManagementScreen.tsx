import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../core/api/finance';
import { Plus, Search, Tag, Loader2, Save } from 'lucide-react';

export const HsnManagementScreen = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const { data: hsnCodes, isLoading } = useQuery({
    queryKey: ['tax', 'hsn'],
    queryFn: () => financeApi.getHsnCodes()
  });

  const addMutation = useMutation({
    mutationFn: () => financeApi.createHsnCode(newCode, newDesc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tax', 'hsn'] });
      setIsAdding(false);
      setNewCode('');
      setNewDesc('');
    }
  });

  const filteredCodes = hsnCodes?.filter((hsn: any) => 
    hsn.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (hsn.description && hsn.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HSN Codes</h1>
          <p className="text-slate-500 text-sm mt-1">Manage Harmonized System of Nomenclature codes for product compliance.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Add HSN Code
        </button>
      </div>

      {isAdding && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Add New HSN Code</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">HSN Code <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={newCode}
                onChange={e => setNewCode(e.target.value)}
                placeholder="e.g. 33049910"
                className="w-full border-blue-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Description</label>
              <input 
                type="text" 
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="e.g. Beauty or make-up preparations"
                className="w-full border-blue-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => addMutation.mutate()}
              disabled={!newCode || addMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save HSN Code
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by code or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading HSN codes...</div>
        ) : filteredCodes.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Tag className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium">No HSN codes found.</p>
            {searchTerm ? <p className="text-sm mt-1">Try adjusting your search.</p> : <p className="text-sm mt-1">Click "Add HSN Code" to create one.</p>}
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">HSN Code</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCodes.map((hsn: any) => (
                <tr key={hsn.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">
                      {hsn.code}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-700">
                    {hsn.description || <span className="text-slate-400 italic">No description</span>}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">
                    {new Date(hsn.createdAt).toLocaleDateString()}
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
