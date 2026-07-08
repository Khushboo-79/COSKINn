export const downloadInvoice = (order) => {
  const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invoice - ${order.id}</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; max-width: 800px; margin: auto; }
        h1 { color: #FF0069; margin-bottom: 0; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
        .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
        table { w-full; width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
        th { background-color: #f9f9f9; color: #555; }
        .total-section { text-align: right; margin-top: 20px; }
        .total-row { display: flex; justify-content: flex-end; gap: 40px; margin-bottom: 10px; }
        .grand-total { font-size: 1.2em; font-weight: bold; color: #FF0069; border-top: 2px solid #eee; padding-top: 10px; }
        .footer { text-align: center; color: #888; font-size: 0.9em; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>COSKINn</h1>
          <p>Premium Luxury Beauty</p>
        </div>
        <div style="text-align: right;">
          <h2>INVOICE</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Date:</strong> ${order.date}</p>
        </div>
      </div>
      
      <div class="details">
        <div>
          <h3 style="margin-bottom: 5px;">Billed To:</h3>
          <p style="margin-top:0;">${order.shippingAddress || 'Customer Address (Provided during checkout)'}</p>
        </div>
        <div style="text-align: right;">
          <h3 style="margin-bottom: 5px;">Payment Details:</h3>
          <p style="margin-top:0;">${order.paymentMethod}<br/>${order.paymentDetails}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Variant</th>
            <th>Qty</th>
            <th style="text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td>${item.variant}</td>
              <td>${item.qty}</td>
              <td style="text-align: right;">₹${item.price}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row"><span>Subtotal:</span> <span>₹${order.subtotal}</span></div>
        ${order.discount > 0 ? `<div class="total-row" style="color: green;"><span>Discount:</span> <span>-₹${order.discount}</span></div>` : ''}
        ${order.couponDiscount > 0 ? `<div class="total-row" style="color: green;"><span>Coupon Discount:</span> <span>-₹${order.couponDiscount}</span></div>` : ''}
        <div class="total-row"><span>Shipping:</span> <span>${order.shipping === 0 ? 'Free' : '₹' + order.shipping}</span></div>
        <div class="total-row"><span>GST (Included):</span> <span>₹${order.gst}</span></div>
        <div class="total-row grand-total"><span>Grand Total:</span> <span>₹${order.totalAmount}</span></div>
      </div>

      <div class="footer">
        <p>Thank you for shopping with COSKINn!</p>
        <p>If you have any questions regarding this invoice, please contact support@coskinn.com.</p>
      </div>
      <script>
        // Automatically trigger print dialog when opened
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  const blob = new Blob([invoiceHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `COSKINn_Invoice_${order.id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
