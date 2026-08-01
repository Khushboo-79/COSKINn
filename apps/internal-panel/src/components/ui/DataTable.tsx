import React from 'react';
import { ChevronDown, ChevronUp, Download, Filter, Search } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  onExport?: () => void;
}

export function DataTable<T>({ 
  data, 
  columns, 
  onSort, 
  sortKey, 
  sortDirection,
  searchPlaceholder = 'Search...',
  onSearch,
  onExport
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {onSearch && (
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4 mr-2 text-slate-400" />
            Filter
          </button>
          {onExport && (
            <button 
              onClick={onExport}
              className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2 text-slate-400" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={String(col.key)}
                  scope="col" 
                  className={`px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider ${col.sortable ? 'cursor-pointer select-none hover:bg-slate-100' : ''}`}
                  onClick={() => col.sortable && onSort?.(String(col.key))}
                >
                  <div className="flex items-center space-x-1">
                    <span>{col.header}</span>
                    {col.sortable && sortKey === String(col.key) && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500 text-sm">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer (Placeholder) */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.max(1, data.length)}</span> of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
