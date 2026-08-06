export const downloadInvoice = (order) => {
  if (!order) return;

  // 1. Format Order Date from backend createdAt or fallback to order.date
  const formatOrderDate = () => {
    const dateVal = order.createdAt || order.date;
    if (!dateVal) return '-';
    try {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        });
      }
    } catch (e) {
      // ignore parsing error
    }
    return String(dateVal);
  };

  // 2. Format Billing Address (Name, Phone Number, Full Address, City, State, Pincode, Country)
  const getBillingAddressHtml = () => {
    if (order.address && typeof order.address === 'object') {
      const {
        fullName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country = 'India'
      } = order.address;
      return `
        ${fullName ? `<strong>${fullName}</strong><br/>` : ''}
        ${phone ? `Phone: ${phone}<br/>` : ''}
        ${addressLine1 || ''}${addressLine2 ? `, ${addressLine2}` : ''}<br/>
        ${city || ''}${state ? `, ${state}` : ''}${pincode ? ` - ${pincode}` : ''}<br/>
        ${country}
      `;
    }
    if (typeof order.shippingAddress === 'string' && order.shippingAddress.trim() !== '') {
      return order.shippingAddress;
    }
    return 'Customer Address (Provided during checkout)';
  };

  // 3. Format Payment Method & Details
  const getPaymentDetailsHtml = () => {
    const rawMode = order.paymentMode || order.paymentMethod || '';
    const paymentMethodDisplay =
      rawMode.toUpperCase() === 'COD'
        ? 'COD'
        : rawMode.toUpperCase() === 'ONLINE'
        ? 'Online Payment'
        : rawMode || 'Online Payment';

    const statusDisplay =
      order.status === 'CANCELLED'
        ? 'Refunded'
        : rawMode.toUpperCase() === 'COD' && order.status !== 'DELIVERED'
        ? 'Pay on Delivery'
        : 'Paid';

    return `
      <strong>Method:</strong> ${paymentMethodDisplay}<br/>
      <strong>Status:</strong> ${statusDisplay}
    `;
  };

  // 4. Format Variant Name (preventing [object Object])
  const getVariantDisplay = (item) => {
    if (item && item.variant) {
      if (typeof item.variant === 'object') {
        const vName = item.variant.name;
        if (vName && vName !== 'Standard' && vName !== 'Default') {
          return vName;
        }
      } else if (typeof item.variant === 'string') {
        const vName = item.variant.trim();
        if (vName && vName !== '' && vName !== 'Standard' && vName !== 'Default') {
          return vName;
        }
      }
    }
    return '-';
  };

  // 5. Backend calculation mappings
  const subtotalVal =
    order.totalAmount !== undefined && order.totalAmount !== null
      ? order.totalAmount
      : (order.subtotal ?? 0);

  const discountVal =
    order.discountAmt !== undefined && order.discountAmt !== null
      ? Number(order.discountAmt)
      : (order.discount !== undefined && order.discount !== null ? Number(order.discount) : 0);

  const couponDiscountVal =
    order.couponDiscount !== undefined && order.couponDiscount !== null
      ? Number(order.couponDiscount)
      : 0;

  const shippingVal =
    order.shippingFee !== undefined && order.shippingFee !== null
      ? Number(order.shippingFee)
      : (order.shipping !== undefined && order.shipping !== null ? Number(order.shipping) : 0);
  const shippingDisplay = shippingVal === 0 ? '₹0 (Free)' : `₹${shippingVal}`;

  const gstVal =
    order.taxAmount !== undefined && order.taxAmount !== null
      ? Number(order.taxAmount)
      : (order.gst !== undefined && order.gst !== null ? Number(order.gst) : 0);
  const gstDisplay = gstVal === 0 ? 'Included' : `₹${gstVal}`;

  const grandTotalVal =
    order.finalAmount !== undefined && order.finalAmount !== null
      ? order.finalAmount
      : (order.totalAmount ?? 0);

  const itemsList = Array.isArray(order.items) ? order.items : [];

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
        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
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
          <h1>Fairenne</h1>
          <p>Premium Luxury Beauty</p>
        </div>
        <div style="text-align: right;">
          <h2>INVOICE</h2>
          <p><strong>Order ID:</strong> ${order.id || '-'}</p>
          <p><strong>Date:</strong> ${formatOrderDate()}</p>
        </div>
      </div>
      
      <div class="details">
        <div>
          <h3 style="margin-bottom: 5px;">Billed To:</h3>
          <p style="margin-top:0;">${getBillingAddressHtml()}</p>
        </div>
        <div style="text-align: right;">
          <h3 style="margin-bottom: 5px;">Payment Details:</h3>
          <p style="margin-top:0;">${getPaymentDetailsHtml()}</p>
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
          ${itemsList.map(item => {
            const itemName = item.name || item.product?.name || item.variant?.product?.name || 'Product';
            const itemQty = item.quantity !== undefined && item.quantity !== null ? item.quantity : (item.qty ?? 1);
            const itemPrice = item.price !== undefined && item.price !== null ? item.price : 0;
            return `
              <tr>
                <td><strong>${itemName}</strong></td>
                <td>${getVariantDisplay(item)}</td>
                <td>${itemQty}</td>
                <td style="text-align: right;">₹${itemPrice}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <div class="total-section">
        <div class="total-row"><span>Subtotal:</span> <span>₹${subtotalVal}</span></div>
        ${discountVal > 0 ? `<div class="total-row" style="color: green;"><span>Discount:</span> <span>-₹${discountVal}</span></div>` : ''}
        ${couponDiscountVal > 0 ? `<div class="total-row" style="color: green;"><span>Coupon Discount:</span> <span>-₹${couponDiscountVal}</span></div>` : ''}
        <div class="total-row"><span>Shipping:</span> <span>${shippingDisplay}</span></div>
        <div class="total-row"><span>GST (Included):</span> <span>${gstDisplay}</span></div>
        <div class="total-row grand-total"><span>Grand Total:</span> <span>₹${grandTotalVal}</span></div>
      </div>

      <div class="footer">
        <p>Thank you for shopping with Fairenne!</p>
        <p>If you have any questions regarding this invoice, please contact support@fairenne.com.</p>
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
  link.download = `Fairenne_Invoice_${order.id || 'order'}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
