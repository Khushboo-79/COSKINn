import { useState } from 'react';
import { UploadCloud, FileSpreadsheet, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

export const BulkImportScreen = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus('idle');

    // Mock processing delay
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Bulk CSV Import</h1>
        <p className="text-slate-500 mt-1">Upload multiple products simultaneously using our standard template.</p>
        
        <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-start gap-4">
          <div className="bg-white p-2 rounded-lg shrink-0">
            <FileSpreadsheet className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-900 mb-1">Download the Template</h3>
            <p className="text-sm text-primary-700 mb-3">
              Ensure you use the exact column headers provided in the template. All Cosmetics Rules 2020 mandatory fields (HSN, GST, Manufacturer, Origin) are required for a successful import.
            </p>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
              Download Template (.csv)
            </button>
          </div>
        </div>

        <div className="mt-8 border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors relative">
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 text-primary-500 animate-spin mb-3" />
              <p className="text-sm font-medium text-slate-900">Validating & Importing...</p>
              <p className="text-xs text-slate-500 mt-1">Checking compliance fields</p>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center text-green-600">
              <div className="bg-green-100 p-4 rounded-full mb-3">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="text-base font-semibold">Import Successful!</p>
              <p className="text-sm text-green-700 mt-1">24 products added to Drafts.</p>
              <p className="text-xs text-slate-500 mt-4 underline">Upload another file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="bg-slate-100 p-4 rounded-full text-slate-500 mb-4">
                <UploadCloud className="h-8 w-8" />
              </div>
              <p className="text-base font-medium text-slate-900 mb-1">Drag and drop your filled CSV here</p>
              <p className="text-sm text-slate-500">or click to browse your files</p>
            </div>
          )}
        </div>
        
        {uploadStatus === 'error' && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 mb-1">Import Failed: Validation Errors</p>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                <li>Row 4: Missing HSN Code</li>
                <li>Row 12: Invalid GST Rate</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
