import React from 'react';
import { 
  PolicyHero, 
  PolicyOverview, 
  PolicyHighlights, 
  PolicyDetail, 
  PolicyNote, 
  PolicyFAQ, 
  PolicyCTA 
} from '../../components/common/PolicyComponents';
import Footer from '../../components/common/Footer';
import { ShieldCheck, CreditCard, Wallet } from 'lucide-react';

export default function PaymentPolicyPage() {
  const highlights = [
    {
      icon: <CreditCard size={24} strokeWidth={1.5} />,
      title: "Multiple Methods",
      desc: "We accept all major Credit/Debit cards, Net Banking, and popular wallets."
    },
    {
      icon: <Wallet size={24} strokeWidth={1.5} />,
      title: "UPI & Fast Checkout",
      desc: "Seamless payments with Google Pay, PhonePe, Paytm, and Amazon Pay."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: "100% Secure",
      desc: "All transactions are fully encrypted through industry-leading payment gateways."
    }
  ];

  const faqs = [
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Currently, we do not offer Cash on Delivery to ensure contactless deliveries and faster processing. All orders must be prepaid."
    },
    {
      q: "My payment failed but the amount was deducted. What should I do?",
      a: "Please do not panic. Failed transactions are typically automatically reversed by your bank within 5-7 business days."
    },
    {
      q: "Is my credit card information saved?",
      a: "No, COSKINn does not store your raw credit card data or UPI PINs on our servers. All sensitive data is handled directly by our secure payment partners."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen">
      <PolicyHero 
        title="Secure Payments" 
        subtitle="Safe, fast, and flexible payment options for a seamless shopping experience." 
        lastUpdated="July 15, 2026" 
      />
      
      <PolicyOverview>
        At COSKINn, we want your checkout process to be as smooth and glowing as our skincare. We offer a variety of highly secure payment methods, ensuring your data is protected every step of the way.
      </PolicyOverview>

      <PolicyHighlights highlights={highlights} />

      <PolicyDetail title="1. Accepted Payment Methods">
        <p>
          COSKINn offers a variety of secure payment options to ensure a smooth checkout experience. We currently accept:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 text-[#2B5968]/70">
          <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, American Express, RuPay.</li>
          <li><strong>UPI:</strong> Google Pay, PhonePe, Paytm, Amazon Pay, and all standard UPI apps.</li>
          <li><strong>Net Banking:</strong> All major Indian banks.</li>
          <li><strong>Wallets:</strong> Selected mobile wallets via Razorpay.</li>
        </ul>
      </PolicyDetail>

      <PolicyDetail title="2. Payment Issues and Failures" isLast={true}>
        <p>
          If your payment fails during checkout but the amount has been deducted from your bank account, the amount is usually reversed automatically by your bank within 5-7 business days. 
        </p>
        <p>
          If you need immediate assistance or want to verify if an order was placed, please reach out to our support team with your transaction details.
        </p>
      </PolicyDetail>

      <PolicyNote title="Cash on Delivery (COD)">
        Currently, we do not offer Cash on Delivery (COD) to ensure contactless deliveries, reduce environmental footprint, and guarantee faster processing times. All orders must be prepaid through our secure gateways.
      </PolicyNote>

      <PolicyFAQ faqs={faqs} />

      <PolicyCTA />
      
      <Footer />
    </div>
  );
}
