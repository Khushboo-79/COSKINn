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
import { ShieldCheck, Settings, LineChart } from 'lucide-react';

export default function CookiePolicyPage() {
  const highlights = [
    {
      icon: <Settings size={24} strokeWidth={1.5} />,
      title: "Essential Functionality",
      desc: "Cookies help keep you signed in, remember your cart items, and securely process checkouts."
    },
    {
      icon: <LineChart size={24} strokeWidth={1.5} />,
      title: "Performance Tracking",
      desc: "We analyze how visitors interact with our site to constantly improve your shopping experience."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: "Your Control",
      desc: "You can easily manage, disable, or delete cookies at any time through your browser settings."
    }
  ];

  const faqs = [
    {
      q: "What exactly is a cookie?",
      a: "A cookie is a small text file that is placed on your computer or mobile device when you visit a website. It allows the website to remember your actions and preferences over time."
    },
    {
      q: "Do I have to accept cookies to use the site?",
      a: "While you can browse the site without cookies, essential cookies are required for adding items to your cart, signing into your account, and checking out."
    },
    {
      q: "Are my payment details stored in cookies?",
      a: "No. Cookies are never used to store sensitive information such as your credit card details or passwords."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen">
      <PolicyHero 
        title="Cookie Policy" 
        subtitle="Learn how we use cookies to personalize and improve your COSKINn experience." 
        lastUpdated="July 15, 2026" 
      />
      
      <PolicyOverview>
        Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide valuable information to site owners. At COSKINn, we use them to ensure you have a seamless, premium shopping journey.
      </PolicyOverview>

      <PolicyHighlights highlights={highlights} />

      <PolicyDetail title="1. How We Use Cookies">
        <p>
          COSKINn uses cookies to improve your browsing experience and ensure our website functions correctly. Specifically, we use them for:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 text-[#2B5968]/70">
          <li>Keeping you securely signed in to your account.</li>
          <li>Remembering your site preferences and saving items in your shopping cart.</li>
          <li>Understanding how you interact with our website to improve performance and speed.</li>
          <li>Delivering relevant advertising and tracking the effectiveness of our marketing campaigns.</li>
        </ul>
      </PolicyDetail>

      <PolicyDetail title="2. Types of Cookies We Use" isLast={true}>
        <p>
          To give you full transparency, here are the different categories of cookies we utilize on our platform:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 text-[#2B5968]/70">
          <li><strong>Essential Cookies:</strong> Strictly necessary for the operation of our website (e.g., checkout process).</li>
          <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
          <li><strong>Functionality Cookies:</strong> Used to recognize you when you return, remembering your language or region preferences.</li>
          <li><strong>Targeting Cookies:</strong> Record your visit, the pages you have visited, and the links you have followed to make advertising more relevant to your interests.</li>
        </ul>
      </PolicyDetail>

      <PolicyNote title="Managing Your Cookies">
        You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer, and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site, and some services (like your shopping cart) may not work properly.
      </PolicyNote>

      <PolicyFAQ faqs={faqs} />

      <PolicyCTA />
      
      <Footer />
    </div>
  );
}
