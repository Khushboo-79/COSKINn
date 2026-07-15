import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping & Delivery" lastUpdated="July 15, 2026">
      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. Order Processing Times</h2>
        <p>
          All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped. 
          Please note that during high volume periods or new product launches, processing times may be extended.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. Domestic Shipping Rates and Estimates</h2>
        <p className="mb-4">
          Shipping charges for your order will be calculated and displayed at checkout. We offer the following shipping options within India:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-[#1B1B1B]">Standard Shipping:</strong> Free on all orders above ₹799. Delivery in 3-5 business days.</li>
          <li><strong className="text-[#1B1B1B]">Standard Shipping (Under ₹799):</strong> Flat rate of ₹50. Delivery in 3-5 business days.</li>
          <li><strong className="text-[#1B1B1B]">Express Shipping:</strong> Flat rate of ₹150. Delivery in 1-2 business days.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. International Shipping</h2>
        <p>
          Currently, COSKINn only ships within India. We are working hard to bring our fruit-powered skincare to glowing faces worldwide very soon. Join our Glow Club newsletter to be the first to know when we launch international shipping!
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. How do I check the status of my order?</h2>
        <p>
          When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 24 hours for the tracking information to become available.
          You can also track your order directly on our website using the <strong>Track Order</strong> page.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">5. Damages and Issues</h2>
        <p>
          We take great care in packaging your skincare. However, if your order arrives damaged in any way, please email us as soon as possible at <a href="mailto:support@coskinn.com" className="text-[#FF2D7A] font-bold">support@coskinn.com</a> with your order number and a photo of the item's condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.
        </p>
      </div>
    </PolicyLayout>
  );
}
