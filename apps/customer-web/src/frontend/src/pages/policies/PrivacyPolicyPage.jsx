import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="July 15, 2026">
      <div>
        <p className="mb-6">
          This Privacy Policy describes how COSKINn ("we", "us", or "our") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. Collecting Personal Information</h2>
        <p>
          When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual as "Personal Information".
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. Sharing Personal Information</h2>
        <p>
          We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>We use Razorpay and Stripe to power our secure checkout.</li>
          <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. Behavioral Advertising</h2>
        <p>
          As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. You can opt out of targeted advertising at any time through your account settings or by clicking the "unsubscribe" link in any promotional email.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. Your Rights</h2>
        <p>
          If you are a resident of certain regions, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us at <a href="mailto:privacy@coskinn.com" className="text-[#FF2D7A] font-bold">privacy@coskinn.com</a>.
        </p>
      </div>
    </PolicyLayout>
  );
}
