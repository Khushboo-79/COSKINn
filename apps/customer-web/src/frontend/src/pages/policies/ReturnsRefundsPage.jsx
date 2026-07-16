import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function ReturnsRefundsPage() {
  return (
    <PolicyLayout title="Returns & Refunds" lastUpdated="July 15, 2026">
      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. Our 7-Day Glow Guarantee</h2>
        <p>
          At COSKINn, we want you to love your skincare. If you are not entirely satisfied with your purchase, we're here to help. 
          You have <strong>7 calendar days</strong> to return an item from the date you received it.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. Eligibility for Returns</h2>
        <p className="mb-4">
          To be eligible for a return, please ensure that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The item is unused and in the same condition that you received it.</li>
          <li>The item must be in the original packaging, including all seals and shrink wrap intact.</li>
          <li>You have the receipt or proof of purchase (Order ID).</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500 italic">
          Note: For hygiene and safety reasons, we cannot accept returns on opened or partially used cosmetic and skincare products.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. Refunds Process</h2>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
        </p>
        <p className="mt-4">
          If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within 5-7 business days, depending on your card issuer's policies.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. Shipping for Returns</h2>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping (if arranged by us) will be deducted from your refund.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">5. Damaged or Defective Items</h2>
        <p>
          If you received a damaged or defective product, please contact us immediately at <a href="mailto:support@coskinn.com" className="text-[#FF2D7A] font-bold">support@coskinn.com</a> with photographs of the product and packaging. We will arrange a free replacement or full refund as quickly as possible.
        </p>
      </div>
    </PolicyLayout>
  );
}
