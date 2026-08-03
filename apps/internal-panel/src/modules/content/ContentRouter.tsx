import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { FileText, Sparkles, Leaf, HelpCircle, Droplets, Video, Scale, LayoutTemplate, Calendar } from 'lucide-react';
import { BlogEditorScreen } from './BlogEditorScreen';
import { BeautyTipsScreen } from './BeautyTipsScreen';
import { IngredientLibraryScreen } from './IngredientLibraryScreen';
import { FaqManagementScreen } from './FaqManagementScreen';
import { SkinRoutineScreen } from './SkinRoutineScreen';
import { VideoTutorialsScreen } from './VideoTutorialsScreen';
import { LegalPagesScreen } from './LegalPagesScreen';
import { HomepageContentScreen } from './HomepageContentScreen';
import { ContentCalendarScreen } from './ContentCalendarScreen';

const ContentNav = () => {
  const location = useLocation();
  const tabs = [
    { name: 'Calendar', path: '/content/calendar', icon: Calendar },
    { name: 'Blog Posts', path: '/content/blogs', icon: FileText },
    { name: 'Routines', path: '/content/routines', icon: Droplets },
    { name: 'Video Tutorials', path: '/content/videos', icon: Video },
    { name: 'Beauty Tips', path: '/content/tips', icon: Sparkles },
    { name: 'Homepage Copy', path: '/content/homepage', icon: LayoutTemplate },
    { name: 'FAQs', path: '/content/faqs', icon: HelpCircle },
    { name: 'Legal Pages', path: '/content/legal', icon: Scale },
    { name: 'Ingredient Library', path: '/content/ingredients', icon: Leaf },
  ];

  return (
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <Link
              key={tab.name || tab.path}
              to={tab.path}
              className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
              {tab.name}
            </Link>
        );
      })}
    </div>
  );
};

export const ContentRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <ContentNav />
      <Routes>
        <Route path="/" element={<Navigate to="/content/calendar" replace />} />
        <Route path="/calendar" element={<ContentCalendarScreen />} />
        <Route path="/blogs" element={<BlogEditorScreen />} />
        <Route path="/routines" element={<SkinRoutineScreen />} />
        <Route path="/videos" element={<VideoTutorialsScreen />} />
        <Route path="/tips" element={<BeautyTipsScreen />} />
        <Route path="/homepage" element={<HomepageContentScreen />} />
        <Route path="/faqs" element={<FaqManagementScreen />} />
        <Route path="/legal" element={<LegalPagesScreen />} />
        <Route path="/ingredients" element={<IngredientLibraryScreen />} />
        <Route path="*" element={<Navigate to="/content/calendar" replace />} />
      </Routes>
    </div>
  );
};
