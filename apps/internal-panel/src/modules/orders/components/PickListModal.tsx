import { X, Printer, Package2 } from 'lucide-react';
import { toast } from 'sonner';

interface PickListModalProps {
  data: {
    orderIds: string[];
    aggregatedItems: { sku: string; quantity: number }[];
  };
  onClose: () => void;
}

export const PickListModal = ({ data, onClose }: PickListModalProps) => {
  const handlePrint = () => {
    window.print();
    toast.success('Printing pick list...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
              <Package2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Generated Pick List</h2>
              <p className="text-sm text-slate-500">For {data.orderIds.length} selected orders</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content (Printable Area) */}
        <div className="flex-1 overflow-y-auto p-6" id="printable-pick-list">
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Order References</h3>
            <div className="flex flex-wrap gap-2">
              {data.orderIds.map(id => (
                <span key={id} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-mono rounded-md border border-slate-200">
                  {id.slice(-8).toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Aggregated Items</h3>
            
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3 text-right">Quantity Required</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.aggregatedItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-medium text-slate-900">{item.sku}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-700">{item.quantity}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="w-6 h-6 border-2 border-slate-300 rounded mx-auto"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handlePrint}
            className="px-5 py-2.5 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-500/20 transition-all flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Pick List
          </button>
        </div>
      </div>
    </div>
  );
};
