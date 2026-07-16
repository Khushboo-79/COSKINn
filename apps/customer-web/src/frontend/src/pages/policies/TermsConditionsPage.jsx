import React from 'react';
import PolicyLayout from '../../components/common/PolicyLayout';

export default function TermsConditionsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="July 15, 2026">
      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">1. Overview</h2>
        <p>
          This website is operated by COSKINn. Throughout the site, the terms "we", "us" and "our" refer to COSKINn. COSKINn offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">2. Online Store Terms</h2>
        <p>
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
          You may not use our products for any illegal or unauthorized purpose.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">3. Products or Services</h2>
        <p>
          Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
          We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">4. Accuracy of Billing and Account Information</h2>
        <p>
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-black text-[#1B1B1B] mb-4">5. Contact Information</h2>
        <p>
          Questions about the Terms of Service should be sent to us at <a href="mailto:legal@coskinn.com" className="text-[#FF2D7A] font-bold">legal@coskinn.com</a>.
        </p>
      </div>
    </PolicyLayout>
  );
}
