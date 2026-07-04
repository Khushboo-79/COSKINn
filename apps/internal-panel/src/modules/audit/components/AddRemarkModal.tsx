interface AddRemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRemarkModal = ({ isOpen, onClose }: AddRemarkModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-rose-100">
        <div className="bg-rose-50 p-4 border-b border-rose-100 flex justify-between items-center">
          <h3 id="modal-title" className="text-lg font-bold text-rose-900">Add Auditor Remark</h3>
          <button onClick={onClose} className="text-rose-400 hover:text-rose-600 transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Remarks are permanently attached to this audit log entry. They are additive notes and do not mutate the underlying data.
          </p>
          
          <div className="mb-4">
            <label htmlFor="remark-input" className="block text-sm font-medium text-rose-800 mb-2">Remark Note</label>
            <textarea 
              id="remark-input"
              rows={4}
              className="w-full border-rose-200 rounded-md shadow-sm p-3 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300"
              placeholder="Enter your observation or investigation note here..."
            ></textarea>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-rose-500 border border-transparent rounded-md hover:bg-rose-600 shadow-sm transition-colors">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};
