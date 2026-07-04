import { Link } from 'react-router-dom';
import { ExportButtons } from './components/ExportButtons';

export const InventoryReport = () => {
  // Mock data for Day 11 UI scaffolding
  const mockReports = [
    {
      id: 1,
      date: '2026-07-04',
      productSku: 'SKU-8801',
      productName: 'Vitamin C Face Serum',
      openingStock: 450,
      inbound: 200,
      outbound: 50,
      writeOffs: 5,
      closingStock: 595,
    },
    {
      id: 2,
      date: '2026-07-03',
      productSku: 'SKU-7722',
      productName: 'Niacinamide Cleanser',
      openingStock: 120,
      inbound: 0,
      outbound: 40,
      writeOffs: 0,
      closingStock: 80,
    },
    {
      id: 3,
      date: '2026-07-02',
      productSku: 'SKU-9918',
      productName: 'Retinol Night Cream',
      openingStock: 300,
      inbound: 500,
      outbound: 150,
      writeOffs: 12,
      closingStock: 638,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link 
          to="/audit" 
          className="group bg-white border border-rose-100 text-rose-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:border-rose-300 hover:text-rose-900 transition-all duration-300 font-semibold text-sm flex items-center px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-rose-900">Inventory Movement Reports (Read-Only)</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Active SKUs</div>
          <div className="text-2xl font-bold text-gray-800">142</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Units in Stock</div>
          <div className="text-2xl font-bold text-gray-800">18,540</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Inbound (MTD)</div>
          <div className="text-2xl font-bold text-green-600">+4,200</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100">
          <div className="text-sm text-gray-500 mb-1">Total Write-Offs (MTD)</div>
          <div className="text-2xl font-bold text-red-500">-85</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-rose-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Product SKU / Name</label>
          <input type="text" placeholder="Search SKU..." className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500 placeholder-rose-300" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">Start Date</label>
          <input type="date" className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-rose-800 mb-1">End Date</label>
          <input type="date" className="w-full border-rose-200 rounded-md shadow-sm p-2 bg-rose-50/30 text-rose-900 focus:ring-rose-500 focus:border-rose-500" />
        </div>
        
        <div className="w-auto flex space-x-2">
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            Generate Report
          </button>
          <ExportButtons />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-rose-800 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Opening</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Inbound</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Outbound</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Write-Offs</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-rose-800 uppercase tracking-wider">Closing</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {mockReports.map((report) => (
              <tr key={report.id} className="hover:bg-rose-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-semibold text-rose-900">{report.productSku}</div>
                  <div className="text-gray-500 text-xs">{report.productName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{report.openingStock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">+{report.inbound}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">-{report.outbound}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-500">-{report.writeOffs}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-rose-900">{report.closingStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
