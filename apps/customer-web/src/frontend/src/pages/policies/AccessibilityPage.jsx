import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function AccessibilityPage() {
  return (
    <PolicyLayout title="Accessibility" lastUpdated="July 15, 2026">
      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. Our Commitment</h2>
        <p>
          COSKINn is committed to making our website's content accessible and user friendly to everyone. We believe that luxury skincare should be accessible to all, and that extends to your online shopping experience.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. Accessibility Standards</h2>
        <p>
          We are continuously working to improve the accessibility of our website to ensure we provide equal access to all of our users. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. Assistive Technologies</h2>
        <p>
          Our site is designed to be compatible with assistive technologies such as screen readers, magnifiers, and speech recognition software. We recommend using the most up-to-date versions of your assistive technology and web browser for the best experience.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. Feedback</h2>
        <p>
          If you are having difficulty viewing or navigating the content on this website, or notice any content, feature, or functionality that you believe is not fully accessible to people with disabilities, please email our Customer Service team at <a href="mailto:support@coskinn.com" className="text-[#FF2D7A] font-bold">support@coskinn.com</a> with "Disabled Access" in the subject line and provide a description of the specific feature you feel is not fully accessible or a suggestion for improvement.
        </p>
      </div>
    </PolicyLayout>
  );
}
