import { Routes, Route, Navigate } from 'react-router-dom';
import ContentDashboardScreen from './screens/ContentDashboardScreen';
import BlogPostsScreen from './screens/BlogPostsScreen';
import FAQsScreen from './screens/FAQsScreen';
import { SkincareTipsScreen } from './screens/SkincareTipsScreen';
import { IngredientsScreen } from './screens/IngredientsScreen';
import { AppPagesScreen } from './screens/AppPagesScreen';
import { MediaLibraryScreen } from './screens/MediaLibraryScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { CommentsScreen } from './screens/CommentsScreen';
import { ContentRequestsScreen } from './screens/ContentRequestsScreen';
import { ContentAnalyticsScreen } from './screens/ContentAnalyticsScreen';
import { ContentSettingsScreen } from './screens/ContentSettingsScreen';
import SeoManagerScreen from './screens/SeoManagerScreen';

export default function ContentModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ContentDashboardScreen />} />
      <Route path="/blogs" element={<BlogPostsScreen />} />
      <Route path="/tips" element={<SkincareTipsScreen />} />
      <Route path="/faqs" element={<FAQsScreen />} />
      <Route path="/ingredients" element={<IngredientsScreen />} />
      <Route path="/pages" element={<AppPagesScreen />} />
      <Route path="/media" element={<MediaLibraryScreen />} />
      <Route path="/categories" element={<CategoriesScreen />} />
      <Route path="/comments" element={<CommentsScreen />} />
      <Route path="/requests" element={<ContentRequestsScreen />} />
      <Route path="/analytics" element={<ContentAnalyticsScreen />} />
      <Route path="/settings" element={<ContentSettingsScreen />} />
      <Route path="/seo" element={<SeoManagerScreen />} />
      <Route path="*" element={<Navigate to="/content" replace />} />
    </Routes>
  );
}
