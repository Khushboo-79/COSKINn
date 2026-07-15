import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { FileText, MessageCircle, Globe, LayoutTemplate } from 'lucide-react';
import BlogManager from './BlogManager';
import FaqManager from './FaqManager';
import SeoManager from './SeoManager';

export default function ContentPanel() {
  const location = useLocation();

  const tabs = [
    { name: 'Blog Posts', path: '/content/posts', icon: <FileText className="w-4 h-4" /> },
    { name: 'FAQs', path: '/content/faqs', icon: <MessageCircle className="w-4 h-4" /> },
    { name: 'SEO', path: '/content/seo', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <LayoutTemplate className="w-6 h-6 text-[#FF0069]" />
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {tabs.map(tab => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <Link 
              key={tab.name}
              to={tab.path}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                isActive 
                  ? 'border-[#FF0069] text-[#FF0069]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.name}
            </Link>
          )
        })}
      </div>

      <div className="flex-1 overflow-auto bg-white/40 rounded-xl p-4">
        <Routes>
          <Route path="/" element={<Navigate to="posts" replace />} />
          <Route path="posts" element={<BlogManager />} />
          <Route path="faqs" element={<FaqManager />} />
          <Route path="seo" element={<SeoManager />} />
        </Routes>
      </div>
    </div>
  );
}
