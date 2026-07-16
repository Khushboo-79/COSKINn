import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function CookiePolicyPage() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="July 15, 2026">
      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. What are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. How We Use Cookies</h2>
        <p className="mb-4">
          COSKINn uses cookies to improve your browsing experience, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keeping you signed in to your account.</li>
          <li>Remembering your site preferences and cart items.</li>
          <li>Understanding how you interact with our website to improve performance.</li>
          <li>Delivering relevant advertising and tracking the effectiveness of our marketing campaigns.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. Types of Cookies We Use</h2>
        <p className="mb-4">
          We use the following types of cookies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for the operation of our website.</li>
          <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
          <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website.</li>
          <li><strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited, and the links you have followed.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. Managing Cookies</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
        </p>
      </div>
    </PolicyLayout>
  );
}
