import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function PaymentPolicyPage() {
  return (
    <PolicyLayout title="Payment Policy" lastUpdated="July 15, 2026">
      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. Accepted Payment Methods</h2>
        <p className="mb-4">
          COSKINn offers a variety of secure payment options to ensure a smooth checkout experience. We currently accept:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, American Express, RuPay.</li>
          <li><strong>UPI:</strong> Google Pay, PhonePe, Paytm, Amazon Pay, and all standard UPI apps.</li>
          <li><strong>Net Banking:</strong> All major Indian banks.</li>
          <li><strong>Wallets:</strong> Selected mobile wallets via Razorpay.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. Secure Checkout</h2>
        <p>
          All transactions are processed through highly secure, encrypted payment gateways (Razorpay). COSKINn does not store your complete credit card information or UPI PINs on our servers.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. Payment Issues and Failures</h2>
        <p>
          If your payment fails during checkout but the amount has been deducted from your bank account, please do not panic. The amount is usually reversed by your bank within 5-7 business days. If you need assistance, contact us at <a href="mailto:support@coskinn.com" className="text-[#FF2D7A] font-bold">support@coskinn.com</a> with your transaction details.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. Cash on Delivery (COD)</h2>
        <p>
          Currently, we do not offer Cash on Delivery (COD) to ensure contactless deliveries and faster processing times. All orders must be prepaid.
        </p>
      </div>
    </PolicyLayout>
  );
}
