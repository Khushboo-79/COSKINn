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
import { ShieldCheck, MonitorPlay, HeartHandshake } from 'lucide-react';

export default function AccessibilityPage() {
  const highlights = [
    {
      icon: <HeartHandshake size={24} strokeWidth={1.5} />,
      title: "Equal Access",
      desc: "We believe luxury skincare should be accessible and inclusive to everyone."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1.5} />,
      title: "WCAG 2.1 AA",
      desc: "We continually audit and update our site to meet global web accessibility standards."
    },
    {
      icon: <MonitorPlay size={24} strokeWidth={1.5} />,
      title: "Assistive Tech",
      desc: "Our platform is designed to be compatible with modern screen readers and magnifiers."
    }
  ];

  const faqs = [
    {
      q: "What standards do you follow for accessibility?",
      a: "We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which are recognized as the international standard for web accessibility."
    },
    {
      q: "What should I do if I find an accessibility issue?",
      a: "Please email our Customer Service team at support@coskinn.com with 'Disabled Access' in the subject line, and describe the specific feature you feel is not fully accessible."
    },
    {
      q: "Does your site work with screen readers?",
      a: "Yes, our site is designed to be compatible with standard assistive technologies such as screen readers, magnifiers, and speech recognition software."
    }
  ];

  return (
    <div className="bg-[#FFFDFD] min-h-screen">
      <PolicyHero 
        title="Accessibility for All" 
        subtitle="Our commitment to creating an inclusive digital shopping experience." 
        lastUpdated="July 15, 2026" 
      />
      
      <PolicyOverview>
        COSKINn is committed to making our website's content accessible and user friendly to everyone. We believe that luxury skincare should be accessible to all, and that extends deeply into your online shopping experience.
      </PolicyOverview>

      <PolicyHighlights highlights={highlights} />

      <PolicyDetail title="1. Accessibility Standards">
        <p>
          We are continuously working to improve the accessibility of our website to ensure we provide equal access to all of our users. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
        </p>
        <p>
          Our team conducts regular audits and testing to ensure our site remains compliant with these standards, providing a seamless experience for all visitors.
        </p>
      </PolicyDetail>

      <PolicyDetail title="2. Assistive Technologies" isLast={true}>
        <p>
          Our site is designed to be fully compatible with a wide range of assistive technologies such as screen readers, magnifiers, and speech recognition software.
        </p>
        <p>
          We recommend using the most up-to-date versions of your assistive technology and web browser for the best, most secure experience when navigating our catalog or proceeding through checkout.
        </p>
      </PolicyDetail>

      <PolicyNote title="We Value Your Feedback">
        If you are having difficulty viewing or navigating the content on this website, or notice any content, feature, or functionality that you believe is not fully accessible to people with disabilities, we want to hear from you. Your feedback is crucial to our ongoing accessibility efforts.
      </PolicyNote>

      <PolicyFAQ faqs={faqs} />

      <PolicyCTA />
      
      <Footer />
    </div>
  );
}
