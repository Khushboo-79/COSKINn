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
import { ShieldCheck, ShoppingBag, UserCheck } from 'lucide-react';

export default function TermsConditionsPage() {
  const highlights = [
    {
      icon: <UserCheck size={24} strokeWidth={1.5} />,
      title: "User Conduct",
      desc: "Guidelines for safely and legally interacting with our digital platforms."
    },
    {
      icon: <ShoppingBag size={24} strokeWidth={1.5} />,
      title: "Purchases",
      desc: "Information regarding orders, billing accuracy, and exclusive online products."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: "Our Rights",
      desc: "Details on intellectual property, liability limitations, and service modifications."
    }
  ];

  const faqs = [
    {
      q: "Can I use your products for commercial purposes?",
      a: "No, you may not use our products for any illegal or unauthorized purpose, including resale without explicit permission."
    },
    {
      q: "What happens if a product is out of stock?",
      a: "Certain products or services may be available exclusively online and may have limited quantities. We reserve the right to refuse any order or limit quantities."
    },
    {
      q: "Are the product colors accurate on the website?",
      a: "We have made every effort to display colors as accurately as possible. However, we cannot guarantee that your computer monitor's display of any color will be perfectly accurate."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen">
      <PolicyHero 
        title="Terms & Conditions" 
        subtitle="Guidelines and rules for using the COSKINn website and services." 
        lastUpdated="July 15, 2026" 
      />
      
      <PolicyOverview>
        This website is operated by COSKINn. Throughout the site, the terms "we", "us" and "our" refer to COSKINn. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
      </PolicyOverview>

      <PolicyHighlights highlights={highlights} />

      <PolicyDetail title="1. Online Store Terms">
        <p>
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
        </p>
        <p>
          A breach or violation of any of the Terms will result in an immediate termination of your Services.
        </p>
      </PolicyDetail>

      <PolicyDetail title="2. Products or Services">
        <p>
          Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
        </p>
        <p>
          We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis.
        </p>
      </PolicyDetail>

      <PolicyDetail title="3. Accuracy of Billing Information" isLast={true}>
        <p>
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 
        </p>
        <p>
          In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.
        </p>
      </PolicyDetail>

      <PolicyNote title="Modifications to the Service">
        Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
      </PolicyNote>

      <PolicyFAQ faqs={faqs} />

      <PolicyCTA />
      
      <Footer />
    </div>
  );
}
