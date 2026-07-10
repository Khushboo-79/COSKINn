import { Building2, Search, Plus, MapPin, Package, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

export default function WarehousesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newWhName, setNewWhName] = useState('');
  const [newWhCode, setNewWhCode] = useState('');
  const [newWhType, setNewWhType] = useState('MAIN');
  const [newWhAddress, setNewWhAddress] = useState('');

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const { data } = await api.get('/inventory/warehouses');
      setWarehouses(data);
    } catch (err) {
      toast.error('Failed to load warehouses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWarehouse = async () => {
    if (!newWhName) {
      toast.error('Warehouse name is required');
      return;
    }
    try {
      await api.post('/inventory/warehouses', {
        name: newWhName,
        code: newWhCode,
        type: newWhType,
        location: newWhAddress
      });
      toast.success('Warehouse created successfully!');
      setShowAddModal(false);
      fetchWarehouses();
      
      setNewWhName('');
      setNewWhCode('');
      setNewWhType('MAIN');
      setNewWhAddress('');
    } catch (error) {
      toast.error('Failed to create warehouse');
    }
  };

  const filteredWarehouses = warehouses.filter(wh => 
    wh.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    wh.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Warehouses</h2>
          <p className="text-sm text-slate-500 mt-1">Manage physical locations, bins, and capacity.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center gap-2 shadow-sm shadow-rose-200">
          <Plus className="w-4 h-4" /> Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Facilities</p>
            <p className="text-2xl font-bold text-slate-800">{warehouses.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Avg Capacity</p>
            <p className="text-2xl font-bold text-slate-800">70%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Staff</p>
            <p className="text-2xl font-bold text-slate-800">38</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Warehouse Directory</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search warehouses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-72 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ID & Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Capacity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8 text-slate-500">Loading warehouses...</td></tr>
            ) : filteredWarehouses.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-slate-500">No warehouses found</td></tr>
            ) : filteredWarehouses.map(wh => (
              <tr key={wh.id} className="hover:bg-slate-50/50 group transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{wh.name}</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{wh.code}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {wh.address || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    Fulfillment Center
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '60%' }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">60%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    wh.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {wh.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage Bins ({wh.bins?.length || 0})
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Warehouse Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Add New Warehouse</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Warehouse Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. North Region Hub" 
                    value={newWhName}
                    onChange={(e) => setNewWhName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Warehouse Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. WH-05" 
                    value={newWhCode}
                    onChange={(e) => setNewWhCode(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type</label>
                  <select 
                    value={newWhType}
                    onChange={(e) => setNewWhType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                    <option value="MAIN">Main Warehouse</option>
                    <option value="DISTRIBUTION">Distribution Hub</option>
                    <option value="RETAIL">Retail Store</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address</label>
                  <textarea 
                    placeholder="Full address" 
                    rows={2} 
                    value={newWhAddress}
                    onChange={(e) => setNewWhAddress(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"></textarea>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddWarehouse}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                >
                  Save Warehouse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
