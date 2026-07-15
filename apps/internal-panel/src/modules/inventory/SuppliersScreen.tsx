import { Building2, Mail, Phone, ExternalLink, Users, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';

export default function SuppliersScreen() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [supplier, setSupplier] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const { data } = await api.get('/inventory/suppliers');
      if (data.length > 0) {
        setSupplier(data[0]);
        setName(data[0].name);
        setEmail(data[0].contactEmail || '');
        setPhone(data[0].contactPhone || '');
        setAddress(data[0].address || '');
      }
    } catch (err) {
      toast.error('Failed to load supplier');
    }
  };

  const handleUpdate = async () => {
    try {
      if (supplier?.id) {
        await api.post(`/inventory/suppliers/${supplier.id}`, { name, contactEmail: email, contactPhone: phone, address });
        toast.success('Details updated successfully!');
      } else {
        await api.post(`/inventory/suppliers`, { name, contactEmail: email, contactPhone: phone, address });
        toast.success('Supplier created successfully!');
      }
      setShowEditModal(false);
      fetchSupplier();
    } catch (err) {
      toast.error('Failed to save supplier');
    }
  };
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Primary Manufacturer</h2>
          <p className="text-sm text-slate-500 mt-1">Manage contact information for your primary manufacturing facility.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="h-32 bg-slate-800"></div>
            
            <div className="px-8 pb-8 relative">
              <div className="absolute -top-12 w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center">
                <Building2 className="w-10 h-10 text-slate-800" />
              </div>
              
              <div className="mt-16">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{supplier ? supplier.name : 'No Supplier Found'}</h3>
                    <p className="text-slate-500 mt-1">Primary production facility for all COSKINn products.</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Partner
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <Users className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Production Manager</p>
                          <p className="text-sm font-bold text-slate-800">Dr. Aarav Mehta</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Email Address</p>
                          <a href={`mailto:${supplier?.contactEmail}`} className="text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors">{supplier?.contactEmail || 'N/A'}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Phone Number</p>
                          <p className="text-sm font-bold text-slate-800">{supplier?.contactPhone || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Facility Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Address</p>
                        <p className="text-sm font-medium text-slate-800 mt-1 whitespace-pre-wrap">
                          {supplier?.address || 'No Address Provided'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Active Purchase Orders</p>
                        <p className="text-sm font-bold text-slate-800 mt-1">12 Pending Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => navigate('/inventory/purchase-orders')}
                    className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm text-sm">
                    Create Purchase Order
                  </button>
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm text-sm">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-slate-400" /> Quick Links
              </h3>
              <div className="space-y-2">
                <button onClick={() => navigate('/inventory/purchase-orders')} className="w-full text-left block p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors text-sm font-medium text-slate-700">
                  View Recent POs
                </button>
                <button onClick={() => navigate('/inventory/reports')} className="w-full text-left block p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors text-sm font-medium text-slate-700">
                  Quality Control Reports
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* Edit Details Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Edit Manufacturer Details</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Supplier Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Facility Address</label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"></textarea>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
