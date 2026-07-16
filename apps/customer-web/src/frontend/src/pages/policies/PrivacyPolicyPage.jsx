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
import { ShieldCheck, Database, Share2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const highlights = [
    {
      icon: <Database size={24} strokeWidth={1.5} />,
      title: "Data We Collect",
      desc: "Device info, interactions, and details needed to process your purchases securely."
    },
    {
      icon: <Share2 size={24} strokeWidth={1.5} />,
      title: "How We Share",
      desc: "We securely share data with trusted partners like Razorpay and Stripe for fulfillment."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: "Your Rights",
      desc: "You can request access, correction, or deletion of your personal data at any time."
    }
  ];

  const faqs = [
    {
      q: "How can I opt out of targeted advertising?",
      a: "You can opt out anytime through your account settings or by clicking the 'unsubscribe' link in any promotional email we send."
    },
    {
      q: "How do I request my data to be deleted?",
      a: "If you wish to exercise your right to have your Personal Information erased, please email us directly at privacy@coskinn.com."
    },
    {
      q: "Is my payment information stored safely?",
      a: "Yes. We use industry-leading secure payment gateways (like Razorpay and Stripe) and do not store your raw credit card information on our servers."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen">
      <PolicyHero 
        title="Privacy Policy" 
        subtitle="Your privacy is our priority. Learn how we collect, use, and protect your information." 
        lastUpdated="July 15, 2026" 
      />
      
      <PolicyOverview>
        At COSKINn, we value your trust. This Privacy Policy describes how we collect, use, and disclose your Personal Information when you visit our site or make a purchase. We are committed to ensuring that your privacy is protected and respected at all times.
      </PolicyOverview>

      <PolicyHighlights highlights={highlights} />

      <PolicyDetail title="1. Collecting Personal Information">
        <p>
          When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. 
        </p>
        <p>
          In this Privacy Policy, we refer to any information that can uniquely identify an individual as "Personal Information". We ensure that this data is collected legally and transparently.
        </p>
      </PolicyDetail>

      <PolicyDetail title="2. Sharing Personal Information" isLast={true}>
        <p>
          We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. For example:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 text-[#2B5968]/70">
          <li>We use Razorpay and Stripe to power our secure checkout.</li>
          <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
        </ul>
      </PolicyDetail>

      <PolicyNote title="Behavioral Advertising">
        As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. We do not sell your personal data to third-party data brokers.
      </PolicyNote>

      <PolicyFAQ faqs={faqs} />

      <PolicyCTA />
      
      <Footer />
    </div>
  );
}
