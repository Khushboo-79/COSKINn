import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hrApi } from '../../core/api/hr';
import { adminApi } from '../../core/api/admin';
import { FileText, UploadCloud, Loader2, Link as LinkIcon, FileCheck } from 'lucide-react';

export const EmployeeDocumentsScreen = () => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [docType, setDocType] = useState('Contract');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state to store uploaded docs for UI demonstration
  const [uploadedDocs, setUploadedDocs] = useState<{ id: string, empName: string, type: string, url: string, date: Date }[]>([]);

  const { data: employees } = useQuery({
    queryKey: ['hr', 'employees'],
    queryFn: () => hrApi.getEmployees()
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!selectedEmp) {
      toast("Please select an employee first.");
      return;
    }

    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      // Use existing S3 upload API from admin panel
      const { url } = await adminApi.uploadFile(file);
      
      const empName = employees?.find((emp: any) => emp.id === selectedEmp)?.name || 'Unknown';
      
      setUploadedDocs(prev => [{
        id: Math.random().toString(36).substring(7),
        empName,
        type: docType,
        url,
        date: new Date()
      }, ...prev]);
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error("Upload failed", err);
      toast.error();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Documents</h1>
          <p className="text-slate-500 text-sm mt-1">Securely upload and manage employee contracts, IDs, and certifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 flex items-center">
              <UploadCloud className="h-5 w-5 mr-2 text-indigo-600" />
              Upload Document
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Employee</label>
              <select 
                value={selectedEmp}
                onChange={e => setSelectedEmp(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose Employee --</option>
                {employees?.map((emp: any) => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.employeeId})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
              <select 
                value={docType}
                onChange={e => setDocType(e.target.value)}
                className="w-full border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option>Contract</option>
                <option>Identity Proof</option>
                <option>Address Proof</option>
                <option>Offer Letter</option>
                <option>Tax Form</option>
              </select>
            </div>

            <div className="pt-2">
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={!selectedEmp || isUploading}
                className="w-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium py-3 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading to S3...</>
                ) : (
                  <>Select File & Upload</>
                )}
              </button>
              <p className="text-xs text-center text-slate-500 mt-2">Supports PDF, PNG, JPG up to 10MB.</p>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
            {uploadedDocs.length === 0 ? (
              <div className="p-12 text-center h-full flex flex-col justify-center items-center">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="font-medium text-slate-900">No documents uploaded yet.</p>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Upload an employee document using the panel on the left. Files are securely stored in our AWS S3 bucket.
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="py-3 px-6">Document</th>
                    <th className="py-3 px-6">Employee</th>
                    <th className="py-3 px-6 text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {uploadedDocs.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <FileCheck className="h-5 w-5 text-indigo-500 mr-3" />
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{doc.type}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{doc.date.toLocaleString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                        {doc.empName}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a 
                          href={doc.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          <LinkIcon className="h-3 w-3 mr-1" /> View File
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
