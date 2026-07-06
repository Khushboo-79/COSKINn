import React, { useState, useRef } from 'react';
import { api } from '../../lib/axios';
import { Upload, Download, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onClose: () => void;
  onRefresh: () => void;
}

export default function BulkImportExport({ onClose, onRefresh }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setError('');
    try {
      const response = await api.get('/product/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'coskinn_catalog_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError('Failed to export catalog. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file.');
      return;
    }

    setIsUploading(true);
    setError('');
    setImportResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/product/import/csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImportResult(response.data);
      onRefresh();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to import CSV. Ensure required fields are present.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Bulk Import / Export</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">{error}</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Export Section */}
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Export Catalog</h3>
              <p className="text-sm text-slate-500 mb-6 px-4">
                Download a CSV of the entire catalog including all LIVE and DRAFT products.
              </p>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isExporting ? 'Generating CSV...' : 'Download CSV'}
              </button>
            </div>

            {/* Import Section */}
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 relative overflow-hidden group">
              <div className="w-16 h-16 bg-white text-slate-600 shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Import CSV</h3>
              <p className="text-sm text-slate-500 mb-6 px-4">
                Upload a formatted CSV file to bulk-create or update products.
              </p>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 shadow-sm"
              >
                {isUploading ? 'Uploading & Processing...' : 'Select CSV File'}
              </button>
            </div>

          </div>

          {/* Import Results */}
          {importResult && (
            <div className="mt-8 border border-green-200 bg-green-50 rounded-2xl p-6">
              <h3 className="text-green-800 font-bold flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5" />
                Import Completed
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded-xl border border-green-100 text-center shadow-sm">
                  <div className="text-2xl font-bold text-slate-800">{importResult.total}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Total Rows</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100 text-center shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{importResult.success}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Successfully Imported</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100 text-center shadow-sm">
                  <div className="text-2xl font-bold text-rose-500">{importResult.failed}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Failed to Import</div>
                </div>
              </div>

              {importResult.errors && importResult.errors.length > 0 && (
                <div className="mt-4 bg-white rounded-xl border border-red-100 overflow-hidden">
                  <div className="bg-red-50 px-4 py-2 border-b border-red-100 text-xs font-bold text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Error Log
                  </div>
                  <div className="p-4 max-h-40 overflow-y-auto text-xs font-mono text-red-600 space-y-2">
                    {importResult.errors.map((err: string, i: number) => (
                      <div key={i}>{err}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
