import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { useRef } from 'react';

export const InvoiceScreen = () => {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);

  const { data: invoice, isLoading } = useQuery({
    queryKey: ['admin', 'order', id, 'invoice'],
    queryFn: () => orderApi.getInvoice(id as string),
    enabled: !!id,
  });

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center text-slate-500">
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Generating Invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-500">
        <h2 className="text-xl font-bold text-slate-700">Invoice Not Available</h2>
        <p className="mt-2 text-sm">Could not generate invoice for this order.</p>
        <Link to={`/orders/${id}`} className="mt-4 text-primary-600 hover:underline">Back to Order</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      {/* Controls - Hidden during print */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 print:hidden">
        <Link to={`/orders/${id}`} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Order
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Save PDF
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div 
        ref={printRef} 
        className="w-full max-w-4xl bg-white shadow-xl print:shadow-none print:max-w-none print:w-full print:p-0 p-12 text-slate-900 text-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">COSKINn</h1>
            <p className="text-slate-500 mt-2">Tax Invoice / Bill of Supply</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold mb-1">Invoice #{invoice.invoiceNumber}</h2>
            <p className="text-slate-500">Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
            <p className="text-slate-500 mt-2 font-mono">Order ID: {invoice.orderId}</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">Billed To (Customer)</h3>
            <p className="font-medium text-lg mb-1">{invoice.customerDetails.name}</p>
            <p className="text-slate-600">
              {invoice.customerDetails.addressLine1}<br />
              {invoice.customerDetails.addressLine2 && <>{invoice.customerDetails.addressLine2}<br /></>}
              {invoice.customerDetails.city}, {invoice.customerDetails.state} {invoice.customerDetails.pincode}
            </p>
            <p className="text-slate-600 mt-2">Email: {invoice.customerDetails.email}</p>
            <p className="text-slate-600">Phone: {invoice.customerDetails.mobile}</p>
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">Sold By</h3>
            <p className="font-medium text-lg mb-1">{invoice.companyDetails.name}</p>
            <p className="text-slate-600">
              {invoice.companyDetails.address}<br />
              {invoice.companyDetails.city}, {invoice.companyDetails.state} {invoice.companyDetails.pincode}
            </p>
            <p className="text-slate-600 mt-2 font-mono text-xs">GSTIN: {invoice.companyDetails.gstin}</p>
            <p className="text-slate-600 font-mono text-xs">CIN: {invoice.companyDetails.cin}</p>
          </div>
        </div>

        {/* Line Items */}
        <table className="w-full mb-8 text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-900">
              <th className="py-3 px-2 font-bold text-slate-900 w-12">#</th>
              <th className="py-3 px-2 font-bold text-slate-900">Item Description</th>
              <th className="py-3 px-2 font-bold text-slate-900 text-right">HSN</th>
              <th className="py-3 px-2 font-bold text-slate-900 text-right">Qty</th>
              <th className="py-3 px-2 font-bold text-slate-900 text-right">Rate</th>
              <th className="py-3 px-2 font-bold text-slate-900 text-right">Taxable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {invoice.items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="py-4 px-2 text-slate-500">{index + 1}</td>
                <td className="py-4 px-2">
                  <p className="font-medium text-slate-900">{item.productName}</p>
                  <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                </td>
                <td className="py-4 px-2 text-right font-mono text-slate-500 text-xs">{item.hsnCode}</td>
                <td className="py-4 px-2 text-right text-slate-900">{item.quantity}</td>
                <td className="py-4 px-2 text-right text-slate-900">₹{item.unitPrice.toFixed(2)}</td>
                <td className="py-4 px-2 text-right font-medium text-slate-900">₹{item.taxableAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* GST Breakup */}
        <div className="flex justify-end mb-12">
          <div className="w-80">
            <div className="flex justify-between py-2 text-slate-600">
              <span>Total Taxable Value:</span>
              <span className="font-medium text-slate-900">₹{invoice.totals.totalTaxableAmount.toFixed(2)}</span>
            </div>
            
            {invoice.gstBreakup.cgst > 0 && (
              <div className="flex justify-between py-2 text-slate-600">
                <span>CGST (9%):</span>
                <span className="font-medium text-slate-900">₹{invoice.gstBreakup.cgst.toFixed(2)}</span>
              </div>
            )}
            {invoice.gstBreakup.sgst > 0 && (
              <div className="flex justify-between py-2 text-slate-600">
                <span>SGST (9%):</span>
                <span className="font-medium text-slate-900">₹{invoice.gstBreakup.sgst.toFixed(2)}</span>
              </div>
            )}
            {invoice.gstBreakup.igst > 0 && (
              <div className="flex justify-between py-2 text-slate-600">
                <span>IGST (18%):</span>
                <span className="font-medium text-slate-900">₹{invoice.gstBreakup.igst.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2 text-slate-600 border-t border-slate-200 mt-2 pt-2">
              <span>Shipping Charges:</span>
              <span className="font-medium text-slate-900">₹{invoice.totals.shippingFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-3 mt-4 border-y-2 border-slate-900 text-lg font-bold text-slate-900">
              <span>Invoice Total:</span>
              <span>₹{invoice.totals.finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 border-t border-slate-200 pt-8">
          <p>This is a computer-generated invoice and does not require a physical signature.</p>
          <p className="mt-1">Authorized Signatory, COSKINn India Pvt. Ltd.</p>
        </div>
      </div>
    </div>
  );
};
