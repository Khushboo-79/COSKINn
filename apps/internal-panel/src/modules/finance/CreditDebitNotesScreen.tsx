import { Receipt, FileMinus, FilePlus } from 'lucide-react';

export const CreditDebitNotesScreen = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Credit & Debit Notes</h1>
          <p className="text-slate-500 text-sm mt-1">Manage adjustments against invoices and supplier accounts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-200 transition-colors">
            <FileMinus className="h-4 w-4 mr-2" /> Issue Debit Note
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors">
            <FilePlus className="h-4 w-4 mr-2" /> Issue Credit Note
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <Receipt className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-700 mb-2">Notes Ledger Shell</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          This ledger will be activated in Phase 2 to track manual financial adjustments, refunds, and supplier discrepancies.
        </p>
      </div>
    </div>
  );
};
